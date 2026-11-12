import { queryCollection } from '@nuxt/content/server'
import { seriesPath } from '../../../app/utils/series'

export default defineSitemapEventHandler(async (event) => {
  const posts = await queryCollection(event, 'blog').all()
  const original = posts.filter((p) => !p.draft && !p.canonical)
  const series = [...new Set(posts.filter((p) => !p.draft && p.series).map((p) => seriesPath(p.series!)))]

  return [
    { loc: '/' },
    { loc: '/projects' },
    { loc: '/talks' },
    { loc: '/giving-talks' },
    { loc: '/play' },
    { loc: '/essays' },
    { loc: '/blog' },
    { loc: '/releases' },
    ...series.map((loc) => ({ loc })),
    ...original.map((p) => {
      const lastmod = p.date
      return lastmod ? { loc: p.path, lastmod } : { loc: p.path }
    }),
  ]
})
