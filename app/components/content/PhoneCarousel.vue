<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import { css } from 'styled-system/css'

type Slide = { src: string, alt: string, caption?: string }

const props = defineProps<{
  slides: Slide[]
  label?: string
  bg?: string
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
  End: () => props.slides.length - 1,
}

function onKey(e: KeyboardEvent) {
  const to = keys[e.key]
  if (!to)
    return
  e.preventDefault()
  go(to(active.value))
}

const current = computed(() => props.slides[active.value])

const stage = css({
  '--w': { base: '200px', md: '232px' },
  '--h': 'calc(var(--w) * 844 / 390)',
  '--gap': '20px',
  '--bezel': '9px',
  '--top': '28px',
  position: 'relative',
  width: '100vw',
  ml: 'calc(50% - 50vw)',
  my: '10',
  pt: '10',
  pb: '6',
  overflow: 'hidden',
  bg: 'var(--stage-bg)',
  boxShadow: 'inset 0 0 120px rgba(0, 0, 0, 0.18)',
})

const strip = css({
  display: 'flex',
  gap: 'var(--gap)',
  overflowX: 'auto',
  scrollSnapType: 'x mandatory',
  scrollbarWidth: 'none',
  px: 'calc(50% - var(--w) / 2)',
  pt: 'var(--top)',
  pb: 'var(--bezel)',
  outline: 'none',
  '&::-webkit-scrollbar': { display: 'none' },
  '&:focus-visible + [data-phone]': { outline: '3px solid white', outlineOffset: '4px' },
})

const slide = css({
  flex: 'none',
  width: 'var(--w)',
  height: 'var(--h)',
  scrollSnapAlign: 'center',
  rounded: '14px',
  overflow: 'hidden',
  bg: 'white',
  boxShadow: '0 18px 30px -12px rgba(0, 0, 0, 0.45)',
  transition: 'transform 0.3s ease, opacity 0.3s ease',
  '&[data-active=false]': { transform: 'scale(0.92)', opacity: 0.8 },
  _motionReduce: { transition: 'none' },
  '& img': { width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block', m: '0' },
})

const phone = css({
  position: 'absolute',
  top: '10',
  left: '50%',
  transform: 'translateX(-50%)',
  boxSizing: 'content-box',
  width: 'var(--w)',
  height: 'var(--h)',
  rounded: '40px',
  borderStyle: 'solid',
  borderColor: '#111',
  borderWidth: 'var(--top) var(--bezel) var(--bezel)',
  boxShadow: '0 0 0 1.5px #3a3a3a, 0 30px 50px -18px rgba(0, 0, 0, 0.6)',
  pointerEvents: 'none',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 'calc(var(--top) * -1 + 8px)',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '30%',
    height: '12px',
    rounded: 'full',
    bg: '#2a2a2a',
  },
})

const bar = css({
  display: 'grid',
  gridTemplateColumns: 'auto 4rem auto',
  justifyContent: 'center',
  alignItems: 'center',
  columnGap: '4',
  rowGap: '2',
  mt: '6',
  px: '4',
  color: 'white',
})

const btn = css({
  display: 'grid',
  placeItems: 'center',
  width: '10',
  height: '10',
  flex: 'none',
  rounded: 'full',
  bg: 'rgba(0, 0, 0, 0.28)',
  color: 'white',
  cursor: 'pointer',
  transition: 'background 0.15s',
  _hover: { bg: 'rgba(0, 0, 0, 0.45)' },
  _focusVisible: { outline: '2px solid white', outlineOffset: '2px' },
  '&[aria-disabled=true]': { opacity: 0.35, cursor: 'not-allowed' },
})

const sr = css({ srOnly: true })

const count = css({
  textAlign: 'center',
  fontSize: 'sm',
  fontWeight: 'semibold',
  fontVariantNumeric: 'tabular-nums',
})

const caption = css({
  gridColumn: '1 / -1',
  justifySelf: 'center',
  width: 'min(100%, 22rem)',
  minHeight: { base: '3lh', sm: '2lh' },
  textAlign: 'center',
  fontSize: 'sm',
  lineHeight: 'snug',
  textWrap: 'balance',
  overflowWrap: 'anywhere',
})
</script>

<template>
  <ark.figure
    ref="root"
    :class="stage"
    :style="{ '--stage-bg': props.bg ?? '#E5649A' }"
    role="region"
    aria-roledescription="carousel"
    :aria-label="props.label ?? 'Screenshots'"
  >
    <div ref="track" :class="strip" tabindex="0" role="group" aria-label="Slides, scroll or use arrow keys" @pointerdown="releaseLock" @wheel.passive="releaseLock" @touchstart.passive="releaseLock" @scroll.passive="onScroll" @keydown="onKey">
      <ark.div
        v-for="(s, i) in props.slides"
        :key="s.src"
        :class="slide"
        :data-active="i === active"
        role="group"
        aria-roledescription="slide"
        :aria-label="`${i + 1} of ${props.slides.length}`"
      >
        <img :src="near ? s.src : undefined" :alt="s.alt" width="390" height="844" loading="lazy" decoding="async">
      </ark.div>
    </div>
    <ark.div :class="phone" data-phone aria-hidden="true" />
    <ark.figcaption :class="bar">
      <ark.button type="button" :class="btn" aria-label="Previous screen" :aria-disabled="active === 0" @click="go(active - 1)">
        <ark.span class="i-lucide-arrow-left" aria-hidden="true" />
      </ark.button>
      <ark.span :class="count" aria-hidden="true">{{ active + 1 }}/{{ props.slides.length }}</ark.span>
      <ark.button type="button" :class="btn" aria-label="Next screen" :aria-disabled="active === props.slides.length - 1" @click="go(active + 1)">
        <ark.span class="i-lucide-arrow-right" aria-hidden="true" />
      </ark.button>
      <ark.p :class="caption" aria-live="polite">
        <ark.span :class="sr">Screen {{ active + 1 }} of {{ props.slides.length }}: </ark.span>{{ current?.caption ?? current?.alt }}
      </ark.p>
    </ark.figcaption>
  </ark.figure>
</template>
