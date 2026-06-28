import { redirectRouteRules } from './shared/redirects'

export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    'tegaki/nuxt',
    'nuxt-og-image',
    '@nuxtjs/sitemap',
  ],
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
  css: ['@unocss/reset/tailwind.css', '~/assets/css/main.css'],
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
        { name: 'description', content: 'Software engineer and open-source contributor, working across the Chakra and IQ ecosystems.' },
        { name: 'author', content: 'Adebesin Tolulope (Lope)' },
        { name: 'theme-color', content: '#0a0a0a' },
        { property: 'og:site_name', content: 'Adebesin Tolulope (Lope)' },
        { property: 'og:locale', content: 'en_US' },
        { name: 'twitter:site', content: '@I_am_Lope' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
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
        process.env.NUXT_PUBLIC_SITE_URL
        || (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`)
        || 'https://lope.cell.vercel.app',
      posthogPublicKey: process.env.NUXT_PUBLIC_POSTHOG_PUBLIC_KEY || '',
      posthogHost: process.env.NUXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
      posthogOptoutToken: process.env.NUXT_PUBLIC_POSTHOG_OPTOUT_TOKEN || '',
    },
  },
  vite: {
    optimizeDeps: {
      include: ['@ark-ui/vue/factory', '@vue/devtools-core', '@vue/devtools-kit', 'posthog-js'],
    },
  },
  site: {
    url:
      process.env.NUXT_PUBLIC_SITE_URL
      || (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`)
      || 'https://lope.cell.vercel.app',
    name: 'Adebesin Tolulope (Lope)',
  },
  sitemap: {
    excludeAppSources: true,
    sources: ['/api/__sitemap__/urls'],
  },
  ogImage: {
    defaults: { cacheMaxAgeSeconds: 60 * 60 * 24 },
    security: {
      secret: process.env.NUXT_OG_IMAGE_SECRET,
      strict: !!process.env.NUXT_OG_IMAGE_SECRET,
    },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/projects', '/talks', '/blog', '/feed.xml'],
      ignore: ['/releases'],
    },
  },
  routeRules: {
    '/': { prerender: true },
    '/projects': { prerender: true },
    '/talks': { prerender: true },
    '/blog/**': { prerender: true },
    '/feed.xml': { prerender: true },
    '/releases': { isr: 60 * 60 },
    '/api/releases': { swr: 60 * 60 },
    ...redirectRouteRules,
  },
})
