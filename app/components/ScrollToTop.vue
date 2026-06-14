<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'

const { y } = useWindowScroll()

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
      class="fixed bottom-6 end-6 z-50 w-10 h-10 rounded-full grid place-items-center border border-ink/10 bg-bg-soft/100 shadow-lg shadow-black/10 text-ink-muted hover:text-ink hover:bg-ink/10 transition-colors"
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
