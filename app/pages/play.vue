<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import { css } from 'styled-system/css'
import { play } from '~~/shared/data/play'

const lead = css({ color: 'ink.muted' })
const pageTitle = css({ textStyle: 'display', mb: '3' })

usePageSeo({
  title: 'Play — Adebesin Tolulope',
  description: 'A corner for animated pages, scroll journeys, and little games Lope builds for fun.',
})

const header = css({ mb: '10' })
const grid = css({ display: 'grid', gap: '6', gridTemplateColumns: { sm: 'repeat(2, minmax(0, 1fr))' } })
</script>

<template>
  <ark.article class="slide-enter-content">
    <ark.header :class="header">
      <ark.h1 :class="pageTitle">
        Play
      </ark.h1>
      <ark.p :class="lead">
        Animated pages, scroll journeys, and little games I build for fun. Hover to preview.
      </ark.p>
    </ark.header>

    <ark.div :class="grid">
      <PlayCard v-for="item in play" :key="item.slug" :item="item" />
    </ark.div>
  </ark.article>
</template>
