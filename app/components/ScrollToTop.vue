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
      class="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full grid place-items-center border border-white/10 bg-white/5 backdrop-blur text-ink-muted hover:text-ink hover:bg-white/10 transition-colors"
      @click="scrollToTop"
    >
      <span class="i-lucide-arrow-up" />
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
</style>
