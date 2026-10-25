<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'

const tabs = [
  { to: '/blog', label: 'Blog' },
  { to: '/talks', label: 'Talks' },
  { to: '/releases', label: 'Releases' },
]

const route = useRoute()
</script>

<template>
  <ark.nav aria-label="Writing and speaking" class="mb-8 flex flex-wrap gap-x-4 gap-y-1 text-3xl font-600 tracking-tight select-none">
    <NuxtLink
      v-for="t in tabs"
      :key="t.to"
      :to="t.to"
      :aria-current="route.path === t.to ? 'page' : undefined"
      :class="route.path === t.to ? 'text-ink' : 'text-ink op-25 hover:op-60'"
      class="transition-opacity"
    >
      {{ t.label }}
    </NuxtLink>
  </ark.nav>
</template>
