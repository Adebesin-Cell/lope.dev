export default defineEventHandler(async (event) => {
  const path = event.context.params?.path || ''
  const search = getRequestURL(event).search || ''

  const apiHost = useRuntimeConfig(event).public.posthogHost as string
  const { protocol, hostname } = new URL(apiHost)
  const [region, ...rest] = hostname.split('.')
  const assetHost = `${protocol}//${region}-assets.${rest.join('.')}`

  const useAssetHost = path.startsWith('static/') || path.startsWith('array/')
  const upstream = useAssetHost ? assetHost : apiHost
  const targetUrl = `${upstream}/${path}${search}`
  const targetHost = new URL(upstream).host

  const headers = new Headers()
  const excluded = ['host', 'connection', 'content-length', 'transfer-encoding', 'accept-encoding']
  for (const [key, value] of Object.entries(getRequestHeaders(event))) {
    if (value && !excluded.includes(key.toLowerCase()))
      headers.set(key, value)
  }
  headers.set('host', targetHost)

  const clientIp = getHeader(event, 'x-forwarded-for') || getRequestIP(event)
  if (clientIp)
    headers.set('x-forwarded-for', clientIp)

  const raw = event.method !== 'GET' && event.method !== 'HEAD'
    ? await readRawBody(event, false)
    : undefined
  const body = raw ? new Uint8Array(raw) : undefined

  const response = await fetch(targetUrl, { method: event.method, headers, body })

  for (const [key, value] of response.headers.entries()) {
    if (!['content-encoding', 'content-length', 'transfer-encoding'].includes(key.toLowerCase()))
      setResponseHeader(event, key, value)
  }
  setResponseStatus(event, response.status)

  return Buffer.from(await response.arrayBuffer())
})
