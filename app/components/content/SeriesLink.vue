<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import { HoverCard } from '@ark-ui/vue/hover-card'
import { css } from 'styled-system/css'
import { seriesPath } from '~/utils/series'

defineProps<{ name: string }>()


const trigger = css({
  textDecorationLine: 'underline',
  textDecorationStyle: 'dotted',
  textDecorationColor: 'panda.yellow/60',
  textUnderlineOffset: '4px',
  transition: 'colors',
  _hover: { textDecorationColor: 'panda.yellow' },
  '&[data-state=open]': { textDecorationColor: 'panda.yellow' },
})
const content = css({
  w: '[min(32rem, calc(100vw - 2rem))]',
  p: '5',
  rounded: 'xl',
  bg: 'bg',
  borderWidth: '1px',
  borderColor: 'ink/10',
  boxShadow: 'lg',
  zIndex: '50',
  '@media (hover: none)': { display: 'none' },
})
</script>

<template>
  <HoverCard.Root :open-delay="250" :close-delay="200" :positioning="{ placement: 'top', gutter: 10 }">
    <HoverCard.Trigger as-child>
      <NuxtLink :to="seriesPath(name)" :class="trigger"><slot mdc-unwrap="p" /></NuxtLink>
    </HoverCard.Trigger>
    <Teleport to="body">
      <HoverCard.Positioner>
        <HoverCard.Content :class="content">
          <SeriesCard :name="name" compact />
        </HoverCard.Content>
      </HoverCard.Positioner>
    </Teleport>
  </HoverCard.Root>
</template>
