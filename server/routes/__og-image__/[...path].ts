import { legacyOgPagePath, ogImageFromHtml } from '../../utils/legacy-og'

export default defineEventHandler(async (event) => {
  const page = legacyOgPagePath(event.context.params?.path ?? '')
  if (!page) throw createError({ statusCode: 404 })

  const html = await $fetch<string>(page, { responseType: 'text' }).catch(() => null)
  const image = html && ogImageFromHtml(html)
  if (!image) throw createError({ statusCode: 404 })

  setResponseHeader(event, 'cache-control', 'public, max-age=3600')
  return sendRedirect(event, image, 302)
})
