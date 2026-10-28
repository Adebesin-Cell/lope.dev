<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import { css } from 'styled-system/css'

const tabs = [
  { to: '/blog', label: 'Blog' },
  { to: '/talks', label: 'Talks' },
  { to: '/releases', label: 'Releases' },
]

const route = useRoute()

const nav = css({
  mb: '8',
  display: 'flex',
  flexWrap: 'wrap',
  columnGap: '4',
  rowGap: '1',
  fontSize: '3xl',
  fontWeight: 'semibold',
  letterSpacing: 'tight',
  userSelect: 'none',
})
const active = css({ color: 'ink' })
const idle = css({ color: 'ink.faint', transition: 'colors', _hover: { color: 'ink.muted' } })
</script>

<template>
  <ark.nav aria-label="Writing and speaking" :class="nav">
    <NuxtLink
      v-for="t in tabs"
      :key="t.to"
      :to="t.to"
      :aria-current="route.path === t.to ? 'page' : undefined"
      :class="route.path === t.to ? active : idle"
    >
      {{ t.label }}
    </NuxtLink>
  </ark.nav>
</template>
