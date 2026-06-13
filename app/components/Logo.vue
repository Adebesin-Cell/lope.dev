<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
// "at" cursive monogram — plain HTML in Caveat (loaded via UnoCSS preset-web-fonts).
// Swap for an SVG signature when one is traced from real handwriting.
</script>

<template>
  <NuxtLink
    to="/"
    aria-label="Home — Adebesin Tolulope"
    class="logo block select-none outline-none"
  >
    <ark.span class="logo-text">at</ark.span>
  </NuxtLink>
</template>

<style scoped>
.logo {
  font-family: 'Caveat', 'Brush Script MT', cursive;
  font-weight: 700;
  font-size: 2.6rem;
  line-height: 1;
  letter-spacing: -0.04em;
}

.logo-text {
  display: inline-block;
  animation: settle 1s ease-out backwards;
}

@keyframes settle {
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
