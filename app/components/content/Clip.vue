<script setup lang="ts">
const props = defineProps<{
  src: string
  alt: string
  width?: string | number
  height?: string | number
}>()

const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')
</script>

<template>
  <video
    :src="props.src"
    :aria-label="props.alt"
    :title="props.alt"
    :width="props.width"
    :height="props.height"
    :autoplay="!reduced"
    :loop="!reduced"
    :controls="reduced"
    muted
    playsinline
    preload="metadata"
  />
</template>
