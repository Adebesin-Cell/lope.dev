<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'

const props = defineProps<{
  src: string
  light?: string
  alt?: string
}>()

// Swap to the light-mode asset when the page is in light mode (some brand
// marks are tuned per background, e.g. npmx).
const colorMode = useColorMode()
const resolved = computed(() =>
  colorMode.value === 'light' && props.light ? props.light : props.src,
)
</script>

<template>
  <ark.img
    :src="resolved"
    :alt="alt ?? ''"
    loading="lazy"
    class="object-contain"
  />
</template>
