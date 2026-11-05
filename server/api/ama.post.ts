const MIN_FILL_MS = 1500
const MAX_LEN = 500

export default defineEventHandler(async (event) => {
  const body = (await readBody<Record<string, unknown>>(event)) || {}

  const elapsed = Number(body.elapsed)
  if (body.website || !Number.isFinite(elapsed) || elapsed < MIN_FILL_MS) return { ok: true }

  rateLimit(event, 'ask', 5, 10 * 60_000)

  const text = typeof body.question === 'string' ? body.question.trim().slice(0, MAX_LEN) : ''
  if (!text) throw createError({ statusCode: 400, statusMessage: 'Question is required' })

  await saveQuestion(text)
  return { ok: true }
})
