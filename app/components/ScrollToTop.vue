<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import { css } from 'styled-system/css'

const { y } = useWindowScroll()

const button = css({
  position: 'fixed',
  bottom: '6',
  insetEnd: '6',
  zIndex: '50',
  w: '10',
  h: '10',
  rounded: 'full',
  display: 'grid',
  placeItems: 'center',
  borderWidth: '1px',
  borderColor: 'ink/10',
  bg: 'bg.soft',
  boxShadow: 'lg',
  color: 'ink.muted',
  transition: 'colors',
  _hover: { color: 'ink', bg: 'ink/10' },
})

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <Transition name="scroll-to-top">
    <ark.button
      v-if="y > 400"
      type="button"
      aria-label="Scroll to top"
      :class="button"
      @click="scrollToTop"
    >
      <span class="i-lucide-arrow-up" aria-hidden="true" />
    </ark.button>
  </Transition>
</template>

<style scoped>
.scroll-to-top-enter-active,
.scroll-to-top-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.scroll-to-top-enter-from,
.scroll-to-top-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.9);
}

@media (prefers-reduced-motion: reduce) {
  .scroll-to-top-enter-active,
  .scroll-to-top-leave-active {
    transition: opacity 0.25s ease;
  }
  .scroll-to-top-enter-from,
  .scroll-to-top-leave-to {
    transform: none;
  }
}
</style>
