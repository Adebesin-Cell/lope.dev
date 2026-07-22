import { queryCollection } from '@nuxt/content/server'
import { Feed } from 'feed'
import { mediumPosts } from '~/data/medium-posts'

export default defineEventHandler(async (event) => {
  const site = String(useRuntimeConfig(event).public.siteUrl).replace(/\/$/, '')

  const onSite = (await queryCollection(event, 'blog').order('date', 'DESC').all())
    .filter(p => !p.draft)
    .map(p => ({
      title: p.title,
      link: p.canonical ?? `${site}${p.path}`,
      description: p.description ?? '',
      content: p.canonical ? '' : minimarkToHtml(p.body).replace(/(src|href)="\//g, `$1="${site}/`),
      date: p.date,
    }))

  const external = mediumPosts.map(m => ({
    title: m.title,
    link: m.url,
    description: m.description ?? '',
    content: '',
    date: m.date,
  }))

  const posts = [...onSite, ...external]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

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
      id: p.link,
      link: p.link,
      description: p.description,
      content: p.content || undefined,
      date: new Date(p.date),
    })
  }

  setHeader(event, 'content-type', 'application/rss+xml; charset=utf-8')
  return feed.rss2().replace(
    /^<\?xml[^>]*\?>/,
    `$&\n<?xml-stylesheet type="text/xsl" href="/feed.xsl"?>`,
  )
})
