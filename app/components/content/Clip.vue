<script setup lang="ts">
const props = defineProps<{
  src: string
  alt: string
  poster?: string
  width?: string | number
  height?: string | number
}>()

const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')

const video = ref<HTMLVideoElement>()
const load = ref(false)

const { stop } = useIntersectionObserver(
  video,
  ([entry]) => {
    if (!entry?.isIntersecting)
      return
    load.value = true
    stop()
  },
  { rootMargin: '200px' },
)

watchEffect(() => {
  if (reduced.value)
    load.value = true
})
</script>

<template>
  <video
    ref="video"
    :src="load ? props.src : undefined"
    :poster="props.poster"
    :aria-label="props.alt"
    :title="props.alt"
    :width="props.width"
    :height="props.height"
    :autoplay="!reduced"
    :loop="!reduced"
    :controls="reduced"
    muted
    playsinline
    preload="none"
  />
</template>
