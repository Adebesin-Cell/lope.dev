import { queryCollection } from '@nuxt/content/server'
import { Feed } from 'feed'

export default defineEventHandler(async (event) => {
  const site = String(useRuntimeConfig(event).public.siteUrl).replace(/\/$/, '')

  const posts = (await queryCollection(event, 'blog').order('date', 'DESC').all())
    .filter(p => !p.draft)

  const feed = new Feed({
    title: 'Adebesin Tolulope (Lope) — Blog',
    description: 'Notes on open source, engineering with LLMs, and projects I\'m building.',
    id: `${site}/blog`,
    link: `${site}/blog`,
    language: 'en',
    favicon: `${site}/favicon.svg`,
    copyright: `CC BY-NC-SA 4.0 — Adebesin Tolulope`,
    feedLinks: { rss: `${site}/feed.xml` },
    author: { name: 'Adebesin Tolulope', link: site },
  })

  for (const p of posts) {
    feed.addItem({
      title: p.title,
      id: `${site}${p.path}`,
      link: `${site}${p.path}`,
      description: p.description ?? '',
      date: new Date(p.date),
    })
  }

  setHeader(event, 'content-type', 'application/rss+xml; charset=utf-8')
  return feed.rss2()
})
