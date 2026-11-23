<script setup lang="ts">
import { css } from 'styled-system/css'

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
const playing = ref(false)

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

function toggle() {
  const v = video.value
  if (!v)
    return
  if (v.paused)
    v.play()
  else
    v.pause()
}

const wrap = css({ position: 'relative', width: 'fit-content', maxW: 'full', mx: 'auto' })

const btn = css({
  position: 'absolute',
  right: '3',
  bottom: '3',
  display: 'grid',
  placeItems: 'center',
  width: '9',
  height: '9',
  rounded: 'full',
  bg: 'rgba(0, 0, 0, 0.55)',
  color: 'white',
  cursor: 'pointer',
  backdropFilter: 'blur(4px)',
  transition: 'background 0.15s',
  _hover: { bg: 'rgba(0, 0, 0, 0.75)' },
  _focusVisible: { outline: '2px solid white', outlineOffset: '2px' },
})
</script>

<template>
  <div :class="wrap">
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
      @play="playing = true"
      @pause="playing = false"
    />
    <button
      v-if="!reduced"
      type="button"
      :class="btn"
      :aria-label="playing ? 'Pause video' : 'Play video'"
      @click="toggle"
    >
      <span :class="playing ? 'i-lucide-pause' : 'i-lucide-play'" aria-hidden="true" />
    </button>
  </div>
</template>
