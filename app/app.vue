<script setup lang="ts">
// Site-wide social/OG defaults. Pages (e.g. blog posts) override og:image /
// og:title via matching `key`s. siteUrl auto-resolves to the live host.
const { siteUrl } = useRuntimeConfig().public
const ogImage = `${siteUrl}/og.png`

useHead({
  meta: [
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Adebesin Tolulope (Lope)' },
    { key: 'og:image', property: 'og:image', content: ogImage },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@I_am_Lope' },
    { key: 'twitter:image', name: 'twitter:image', content: ogImage },
  ],
})
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
