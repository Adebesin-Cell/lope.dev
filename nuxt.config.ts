export default defineNuxtConfig({
  modules: [
    '@nuxt/content',
    '@unocss/nuxt',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    'tegaki/nuxt',
    'nuxt-og-image',
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
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
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
    },
  },
  vite: {
    // Pre-bundle these so the dev server stops reloading to discover them.
    optimizeDeps: {
      include: ['@ark-ui/vue/factory', '@vue/devtools-core', '@vue/devtools-kit', 'posthog-js'],
    },
  },
  // Base URL for OG/canonical (auto-resolves to the live host; adebesin.com once pointed).
  site: {
    url:
      process.env.NUXT_PUBLIC_SITE_URL
      || (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`)
      || 'https://lope.cell.vercel.app',
    name: 'Adebesin Tolulope (Lope)',
  },
  ogImage: {
    // OG images are rendered from app/components/OgImage/*.takumi.vue at build
    // (prerendered routes) or on demand — no committed assets, no scripts.
    defaults: { cacheMaxAgeSeconds: 60 * 60 * 24 },
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
