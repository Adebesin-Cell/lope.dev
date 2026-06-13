export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
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
      title: 'Adebesin Tolulope (Lope)',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Software engineer and open-source contributor, working across the Chakra and IQ ecosystems.' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
      ],
    },
  },
  runtimeConfig: {
    githubToken: process.env.GITHUB_TOKEN || '',
    public: {
      githubUser: 'Adebesin-Cell',
      siteUrl: 'https://lope.adebesin.com',
    },
  },
  nitro: {
    // Prerender content pages at build time so the GitHub releases fetch runs
    // once (during build, with GITHUB_TOKEN) and bakes into the static payload.
    prerender: {
      crawlLinks: true,
      routes: ['/', '/projects', '/talks', '/blog', '/releases'],
    },
  },
  routeRules: {
    // Prerendered, with a 1h stale-while-revalidate net for any runtime hit.
    '/releases': { prerender: true },
    '/api/releases': { swr: 60 * 60 },
  },
})
