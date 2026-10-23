// Legacy routes from the old React portfolio, kept alive as 301s so their SEO carries over.
export const redirects: Record<string, string> = {
  '/work': '/projects',
  '/resume': '/',
  '/contact': '/',
  '/blog/oss-in-a-year': '/blog/a-year-a-verse-and-an-ecosystem',
}

export const redirectRouteRules = Object.fromEntries(
  Object.entries(redirects).map(([from, to]) => [from, { redirect: { to, statusCode: 301 } }]),
)
