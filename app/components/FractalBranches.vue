<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import { buildBranches } from '~/composables/useFractal'

// One fractal per corner. Single path each → one continuous stroke-draw.
// Computed once at module init so navigations don't re-randomize.
const corners = [
  { pos: 'top-0 left-0', transform: 'translate(0,0)', delay: '0s', seed: 11 },
  { pos: 'top-0 right-0', transform: 'translate(500,0) scale(-1,1)', delay: '0.4s', seed: 23 },
  { pos: 'bottom-0 left-0', transform: 'translate(0,500) scale(1,-1)', delay: '0.8s', seed: 41 },
  { pos: 'bottom-0 right-0', transform: 'translate(500,500) scale(-1,-1)', delay: '1.2s', seed: 67 },
].map(c => ({
  ...c,
  path: buildBranches({ seed: c.seed, startX: 0, startY: 0, angle: Math.PI * 0.28, length: 110, depth: 9 }),
}))
</script>

<template>
  <ark.div
    class="fractal-host fixed inset-0 -z-10 pointer-events-none"
    aria-hidden="true"
  >
    <ark.svg
      v-for="(c, i) in corners"
      :key="i"
      class="fractal-svg absolute"
      :class="c.pos"
      :style="{ '--delay': c.delay }"
      width="500"
      height="500"
      viewBox="0 0 500 500"
      fill="none"
      stroke="currentColor"
      stroke-width="0.55"
      stroke-linecap="round"
      style="overflow: visible"
    >
      <ark.g :transform="c.transform">
        <ark.path :d="c.path" />
      </ark.g>
    </ark.svg>
  </ark.div>
</template>

<style scoped>
.fractal-host {
  color: rgba(255, 255, 255, 0.42);
}

:global(html.light) .fractal-host {
  color: rgba(0, 0, 0, 0.22);
}

.fractal-svg path {
  stroke-dasharray: 9000;
  stroke-dashoffset: 9000;
  animation: grow 5.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: var(--delay);
}

@keyframes grow {
  to { stroke-dashoffset: 0; }
}
</style>
