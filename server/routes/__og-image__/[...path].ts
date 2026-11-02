import { legacyOgPagePath, ogImageFromHtml } from '../../utils/legacy-og'

export default defineEventHandler(async (event) => {
  const page = legacyOgPagePath(event.context.params?.path ?? '')
  if (!page) throw createError({ statusCode: 404 })

  const html = await $fetch<string>(page, { responseType: 'text' }).catch((error: unknown) => {
    const status = (error as { statusCode?: number }).statusCode
    throw createError({ statusCode: status === 404 ? 404 : 502 })
  })
  const image = ogImageFromHtml(html)
  if (!image) throw createError({ statusCode: 404 })

  setResponseHeader(event, 'cache-control', 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=86400')
  return sendRedirect(event, image, 302)
})
