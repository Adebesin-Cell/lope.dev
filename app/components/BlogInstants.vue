<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import { css, cx } from 'styled-system/css'
import { button } from 'styled-system/recipes'
import { isMainPart, seriesPath } from '~/utils/series'

interface Slide {
  kind: 'new' | 'series' | 'also'
  kicker: string
  mark: string
  title: string
  description: string
  action: string
  to: string
  more: string
}

const { isRead } = useReads()
const STORAGE_KEY = 'lope:instants-seen'
const DURATION_MS = 7000

const { data } = await useAsyncData('instants', () =>
  queryCollection('blog')
    .select('title', 'description', 'date', 'draft', 'path', 'series', 'part')
    .order('date', 'DESC')
    .all(),
)

const slides = computed<Slide[]>(() => {
  const posts = (data.value ?? []).filter((p) => !p.draft)
  const [latest, second] = posts
  if (!latest) return []

  const out: Slide[] = [
    {
      kind: 'new',
      kicker: 'New post',
      mark: 'NEW',
      title: latest.title,
      description: latest.description ?? '',
      action: 'Read it',
      to: latest.path,
      more: '/blog',
    },
  ]

  const seriesNames = [...new Set(posts.map((p) => p.series).filter((s): s is string => !!s))]
  for (const name of seriesNames) {
    const parts = posts.filter((p) => p.series === name && isMainPart(p.part))
    if (!parts.length) continue
    const ordered = parts.toSorted((a, b) => (a.part ?? 0) - (b.part ?? 0))
    const done = ordered.filter((p) => isRead(p.path)).length
    const next = ordered.find((p) => !isRead(p.path))
    const target = next ?? ordered[0]!
    out.push({
      kind: 'series',
      kicker: 'Series',
      mark: String(parts.length).padStart(2, '0'),
      title: name,
      description: done
        ? next
          ? `You've read ${done} of ${ordered.length}. Up next: ${next.title}.`
          : `You've read all ${ordered.length} parts. Nice. Start over from part one?`
        : `${ordered.length} ${ordered.length === 1 ? 'part' : 'parts'} so far. Start from part one: ${target.title}.`,
      action: done && next ? 'Continue' : 'Start reading',
      to: target.path,
      more: seriesPath(name),
    })
  }

  if (second) {
    out.push({
      kind: 'also',
      kicker: 'Also new',
      mark: 'ALSO',
      title: second.title,
      description: second.description ?? '',
      action: 'Read it',
      to: second.path,
      more: '/blog',
    })
  }

  return out
})

const latestPath = computed(() => slides.value[0]?.to ?? '')
const open = useState('instants-open', () => false)
const active = ref(0)
const paused = ref(false)
const hovering = ref(false)
const reduceMotion = ref(false)
const track = useTrack()

const stackSlides = computed(() => slides.value.slice(0, 3).toReversed())
const current = computed(() => slides.value[active.value])
const isLast = computed(() => active.value >= slides.value.length - 1)
const running = computed(() => !paused.value && !hovering.value && !reduceMotion.value && !isLast.value)

const unseen = ref(false)
const panelEl = ref<HTMLElement>()
const stackEl = ref<HTMLElement>()

onMounted(() => {
  reduceMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let seen = ''
  try {
    seen = localStorage.getItem(STORAGE_KEY) ?? ''
  } catch {}
  unseen.value = !!latestPath.value && seen !== latestPath.value
})

async function expand() {
  active.value = 0
  paused.value = false
  open.value = true
  track('instants_view', { slides: slides.value.length, unseen: unseen.value ? 1 : 0 })
  unseen.value = false
  try {
    localStorage.setItem(STORAGE_KEY, latestPath.value)
  } catch {}
  await nextTick()
  panelEl.value?.focus()
}

const route = useRoute()
watch(
  () => route.path,
  () => {
    open.value = false
  },
)

onBeforeUnmount(() => {
  open.value = false
})

function go(i: number) {
  active.value = (i + slides.value.length) % slides.value.length
}

async function close() {
  open.value = false
  hovering.value = false
  track('instants_close', { slide: current.value?.kind ?? '' })
  await nextTick()
  stackEl.value?.focus()
}

function follow(where: 'action' | 'more') {
  track('instants_click', { slide: current.value?.kind ?? '', where })
}

const panel = css({
  position: 'fixed',
  zIndex: '50',
  bottom: { base: '4', md: '6' },
  insetEnd: { base: '4', md: '6' },
  insetStart: { base: '4', sm: 'auto' },
  w: { sm: 'sm' },
  rounded: '2xl',
  borderWidth: '1px',
  borderColor: 'ink/12',
  bg: 'bg.soft',
  boxShadow: '2xl',
  overflow: 'hidden',
})
const stack = css({
  position: 'fixed',
  zIndex: '40',
  bottom: { base: '20', md: '24' },
  insetEnd: { base: '-7', md: '10' },
  w: { base: '20', md: '24' },
  h: { base: '24', md: '28' },
  cursor: 'pointer',
})
const stackHotStyles = css.raw({ bg: 'accent', borderColor: 'accent', color: 'accent.fg' })
const bubble = css({
  display: { base: 'none', md: 'block' },
  position: 'absolute',
  insetEnd: '[calc(100% + 20px)]',
  top: '1',
  w: '60',
  px: '3.5',
  py: '2.5',
  rounded: '2xl',
  bg: 'accent',
  color: 'accent.fg',
  boxShadow: 'xl',
  textAlign: 'start',
  _after: {
    content: '""',
    position: 'absolute',
    insetEnd: '-1.5',
    top: '5',
    w: '3',
    h: '3',
    bg: 'accent',
    transform: '[rotate(45deg)]',
    rounded: 'xs',
  },
})
const bubbleKicker = css({
  display: 'block',
  fontFamily: 'mono',
  fontSize: '2xs',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  opacity: '0.7',
})
const bubbleTitle = css({
  display: 'block',
  mt: '0.5',
  fontSize: 'sm',
  fontWeight: 'semibold',
  lineHeight: 'snug',
  lineClamp: '2',
})
const stackCardStyles = css.raw({
  position: 'absolute',
  inset: '0',
  rounded: 'xl',
  borderWidth: '1px',
  borderColor: 'ink/15',
  bg: 'bg.soft',
  boxShadow: 'xl',
  overflow: 'hidden',
  display: 'grid',
  placeItems: 'center',
  _first: { bg: 'ink/8' },
  color: 'ink.muted',
})
const stackCard = css(stackCardStyles)
const stackCardHot = css(stackCardStyles, stackHotStyles)
const stackMark = css({
  fontSize: 'md',
  fontWeight: 'black',
  letterSpacing: 'tighter',
  transform: '[rotate(90deg)]',
})
const stackDot = css({
  position: 'absolute',
  top: '-1',
  insetStart: '-1',
  w: '3.5',
  h: '3.5',
  rounded: 'full',
  bg: 'accent',
  color: 'accent',
  borderWidth: '2px',
  borderColor: 'bg',
})
const cover = css({ position: 'relative', px: '5', pt: '4', pb: '5', overflow: 'hidden', bg: 'ink/4' })
const dots = css({
  position: 'absolute',
  inset: '0',
  color: 'ink/12',
  bgImage: '[radial-gradient(currentColor 1px, transparent 1px)]',
  bgSize: '[14px 14px]',
  maskImage: '[linear-gradient(to bottom, black, transparent)]',
  pointerEvents: 'none',
})
const bars = css({ position: 'relative', display: 'flex', gap: '1', mb: '4' })
const bar = css({ flex: '1', h: '0.5', rounded: 'full', bg: 'ink/15', overflow: 'hidden' })
const barFill = css({ h: 'full', bg: 'accent', rounded: 'full' })
const head = css({ position: 'relative', display: 'flex', alignItems: 'center', gap: '2' })
const tag = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '1.5',
  px: '2',
  py: '1',
  rounded: 'md',
  borderWidth: '1px',
  borderColor: 'ink/15',
  fontFamily: 'mono',
  fontSize: '2xs',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'ink.muted',
})
const pulse = css({ w: '1.5', h: '1.5', rounded: 'full', bg: 'accent' })
const tools = css({ ms: 'auto', display: 'flex', gap: '1' })
const tool = css({
  display: 'grid',
  placeItems: 'center',
  w: '7',
  h: '7',
  rounded: 'md',
  color: 'ink.muted',
  transition: 'colors',
  _hover: { bg: 'ink/10', color: 'ink' },
})
const mark = css({
  position: 'absolute',
  insetEnd: '-2',
  bottom: '-5',
  fontSize: '7xl',
  fontWeight: 'black',
  letterSpacing: 'tighter',
  lineHeight: 'none',
  opacity: '0.06',
  userSelect: 'none',
  pointerEvents: 'none',
})
const kicker = css({
  position: 'relative',
  mt: '5',
  fontFamily: 'mono',
  fontSize: 'xs',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'ink.faint',
})
const title = css({
  position: 'relative',
  mt: '1.5',
  fontSize: '2xl',
  fontWeight: 'bold',
  letterSpacing: 'tight',
  lineHeight: 'tight',
  textWrap: 'balance',
  lineClamp: '2',
  h: '[2.5em]',
})
const accentButton = css({ bg: 'accent', color: 'accent.fg', minW: '40', _hover: { opacity: '0.9' } })
const body = css({ px: '5', pt: '4', pb: '5' })
const desc = css({ fontSize: 'sm', color: 'ink.muted', lineHeight: 'relaxed', lineClamp: '3', h: '[4.875em]' })
const foot = css({ mt: '4', display: 'flex', alignItems: 'center', gap: '2' })
const pager = css({ display: 'flex', alignItems: 'center', gap: '1.5', me: 'auto' })
const pagerDot = css({
  h: '1.5',
  w: '1.5',
  rounded: 'full',
  bg: 'ink/20',
  transition: 'all',
  '&[aria-current=true]': { w: '4', bg: 'accent' },
})
</script>

<template>
  <ClientOnly>
    <Transition name="instants">
      <button
        v-if="!open && slides.length"
        ref="stackEl"
        type="button"
        :class="[stack, 'instants-stack']"
        :aria-label="`What's new on the blog, ${slides.length} stories`"
        aria-haspopup="dialog"
        :aria-expanded="open"
        @click="expand"
      >
        <ark.span class="instants-slide">
          <ark.span class="instants-float">
            <ark.span
              v-for="(s, i) in stackSlides"
              :key="s.kind + s.to"
              :class="[unseen && i === stackSlides.length - 1 ? stackCardHot : stackCard, 'instants-card']"
              :style="{ '--i': stackSlides.length - 1 - i }"
              aria-hidden="true"
            >
              <ark.span :class="stackMark">{{ s.mark }}</ark.span>
            </ark.span>
            <ark.span v-if="unseen" :class="[stackDot, 'instants-dot']" aria-hidden="true" />
            <ark.span :class="[bubble, 'instants-bubble']" aria-hidden="true">
              <ark.span :class="bubbleKicker">{{ unseen ? 'New post' : "What's new" }}</ark.span>
              <ark.span :class="bubbleTitle">{{
                unseen ? slides[0]?.title : `${slides.length} stories from the blog`
              }}</ark.span>
            </ark.span>
          </ark.span>
        </ark.span>
      </button>
    </Transition>
    <Transition name="instants">
      <section
        v-if="open && current"
        ref="panelEl"
        :class="panel"
        role="dialog"
        aria-label="What's new on the blog"
        tabindex="-1"
        @keydown.esc="close"
        @mouseenter="hovering = true"
        @mouseleave="hovering = false"
        @focusin="hovering = true"
        @focusout="hovering = false"
      >
        <ark.div :class="cover">
          <ark.div :class="dots" aria-hidden="true" />
          <ark.div :class="bars" aria-hidden="true">
            <ark.div v-for="(s, i) in slides" :key="s.kind + s.to" :class="bar">
              <ark.div
                v-if="i === active && !reduceMotion && !isLast"
                :key="active"
                :class="[barFill, 'instants-fill']"
                :style="{ animationDuration: `${DURATION_MS}ms`, animationPlayState: running ? 'running' : 'paused' }"
                @animationend="go(active + 1)"
              />
              <ark.div v-else-if="i <= active" :class="barFill" />
            </ark.div>
          </ark.div>

          <ark.div :class="head">
            <ark.span :class="tag"><ark.span :class="pulse" aria-hidden="true" />lope / blog</ark.span>
            <ark.div :class="tools">
              <NuxtLink :to="current.more" :class="tool" aria-label="Open" @click="follow('more')">
                <ark.span class="i-lucide-arrow-up-right" aria-hidden="true" />
              </NuxtLink>
              <ark.button
                v-if="!reduceMotion"
                type="button"
                :class="tool"
                :aria-label="paused ? 'Play' : 'Pause'"
                :aria-pressed="paused"
                @click="paused = !paused"
              >
                <ark.span :class="paused ? 'i-lucide-play' : 'i-lucide-pause'" aria-hidden="true" />
              </ark.button>
              <ark.button type="button" :class="tool" aria-label="Close" @click="close">
                <ark.span class="i-lucide-x" aria-hidden="true" />
              </ark.button>
            </ark.div>
          </ark.div>

          <ark.span :class="mark" aria-hidden="true">{{ current.mark }}</ark.span>
          <ark.p :class="kicker">{{ current.kicker }}</ark.p>
          <ark.p :class="title">{{ current.title }}</ark.p>
        </ark.div>

        <ark.div :class="body">
          <ark.p :class="desc">{{ current.description }}</ark.p>
          <ark.div :class="foot">
            <ark.div :class="pager">
              <ark.button
                v-for="(s, i) in slides"
                :key="s.kind + s.to"
                type="button"
                :class="pagerDot"
                :aria-label="`Show ${s.kicker.toLowerCase()}: ${s.title}`"
                :aria-current="i === active"
                @click="go(i)"
              />
            </ark.div>
            <ark.button v-if="slides.length > 1" type="button" :class="button()" @click="go(active + 1)">
              Next
            </ark.button>
            <NuxtLink
              :to="current.to"
              :class="cx(button({ variant: 'solid' }), accentButton)"
              @click="follow('action')"
            >
              {{ current.action }}
              <ark.span class="i-lucide-arrow-right" aria-hidden="true" />
            </NuxtLink>
          </ark.div>
        </ark.div>
      </section>
    </Transition>
  </ClientOnly>
</template>

<style scoped>
.instants-stack {
  animation: instants-nudge 7s ease-in-out 2s infinite;
}

.instants-slide {
  display: block;
  width: 100%;
  height: 100%;
  transition: transform 0.45s cubic-bezier(0.3, 1.6, 0.5, 1);
}

.instants-stack:hover .instants-slide,
.instants-stack:focus-visible .instants-slide {
  transform: translateX(-18px);
}

.instants-float {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  animation: instants-float 4.2s ease-in-out infinite;
}

.instants-card {
  transform: rotate(calc(var(--i) * -8deg)) translateX(calc(var(--i) * -7px));
  transition: transform 0.45s cubic-bezier(0.3, 1.6, 0.5, 1);
}

.instants-stack:hover .instants-card,
.instants-stack:focus-visible .instants-card {
  transform: rotate(calc(var(--i) * -16deg)) translate(calc(var(--i) * -16px), calc(var(--i) * -6px));
}

.instants-bubble {
  transform-origin: right center;
  animation: instants-bubble 0.5s cubic-bezier(0.3, 1.6, 0.5, 1) 1.2s both;
}

.instants-stack:hover .instants-bubble,
.instants-stack:focus-visible .instants-bubble {
  transform: translateX(-8px) rotate(3deg);
  transition: transform 0.3s ease;
}

@keyframes instants-bubble {
  from {
    opacity: 0;
    transform: scale(0.6) translateX(12px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.instants-dot::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 9999px;
  border: 2px solid currentColor;
  opacity: 0;
  animation: instants-ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes instants-float {
  0%,
  100% {
    transform: translateY(0) rotate(-6deg);
  }
  50% {
    transform: translateY(-9px) rotate(-1deg);
  }
}

@keyframes instants-nudge {
  0%,
  84%,
  100% {
    transform: translateX(0);
  }
  88% {
    transform: translateX(-16px);
  }
  92% {
    transform: translateX(-6px);
  }
  96% {
    transform: translateX(-11px);
  }
}

@keyframes instants-ping {
  0% {
    transform: scale(0.8);
    opacity: 0.7;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .instants-stack,
  .instants-float,
  .instants-bubble,
  .instants-dot::after {
    animation: none;
  }
  .instants-float {
    transform: rotate(-6deg);
  }
  .instants-slide,
  .instants-card {
    transition: none;
  }
}

.instants-fill {
  width: 0;
  animation-name: instants-fill;
  animation-timing-function: linear;
  animation-fill-mode: forwards;
}

@keyframes instants-fill {
  to {
    width: 100%;
  }
}

.instants-enter-active,
.instants-leave-active {
  transition:
    opacity 0.35s ease,
    transform 0.45s cubic-bezier(0.2, 0.9, 0.3, 1.2);
}

.instants-enter-from,
.instants-leave-to {
  opacity: 0;
  transform: translateY(24px) scale(0.96) rotate(-1deg);
}

@media (prefers-reduced-motion: reduce) {
  .instants-enter-active,
  .instants-leave-active {
    transition: opacity 0.2s ease;
  }
  .instants-enter-from,
  .instants-leave-to {
    transform: none;
  }
}
</style>
