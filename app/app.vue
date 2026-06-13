<script setup lang="ts">
// Host comes from the `site.url` config (env-driven), so the OG card shows the
// real deploy host — Vercel's URL now, adebesin.com once pointed.
const { url } = useSiteConfig()
const host = url.replace(/^https?:\/\//, '').replace(/\/$/, '')

useHead({
  meta: [
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Adebesin Tolulope (Lope)' },
    { name: 'twitter:site', content: '@I_am_Lope' },
  ],
})

// Site-wide default OG image (nuxt-og-image). Pages override it (e.g. blog posts).
defineOgImage('Default.takumi', { host })
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
