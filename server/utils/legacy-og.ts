export function legacyOgPagePath(path: string): string | null {
  const match = path.match(/^(?:image|static)\/(?:(blog(?:\/series)?\/[\w-]+)\/)?og\.(?:png|jpe?g|webp)$/)
  if (!match) return null
  return `/${match[1] ?? ''}`
}

export function ogImageFromHtml(html: string): string | null {
  const tag = html.match(/<meta[^>]+property="og:image"[^>]*>/)?.[0]
  const content = tag?.match(/content="([^"]+)"/)?.[1]
  return content ? content.replaceAll('&amp;', '&') : null
}
