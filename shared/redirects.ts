export const redirects: Record<string, string> = {
  '/work': '/projects',
  '/resume': '/',
  '/contact': '/',
  '/blog/oss-in-a-year': '/blog/a-year-a-verse-and-an-ecosystem',
  '/blog/series': '/blog',
}

export const redirectRouteRules = Object.fromEntries(
  Object.entries(redirects).map(([from, to]) => [from, { redirect: { to, statusCode: 301 } }]),
)

export const anchorRedirects: Record<string, Record<string, string>> = {
  '/blog/build-once-at-build-time': {
    'why-not-just-do-it-in-the-browser': 'why-panda-css-doesnt-generate-css-in-the-browser',
    'what-build-time-cant-see': 'what-panda-css-cant-extract-at-build-time',
  },
  '/blog/every-style-is-an-atom': {
    'what-an-atom-is': 'what-an-atomic-css-class-is',
    'order-without-import-order': 'how-atomic-css-decides-which-style-wins',
  },
  '/blog/look-it-up-once': {
    'building-the-key-was-the-slow-part': 'why-css-was-slow-on-every-render',
  },
  '/blog/panda-never-runs-your-code': {
    'imports-from-other-files': 'can-panda-css-read-styles-from-other-files',
    'ternaries-and': 'conditional-styles-ternaries-and',
  },
  '/blog/what-runtime-means-in-panda': {
    'removing-the-runtime': 'how-to-remove-the-panda-css-runtime',
    'an-unofficial-turbopack-workaround': 'panda-css-with-nextjs-turbopack-a-workaround',
    'should-you-turn-it-on': 'should-you-turn-on-source-transforms',
  },
  '/blog/how-panda-makes-cva-fast': {
    'when-panda-keeps-the-runtime-cva': 'why-some-cva-recipes-dont-get-compiled',
    'sva-one-string-per-slot': 'how-sva-slot-recipes-compile',
  },
  '/blog/know-what-your-css-actually-uses': {
    'why-is-my-style-missing': 'why-is-my-panda-css-style-missing',
  },
}
