<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
</script>

<template>
  <ark.div class="relative min-h-screen">
    <ark.a
      href="#main"
      class="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-bg-soft focus:px-4 focus:py-2 focus:text-sm focus:ring-2 focus:ring-ink/40"
    >
      Skip to content
    </ark.a>
    <DotBackground />
    <ArtPlum />
    <AppHeader />
    <TocNav />
    <ark.main id="main" class="relative mx-auto max-w-3xl px-6 py-24 md:py-32">
      <slot />
    </ark.main>
    <AppFooter />
    <ScrollToTop />
    <ImageZoom />
  </ark.div>
</template>
