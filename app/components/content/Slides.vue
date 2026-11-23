<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import { css } from 'styled-system/css'

type Slide = { src: string, alt: string, caption?: string }

const props = defineProps<{
  slides: Slide[]
  label?: string
  width?: number
  height?: number
}>()

const track = ref<HTMLElement>()
const active = ref(0)
const reduced = useMediaQuery('(prefers-reduced-motion: reduce)')
const root = ref()
const near = ref(false)
const { stop } = useIntersectionObserver(root, ([entry]) => {
  if (!entry?.isIntersecting)
    return
  near.value = true
  stop()
}, { rootMargin: '400px' })
const last = computed(() => props.slides.length - 1)

function step() {
  const items = track.value?.children
  if (!items || items.length < 2)
    return 1
  return (items[1] as HTMLElement).offsetLeft - (items[0] as HTMLElement).offsetLeft
}

let target: number | null = null
let release: ReturnType<typeof setTimeout> | undefined

function onScroll() {
  if (!track.value)
    return
  const at = track.value.scrollLeft / step()
  if (target !== null) {
    if (Math.abs(at - target) > 0.02)
      return
    target = null
  }
  active.value = Math.min(props.slides.length - 1, Math.max(0, Math.round(at)))
}

onBeforeUnmount(() => clearTimeout(release))

function releaseLock() {
  target = null
}

function go(index: number) {
  const i = Math.min(props.slides.length - 1, Math.max(0, index))
  active.value = i
  target = i
  clearTimeout(release)
  release = setTimeout(() => {
    target = null
    onScroll()
  }, 1000)
  track.value?.scrollTo({ left: i * step(), behavior: reduced.value ? 'auto' : 'smooth' })
}

const keys: Record<string, (i: number) => number> = {
  ArrowRight: i => i + 1,
  ArrowLeft: i => i - 1,
  Home: () => 0,
  End: () => last.value,
}

function onKey(e: KeyboardEvent) {
  const to = keys[e.key]
  if (!to)
    return
  e.preventDefault()
  go(to(active.value))
}

const current = computed(() => props.slides[active.value])
const hasCaptions = computed(() => props.slides.some(s => s.caption))

const frame = css({
  '--w': 'min(720px, 86vw)',
  '--gap': '16px',
  width: '100vw',
  ml: 'calc(50% - 50vw)',
  my: '10',
})

const strip = css({
  display: 'flex',
  gap: 'var(--gap)',
  overflowX: 'auto',
  scrollSnapType: 'x mandatory',
  scrollbarWidth: 'none',
  px: 'calc(50vw - var(--w) / 2)',
  outline: 'none',
  '&::-webkit-scrollbar': { display: 'none' },
  _focusVisible: { '& [data-active=true]': { outline: '2px solid', outlineColor: 'ink', outlineOffset: '3px' } },
})

const slide = css({
  flex: 'none',
  width: 'var(--w)',
  aspectRatio: 'var(--ratio)',
  scrollSnapAlign: 'center',
  rounded: 'xl',
  overflow: 'hidden',
  bg: 'ink/5',
  transition: 'opacity 0.3s ease',
  '&[data-active=false]': { opacity: 0.4 },
  _motionReduce: { transition: 'none' },
  '& img': { width: '100%', height: '100%', objectFit: 'cover', display: 'block', m: '0' },
})

const bar = css({
  display: 'grid',
  gridTemplateColumns: 'auto 4rem auto',
  justifyContent: 'center',
  alignItems: 'center',
  columnGap: '4',
  rowGap: '2',
  mt: '4',
  px: '4',
})

const btn = css({
  display: 'grid',
  placeItems: 'center',
  width: '10',
  height: '10',
  rounded: 'full',
  borderWidth: '1px',
  borderColor: 'ink/15',
  color: 'ink',
  cursor: 'pointer',
  transition: 'background 0.15s',
  _hover: { bg: 'ink/5' },
  _focusVisible: { outline: '2px solid', outlineColor: 'ink', outlineOffset: '2px' },
  '&[aria-disabled=true]': { opacity: 0.35, cursor: 'not-allowed' },
})

const count = css({
  textAlign: 'center',
  fontSize: 'sm',
  fontWeight: 'semibold',
  fontVariantNumeric: 'tabular-nums',
  color: 'ink.muted',
})

const caption = css({
  gridColumn: '1 / -1',
  justifySelf: 'center',
  width: 'min(100%, 32rem)',
  minHeight: { base: '3lh', sm: '2lh' },
  textAlign: 'center',
  fontSize: 'sm',
  lineHeight: 'snug',
  textWrap: 'balance',
  color: 'ink.muted',
})

const sr = css({ srOnly: true })
</script>

<template>
  <ark.figure
    ref="root"
    :class="frame"
    :style="{ '--ratio': `${props.width ?? 16} / ${props.height ?? 9}` }"
    role="region"
    aria-roledescription="carousel"
    :aria-label="props.label ?? 'Slides'"
  >
    <div ref="track" :class="strip" tabindex="0" role="group" aria-label="Slides, use arrow keys" @pointerdown="releaseLock" @wheel.passive="releaseLock" @touchstart.passive="releaseLock" @scroll.passive="onScroll" @keydown="onKey">
      <ark.div
        v-for="(s, i) in props.slides"
        :key="s.src"
        :class="slide"
        :data-active="i === active"
        role="group"
        aria-roledescription="slide"
        :aria-label="`${i + 1} of ${props.slides.length}`"
        @click="go(i)"
      >
        <img :src="near ? s.src : undefined" :alt="s.alt" :width="props.width" :height="props.height" loading="lazy" decoding="async">
      </ark.div>
    </div>
    <ark.figcaption :class="bar">
      <ark.button type="button" :class="btn" aria-label="Previous slide" :aria-disabled="active === 0" @click="go(active - 1)">
        <ark.span class="i-lucide-arrow-left" aria-hidden="true" />
      </ark.button>
      <ark.span :class="count" aria-hidden="true">{{ active + 1 }}/{{ props.slides.length }}</ark.span>
      <ark.button type="button" :class="btn" aria-label="Next slide" :aria-disabled="active === last" @click="go(active + 1)">
        <ark.span class="i-lucide-arrow-right" aria-hidden="true" />
      </ark.button>
      <ark.p :class="hasCaptions ? caption : sr" aria-live="polite">
        <ark.span :class="sr">Slide {{ active + 1 }} of {{ props.slides.length }}: </ark.span>{{ current?.caption ?? current?.alt }}
      </ark.p>
    </ark.figcaption>
  </ark.figure>
</template>
