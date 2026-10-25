<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import { css } from 'styled-system/css'

const dots = css({
  position: 'fixed',
  inset: '0',
  zIndex: '-10',
  opacity: '0.6',
  pointerEvents: 'none',
  backgroundImage: 'radial-gradient(circle, {colors.dot} 1px, transparent 1px)',
  backgroundSize: '24px 24px',
})
</script>

<template>
  <ark.div
    :class="dots"
    aria-hidden="true"
  />
</template>
