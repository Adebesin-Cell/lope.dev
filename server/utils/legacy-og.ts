export function legacyOgPagePath(path: string): string | null {
  const match = path.match(/^(?:image|static)\/(?:(.+)\/)?og\.(?:png|jpe?g|webp)$/)
  if (!match) return null
  const page = match[1] ?? ''
  if (!/^[\w\-/]*$/.test(page) || page.includes('//')) return null
  return `/${page}`
}

export function ogImageFromHtml(html: string): string | null {
  const tag = html.match(/<meta[^>]+property="og:image"[^>]*>/)?.[0]
  return tag?.match(/content="([^"]+)"/)?.[1] ?? null
}
