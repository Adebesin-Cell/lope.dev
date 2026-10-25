import { fileURLToPath } from 'node:url'
import { pandacss } from '@pandacss/vite'
import { redirectRouteRules } from './shared/redirects'
import { readingTimeText } from './app/utils/reading-time'

export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/image',
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    'tegaki/nuxt',
    'nuxt-og-image',
    '@nuxtjs/sitemap',
  ],
  image: {
    provider: process.env.VERCEL ? 'vercel' : 'ipx',
    format: ['avif', 'webp'],
    quality: 70,
  },
  content: {
    build: {
      markdown: {
        highlight: { langs: ['cpp', 'tsx', 'jsx', 'css', 'json', 'rust', 'mdx'] },
      },
      transformers: ['~~/transformers/image-size'],
    },
  },
  hooks: {
    'content:file:afterParse'({ collection, content }) {
      if (collection.name === 'blog') content.readingTime ??= readingTimeText(content.body)
    },
  },
  fonts: {
    families: [
      { name: 'Inter', provider: 'google', weights: [400, 500, 600, 700], global: true },
      { name: 'JetBrains Mono', provider: 'google', weights: [400, 500], global: true },
      { name: 'Newsreader', provider: 'google', weights: [400, 500], styles: ['normal', 'italic'], global: true },
      { name: 'Caveat', provider: 'google', weights: [500, 600, 700], global: true },
    ],
  },
  devtools: { enabled: true },
  components: [{ path: '~/components/content', global: true }, '~/components'],
  compatibilityDate: '2024-04-03',
  css: ['~/assets/css/panda.css', '~/assets/css/main.css'],
  alias: { 'styled-system': fileURLToPath(new URL('./styled-system', import.meta.url)) },
  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'dark',
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Adebesin Tolulope (Lope)',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'Design engineer and open sourcer, maintaining Chakra UI, Panda, Ark UI and Zag.',
        },
        { name: 'author', content: 'Adebesin Tolulope (Lope)' },
        {
          name: 'keywords',
          content:
            'Adebesin Tolulope, Lope, design engineer, frontend engineer, open source, Panda CSS, Chakra UI, Ark UI, Zag, design systems, CSS, React, Vue, Nuxt, TypeScript',
        },
        { name: 'theme-color', content: '#0a0a0a' },
        { property: 'og:site_name', content: 'Adebesin Tolulope (Lope)' },
        { property: 'og:locale', content: 'en_US' },
        { name: 'twitter:site', content: '@I_am_Lope' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: '32x32' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'alternate', type: 'application/rss+xml', title: 'Adebesin Tolulope (Lope) — Blog', href: '/feed.xml' },
      ],
    },
  },
  runtimeConfig: {
    githubToken: process.env.GITHUB_TOKEN || '',
    public: {
      githubUser: 'Adebesin-Cell',
      siteUrl:
        process.env.NUXT_PUBLIC_SITE_URL ||
        (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
        'https://lope.adebesin.com',
      posthogPublicKey: process.env.NUXT_PUBLIC_POSTHOG_PUBLIC_KEY || '',
      posthogHost: process.env.NUXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
      posthogOptoutToken: process.env.NUXT_PUBLIC_POSTHOG_OPTOUT_TOKEN || '',
    },
  },
  vite: {
    plugins: [pandacss({ cwd: fileURLToPath(new URL('.', import.meta.url)), transform: true })],
    optimizeDeps: {
      include: ['@ark-ui/vue/factory', '@vue/devtools-core', '@vue/devtools-kit', 'posthog-js'],
    },
  },
  site: {
    url:
      process.env.NUXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
      'https://lope.adebesin.com',
    name: 'Adebesin Tolulope (Lope)',
  },
  sitemap: {
    excludeAppSources: true,
    sources: ['/api/__sitemap__/urls'],
  },
  ogImage: {
    defaults: { width: 1200, height: 630, cacheMaxAgeSeconds: 60 * 60 * 24 },
    security: {
      strict: !!process.env.NUXT_OG_IMAGE_SECRET,
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/projects', '/talks', '/giving-talks', '/blog', '/feed.xml'],
      ignore: ['/releases'],
    },
  },
  routeRules: {
    // Graduation guestbook — a separate Vercel/Nuxt app mounted under this path.
    '/lope-is-graduating': { proxy: 'https://guestbook-lopes-projects-7fdc62e5.vercel.app/lope-is-graduating/' },
    '/lope-is-graduating/**': { proxy: 'https://guestbook-lopes-projects-7fdc62e5.vercel.app/lope-is-graduating/**' },
    '/': { prerender: true },
    '/projects': { prerender: true },
    '/play': { prerender: true },
    '/talks': { prerender: true },
    '/giving-talks': { prerender: true },
    '/blog/**': { prerender: true },
    '/feed.xml': { prerender: true },
    '/releases': { isr: 60 * 60 },
    '/api/releases/**': { swr: 60 * 60 },
    ...redirectRouteRules,
  },
})
