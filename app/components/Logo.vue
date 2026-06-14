<script setup lang="ts">
import caveat from 'tegaki/fonts/caveat'
</script>

<template>
  <NuxtLink
    to="/"
    aria-label="Home — Adebesin Tolulope"
    class="logo block select-none outline-none"
  >
    <ClientOnly>
      <TegakiRenderer
        :font="caveat"
        text="at"
        :time="{ mode: 'uncontrolled', loop: true, speed: 0.7 }"
        class="logo-text"
      />
      <template #fallback>
        <span class="logo-text">at</span>
      </template>
    </ClientOnly>
  </NuxtLink>
</template>

<style scoped>
.logo {
  font-family: 'Caveat', 'Brush Script MT', cursive;
  font-weight: 700;
  font-size: 2.6rem;
  line-height: 1;
  letter-spacing: -0.04em;
  color: inherit;
}

.logo-text {
  display: inline-block;
}
</style>
