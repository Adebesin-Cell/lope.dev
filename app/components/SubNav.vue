<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import { css } from 'styled-system/css'

const tabs = [
  { to: '/blog', label: 'Blog' },
  { to: '/talks', label: 'Talks' },
  { to: '/releases', label: 'Releases' },
]

const route = useRoute()

const nav = css({ mb: '8', display: 'flex', flexWrap: 'wrap', columnGap: '4', rowGap: '1', fontSize: '3xl', fontWeight: '600', letterSpacing: 'tight', userSelect: 'none' })
const tab = css({ color: 'ink', transition: 'opacity' })
const idle = css({ opacity: '0.25', _hover: { opacity: '0.6' } })
</script>

<template>
  <ark.nav aria-label="Writing and speaking" :class="nav">
    <NuxtLink
      v-for="t in tabs"
      :key="t.to"
      :to="t.to"
      :aria-current="route.path === t.to ? 'page' : undefined"
      :class="[tab, route.path !== t.to && idle]"
    >
      {{ t.label }}
    </NuxtLink>
  </ark.nav>
</template>
