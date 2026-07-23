<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import { play } from '~~/shared/data/play'

usePageSeo({
  title: 'Play — Adebesin Tolulope',
  description: 'A corner for animated pages, scroll journeys, and little games Lope builds for fun.',
})
</script>

<template>
  <ark.article class="slide-enter-content">
    <ark.header class="text-center mb-12">
      <ark.h1 class="text-4xl font-700 tracking-tight mb-3">
        Play
      </ark.h1>
      <ark.p class="text-ink-muted">
        Animated pages, scroll journeys, and little games I build for fun. Hover to preview.
      </ark.p>
    </ark.header>

    <ark.div class="grid gap-6 sm:grid-cols-2">
      <PlayCard v-for="item in play" :key="item.slug" :item="item" />
    </ark.div>
  </ark.article>
</template>
