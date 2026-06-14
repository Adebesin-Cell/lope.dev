import { queryCollection } from '@nuxt/content/server'

export default defineSitemapEventHandler(async (event) => {
  const posts = await queryCollection(event, 'blog').all()
  const original = posts.filter(p => !p.draft && !p.canonical)

  return [
    { loc: '/' },
    { loc: '/projects' },
    { loc: '/talks' },
    { loc: '/blog' },
    { loc: '/releases' },
    ...original.map(p => ({ loc: p.path })),
  ]
})
