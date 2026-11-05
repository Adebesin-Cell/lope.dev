import { createCipheriv, createDecipheriv, createHash, randomBytes, timingSafeEqual } from 'node:crypto'

interface Session {
  accessJwt: string
  did: string
}

interface ListRecords {
  records: { uri: string; value: { ciphertext?: string; createdAt: string } }[]
  cursor?: string
}

export const AMA_COLLECTION = 'com.lope.ama.question'

let session: Promise<Session> | null = null

function config() {
  const { pdsUrl, pdsHandle, pdsAppPassword, amaSecret, amaAdminPassword } = useRuntimeConfig()
  if (!pdsUrl || !pdsHandle || !pdsAppPassword || !amaSecret || !amaAdminPassword)
    throw createError({ statusCode: 500, statusMessage: 'AMA is not configured' })
  return { pdsUrl, pdsHandle, pdsAppPassword, amaSecret, amaAdminPassword }
}

const key = () => createHash('sha256').update(config().amaSecret).digest()

export function encrypt(text: string) {
  const iv = randomBytes(12)
  const cipher = createCipheriv('aes-256-gcm', key(), iv)
  const body = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()])
  return Buffer.concat([iv, cipher.getAuthTag(), body]).toString('base64')
}

export function decrypt(payload: string) {
  const buf = Buffer.from(payload, 'base64')
  const decipher = createDecipheriv('aes-256-gcm', key(), buf.subarray(0, 12))
  decipher.setAuthTag(buf.subarray(12, 28))
  return Buffer.concat([decipher.update(buf.subarray(28)), decipher.final()]).toString('utf8')
}

export function requireAdmin(event: Parameters<typeof getHeader>[0]) {
  const expected = createHash('sha256').update(config().amaAdminPassword).digest()
  const given = createHash('sha256')
    .update(getHeader(event, 'x-ama-key') ?? '')
    .digest()
  const id = clientId(event, 'admin')
  if (recentHits(id, ADMIN_WINDOW_MS).length >= ADMIN_LIMIT)
    throw createError({ statusCode: 429, statusMessage: 'Too many requests' })
  if (timingSafeEqual(given, expected)) return
  hits.set(id, [...recentHits(id, ADMIN_WINDOW_MS), Date.now()])
  throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
}

function login() {
  const { pdsUrl, pdsHandle, pdsAppPassword } = config()
  session ??= $fetch<Session>(`${pdsUrl}/xrpc/com.atproto.server.createSession`, {
    method: 'POST',
    body: { identifier: pdsHandle, password: pdsAppPassword },
  }).catch((err) => {
    session = null
    throw err
  })
  return session
}

function write(method: 'createRecord' | 'deleteRecord', body: (did: string) => Record<string, unknown>) {
  const run = async () => {
    const { accessJwt, did } = await login()
    return $fetch(`${config().pdsUrl}/xrpc/com.atproto.repo.${method}`, {
      method: 'POST',
      headers: { authorization: `Bearer ${accessJwt}` },
      body: body(did),
    })
  }
  return run().catch((err: { statusCode?: number; data?: { error?: string } }) => {
    const expired = err.statusCode === 401 || ['ExpiredToken', 'InvalidToken'].includes(err.data?.error ?? '')
    if (!expired) throw err
    session = null
    return run()
  })
}

export function saveQuestion(text: string) {
  return write('createRecord', (repo) => ({
    repo,
    collection: AMA_COLLECTION,
    record: { $type: AMA_COLLECTION, ciphertext: encrypt(text), createdAt: new Date().toISOString() },
  }))
}

export function deleteQuestion(rkey: string) {
  return write('deleteRecord', (repo) => ({ repo, collection: AMA_COLLECTION, rkey }))
}

const ADMIN_LIMIT = 10
const ADMIN_WINDOW_MS = 15 * 60_000
const hits = new Map<string, number[]>()

function clientId(event: Parameters<typeof getRequestIP>[0], bucket: string) {
  if (hits.size > 10_000) hits.clear()
  return `${bucket}:${getRequestIP(event, { xForwardedFor: true }) ?? 'unknown'}`
}

function recentHits(id: string, windowMs: number) {
  const now = Date.now()
  return (hits.get(id) ?? []).filter((t) => now - t < windowMs)
}

export function rateLimit(event: Parameters<typeof getRequestIP>[0], bucket: string, limit: number, windowMs: number) {
  const id = clientId(event, bucket)
  const recent = [...recentHits(id, windowMs), Date.now()]
  hits.set(id, recent)
  if (recent.length > limit) throw createError({ statusCode: 429, statusMessage: 'Too many requests' })
}

export async function listQuestions() {
  const { did } = await login()
  const all: { rkey: string; text: string; createdAt: string }[] = []
  let cursor: string | undefined
  for (let page = 0; page < 10; page++) {
    const res = await $fetch<ListRecords>(`${config().pdsUrl}/xrpc/com.atproto.repo.listRecords`, {
      params: { repo: did, collection: AMA_COLLECTION, limit: 100, cursor },
    })
    for (const r of res.records) {
      if (!r.value.ciphertext) continue
      try {
        all.push({
          rkey: r.uri.split('/').pop() ?? '',
          text: decrypt(r.value.ciphertext),
          createdAt: r.value.createdAt,
        })
      } catch {}
    }
    cursor = res.cursor
    if (!cursor || !res.records.length) break
  }
  return all.toSorted((a, b) => b.createdAt.localeCompare(a.createdAt))
}
