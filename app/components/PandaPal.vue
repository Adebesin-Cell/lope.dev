<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import { css } from 'styled-system/css'
import { token } from 'styled-system/tokens'

type Mood = 'happy' | 'wow'
type Spot = 'home' | 'blog' | 'post' | 'projects' | 'play' | 'talks' | 'other'
type Look = -1 | 0 | 1

interface Line {
  id: number
  text: string
  mood?: Mood
  fromEvent?: boolean
}

interface Run {
  x: number
  y: number
  w: number
  fill: string
}

const HIDDEN_KEY = 'lope:panda-hidden'
const GREETED_KEY = 'lope:panda-greeted'
const SAY_EVENT = 'lope:panda-say'
const BUBBLE_MS = 4000
const MAX_BUBBLE_MS = 9000
const MAX_QUEUE = 4
const GAP_MS = 220

const SPRITE = [
  '..ooo........ooo..',
  '.okkko......okkko.',
  '.okkkooooooookkko.',
  '.okkwwwwwwwwwwkko.',
  '..owwwwwwwwwwwwo..',
  '.owwwkkwwwwkkwwwo.',
  '.owwkkkkwwkkkkwwo.',
  '.owkkkkwwwwkkkkwo.',
  '.owkkkwwkkwwkkkwo.',
  '..owwwwwwwwwwwwo..',
  '...ooyyyyyyyyoo...',
  '..okyyyyyyyyyyko..',
  '.okkkkwwwwwwyykko.',
  '.okkkwwwwwwwwykko.',
  '.okkkwwwwwwwwkkko.',
  '..okkwwwwwwwwkko..',
  '..okkkkwwwwkkkko..',
  '...oooooooooooo...',
]
const GLINTS = [
  { x: 6, y: 6 },
  { x: 11, y: 6 },
]

const FILLS: Record<string, string> = {
  o: token.var('colors.ink.faint'),
  k: token.var('colors.accent.fg'),
  w: token.var('colors.lope.50'),
  y: token.var('colors.accent'),
}

const runs: Run[] = SPRITE.flatMap((row, y) => {
  const out: Run[] = []
  let x = 0
  while (x < row.length) {
    const char = row[x]!
    let end = x + 1
    while (row[end] === char) end++
    const fill = FILLS[char]
    if (fill) out.push({ x, y, w: end - x, fill })
    x = end
  }
  return out
})

const GENERAL = [
  "I'm just a pile of rects. Be gentle.",
  'Bamboo count: low. Morale: high.',
  'Black, white, one yellow scarf. That is my palette.',
  'I only eat tokens. Strict ones.',
  'Click me again. I dare you.',
  'shape-rendering: crispEdges. My whole skincare routine.',
  "I'd hug you, but I'm position: fixed.",
  "Bamboo is technically a grass. I've made my peace.",
  'Lope maintains Panda CSS. I maintain vibes.',
  "The yellow? That's the accent token. I'm wearing it.",
  'Still here. Still chewing.',
  "I'm 18 pixels tall and I've never felt bigger.",
]

const BY_SPOT: Record<Spot, string[]> = {
  home: ["Front page. I'm the welcome committee."],
  blog: ['Panda internals: finally, a series about me.', "Pick a post. I'll hold your bamboo."],
  post: ["Take your time. I'm not going anywhere.", 'Reach the end and this one counts. I checked.'],
  projects: ["Panda, Chakra, Ark, Zag. I'm the cute one.", 'Ark and Zag do the hard parts. I do the waving.'],
  play: ["Playground's open. Mind the bamboo.", "Break something. That's what play is for."],
  talks: ["I'd give a talk, but I only speak in rects.", 'Front row seat. Best bamboo in the house.'],
  other: [],
}

const GREETINGS: Record<Spot, string> = {
  home: '',
  blog: 'Welcome to the blog. I guard the bottom-left.',
  post: "Good pick. I'll be down here chewing.",
  projects: "Panda, Chakra, Ark, Zag. I'm the cute one.",
  play: "Playground's open. Mind the bamboo.",
  talks: "Talks! I'd give one, but I only speak in rects.",
  other: '',
}

const route = useRoute()
const track = useTrack()
const { reads } = useReads()

const ready = ref(false)
const hidden = ref(false)
const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
const hovering = ref(false)
const blinking = ref(false)
const look = ref<Look>(0)
const action = ref<'hop' | 'wow' | null>(null)
const message = ref<Line | null>(null)
const queue: Line[] = []
let nextId = 0
let lastText = ''
let pendingJump: 'hop' | 'wow' | null = null
let hideTimer: ReturnType<typeof setTimeout> | undefined
let gapTimer: ReturnType<typeof setTimeout> | undefined
const timers = new Set<ReturnType<typeof setTimeout>>()

const isPhone = useMediaQuery('(max-width: 639px)')
const { isScrolling } = useScroll(import.meta.client ? window : null, { idle: 500 })
const tucked = computed(() => isPhone.value && isScrolling.value && !message.value && !reduceMotion.value)

const spot = computed<Spot>(() => {
  const path = route.path.replace(/\/$/, '') || '/'
  if (path === '/') return 'home'
  if (path === '/blog' || path.startsWith('/blog/series')) return 'blog'
  if (path.startsWith('/blog/')) return 'post'
  if (path === '/projects') return 'projects'
  if (path === '/play') return 'play'
  if (path === '/talks') return 'talks'
  return 'other'
})

const readsLine = computed(() => {
  const n = reads.value.length
  if (!n) return ''
  return n === 1 ? '1 post read. A fine start.' : `${n} posts read. respect.`
})

function timeGreeting() {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) return 'Morning. First bamboo of the day?'
  if (hour >= 12 && hour < 17) return 'Afternoon. Peak snack hours.'
  if (hour >= 17 && hour < 22) return 'Evening. Good hour for a long read.'
  return "Up late? Me too. Pandas don't do bedtimes."
}

function greeting() {
  if ((spot.value === 'blog' || spot.value === 'post') && readsLine.value) return readsLine.value
  return GREETINGS[spot.value] || timeGreeting()
}

function pickLine() {
  const pool = [...BY_SPOT[spot.value], ...GENERAL]
  if (readsLine.value) pool.push(readsLine.value)
  const fresh = pool.filter((text) => text !== lastText)
  return fresh[Math.floor(Math.random() * fresh.length)] ?? GENERAL[0]!
}

function later(fn: () => void, ms: number) {
  const id = setTimeout(() => {
    timers.delete(id)
    fn()
  }, ms)
  timers.add(id)
}

function jump(kind: 'hop' | 'wow') {
  if (reduceMotion.value || action.value === 'wow' || pendingJump === 'wow') return
  const first = pendingJump === null
  pendingJump = kind
  action.value = null
  if (!first) return
  requestAnimationFrame(() => {
    action.value = reduceMotion.value ? null : pendingJump
    pendingJump = null
  })
}

function bubbleMs(text: string) {
  return Math.min(MAX_BUBBLE_MS, Math.max(BUBBLE_MS, text.length * 70))
}

function scheduleHide(ms: number) {
  clearTimeout(hideTimer)
  if (!hovering.value) hideTimer = setTimeout(advance, ms)
}

function show(line: Line) {
  message.value = line
  lastText = line.text
  if (line.mood === 'wow') jump('wow')
  else if (line.mood === 'happy') jump('hop')
  scheduleHide(bubbleMs(line.text))
}

function pause(event: PointerEvent) {
  if (event.pointerType !== 'mouse') return
  hovering.value = true
  clearTimeout(hideTimer)
}

function resume(event: PointerEvent) {
  if (event.pointerType !== 'mouse') return
  hovering.value = false
  if (message.value) scheduleHide(BUBBLE_MS / 2)
}

function advance() {
  message.value = null
  const upcoming = queue.shift()
  if (!upcoming) return
  gapTimer = setTimeout(() => {
    gapTimer = undefined
    show(upcoming)
  }, GAP_MS)
}

function say(text: string, mood?: Mood, fromEvent = false) {
  if (hidden.value) return
  const line: Line = { id: ++nextId, text, mood, fromEvent }
  if (!message.value && !gapTimer) show(line)
  else if (queue.length < MAX_QUEUE) queue.push(line)
}

function poke() {
  track('panda_clicked', { route: route.path })
  jump('hop')
  if (queue.length || gapTimer) return
  const line: Line = { id: ++nextId, text: pickLine() }
  if (message.value?.fromEvent) queue.push(line)
  else show(line)
}

function stopTimers() {
  timers.forEach(clearTimeout)
  timers.clear()
  clearTimeout(hideTimer)
  clearTimeout(gapTimer)
  gapTimer = undefined
}

function hide() {
  stopTimers()
  hidden.value = true
  message.value = null
  queue.length = 0
  try {
    localStorage.setItem(HIDDEN_KEY, '1')
  } catch {}
}

function isSayDetail(value: unknown): value is { text: string; mood?: Mood } {
  if (typeof value !== 'object' || value === null || !('text' in value)) return false
  const { text } = value
  const mood = 'mood' in value ? value.mood : undefined
  return typeof text === 'string' && text.trim() !== '' && (mood === undefined || mood === 'happy' || mood === 'wow')
}

useEventListener(import.meta.client ? window : null, SAY_EVENT, (event: Event) => {
  if (!ready.value || !(event instanceof CustomEvent) || !isSayDetail(event.detail)) return
  say(event.detail.text, event.detail.mood, true)
})

function blinkLoop() {
  later(
    () => {
      blinking.value = !reduceMotion.value
      later(() => {
        blinking.value = false
        if (Math.random() < 0.2) {
          later(() => {
            blinking.value = !reduceMotion.value
            later(() => (blinking.value = false), 120)
          }, 160)
        }
        blinkLoop()
      }, 140)
    },
    2600 + Math.random() * 3200,
  )
}

function fidgetLoop() {
  later(
    () => {
      if (reduceMotion.value) {
        look.value = 0
      } else if (Math.random() < 0.35) {
        jump('hop')
      } else {
        const first: Look = Math.random() < 0.5 ? -1 : 1
        look.value = first
        later(() => (look.value = first === 1 ? -1 : 1), 800)
        later(() => (look.value = 0), 1600)
      }
      fidgetLoop()
    },
    7000 + Math.random() * 6000,
  )
}

onMounted(() => {
  try {
    hidden.value = localStorage.getItem(HIDDEN_KEY) === '1'
  } catch {}
  ready.value = true
  if (hidden.value) return

  blinkLoop()
  fidgetLoop()

  let greeted = false
  try {
    greeted = sessionStorage.getItem(GREETED_KEY) === '1'
  } catch {}
  if (greeted) return
  later(() => {
    try {
      sessionStorage.setItem(GREETED_KEY, '1')
    } catch {}
    say(greeting(), 'happy')
  }, 2000)
})

watch(reduceMotion, (reduce) => {
  if (reduce) action.value = null
})

onBeforeUnmount(stopTimers)

const root = css({
  position: 'fixed',
  zIndex: '40',
  bottom: { base: '3', sm: '6' },
  insetStart: { base: '2', sm: '6' },
  w: { base: '10', sm: '[60px]' },
  h: { base: '10', sm: '[60px]' },
  transition: '[transform 0.35s cubic-bezier(0.3, 1.6, 0.5, 1)]',
  _motionReduce: { transition: '[none]' },
  '&[data-tucked]': { transform: '[translateY(calc(100% + 12px))]' },
})
const sprite = css({
  display: 'block',
  w: 'full',
  h: 'full',
  cursor: 'pointer',
  color: 'ink',
})
const art = css({ display: 'block', w: 'full', h: 'full', overflow: 'visible' })
const live = css({
  position: 'absolute',
  bottom: '[calc(100% + 14px)]',
  insetStart: '0',
  zIndex: '1',
  w: 'max-content',
  maxW: '[min(16rem, calc(100vw - 2rem))]',
  pointerEvents: 'none',
})
const bubble = css({
  position: 'relative',
  px: '3',
  py: '2',
  bg: 'bg.soft',
  color: 'ink',
  borderWidth: '2px',
  borderColor: 'ink',
  boxShadow: '[3px 3px 0 0 {colors.accent}]',
  fontFamily: 'mono',
  fontSize: 'xs',
  lineHeight: 'snug',
  textWrap: 'pretty',
  _before: {
    content: '""',
    position: 'absolute',
    top: '[calc(100% + 2px)]',
    insetStart: '[14px]',
    w: '[6px]',
    h: '[6px]',
    bg: 'ink',
  },
  _after: {
    content: '""',
    position: 'absolute',
    top: '[calc(100% + 10px)]',
    insetStart: '[22px]',
    w: '[4px]',
    h: '[4px]',
    bg: 'ink',
  },
})
const hideButton = css({
  position: 'absolute',
  top: '0',
  insetEnd: '-7',
  display: 'grid',
  placeItems: 'center',
  w: '6',
  h: '6',
  bg: 'bg.soft',
  color: 'ink.muted',
  borderWidth: '1px',
  borderColor: 'ink/20',
  fontSize: '3xs',
  cursor: 'pointer',
  opacity: '0',
  pointerEvents: 'none',
  transition: 'opacity',
  _hover: { color: 'ink', borderColor: 'ink/40' },
  _focusVisible: { opacity: '1', pointerEvents: 'auto' },
  _groupHover: { opacity: '1', pointerEvents: 'auto' },
  _groupFocusWithin: { opacity: '1', pointerEvents: 'auto' },
  '.group[data-talking] &': { opacity: '1', pointerEvents: 'auto' },
})
</script>

<template>
  <ClientOnly>
    <ark.div
      v-if="ready && !hidden"
      :class="[root, 'group']"
      data-panda="bottom-start"
      :data-tucked="tucked || undefined"
      :data-talking="message ? '' : undefined"
      @pointerenter="pause"
      @pointerleave="resume"
    >
      <ark.div :class="live" role="status" aria-live="polite">
        <Transition name="panda-bubble">
          <ark.p v-if="message" :key="message.id" :class="[bubble, 'panda-bubble']">{{ message.text }}</ark.p>
        </Transition>
      </ark.div>
      <ark.button type="button" :class="sprite" aria-label="Panda, say something" @click="poke">
        <ark.span
          :class="['panda-jump', action && `is-${action}`]"
          @animationend="action = null"
          @animationcancel="action = null"
        >
          <svg
            :class="[art, 'panda-bob']"
            viewBox="-1 -1 20 20"
            shape-rendering="crispEdges"
            aria-hidden="true"
            focusable="false"
          >
            <rect v-for="r in runs" :key="`${r.x}-${r.y}`" :x="r.x" :y="r.y" :width="r.w" height="1" :fill="r.fill" />
            <template v-if="!blinking">
              <rect v-for="g in GLINTS" :key="g.x" :x="g.x + look" :y="g.y" width="1" height="1" :fill="FILLS.w" />
            </template>
          </svg>
        </ark.span>
      </ark.button>
      <ark.button type="button" :class="hideButton" aria-label="Hide the panda" @click="hide">
        <ark.span class="i-lucide-x" aria-hidden="true" />
      </ark.button>
    </ark.div>
  </ClientOnly>
</template>

<style scoped>
.panda-jump {
  display: block;
  width: 100%;
  height: 100%;
  transform-origin: 50% 100%;
}

.panda-jump.is-hop {
  animation: panda-hop 0.45s cubic-bezier(0.3, 1.6, 0.5, 1);
}

.panda-jump.is-wow {
  animation: panda-wow 0.7s cubic-bezier(0.3, 1.6, 0.5, 1);
}

.panda-bob {
  animation: panda-bob 1.4s steps(1, end) infinite;
}

.panda-jump.is-hop .panda-bob,
.panda-jump.is-wow .panda-bob {
  animation: none;
}

@keyframes panda-bob {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5%);
  }
}

@keyframes panda-hop {
  0% {
    transform: none;
  }
  25% {
    transform: scale(1.08, 0.9);
  }
  55% {
    transform: translateY(-22%) scale(0.95, 1.06);
  }
  100% {
    transform: none;
  }
}

@keyframes panda-wow {
  0% {
    transform: none;
  }
  20% {
    transform: scale(1.12, 0.86);
  }
  50% {
    transform: translateY(-32%) rotate(-8deg) scale(0.94, 1.08);
  }
  75% {
    transform: translateY(-10%) rotate(4deg);
  }
  100% {
    transform: none;
  }
}

.panda-bubble {
  transform-origin: 18px 100%;
}

.panda-bubble-enter-active {
  transition:
    opacity 0.2s ease,
    transform 0.4s cubic-bezier(0.3, 1.6, 0.5, 1);
}

.panda-bubble-leave-active {
  position: absolute;
  inset-block-end: 0;
  inset-inline-start: 0;
  width: 100%;
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}

.panda-bubble-enter-from,
.panda-bubble-leave-to {
  opacity: 0;
  transform: translateY(6px) scale(0.7);
}

@media (prefers-reduced-motion: reduce) {
  .panda-bob,
  .panda-jump.is-hop,
  .panda-jump.is-wow {
    animation: none;
  }

  .panda-bubble-enter-active,
  .panda-bubble-leave-active {
    transition: opacity 0.2s ease;
  }

  .panda-bubble-enter-from,
  .panda-bubble-leave-to {
    transform: none;
  }
}
</style>
