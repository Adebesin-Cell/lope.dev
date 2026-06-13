<script setup lang="ts">
const colorMode = useColorMode()
function toggle() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <button
    type="button"
    aria-label="Toggle theme"
    class="nav-link"
    @click="toggle"
  >
    <ClientOnly>
      <span :class="colorMode.value === 'dark' ? 'i-lucide-moon' : 'i-lucide-sun'" />
      <template #fallback>
        <span class="i-lucide-moon" />
      </template>
    </ClientOnly>
  </button>
</template>
