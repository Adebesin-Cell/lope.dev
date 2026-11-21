<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import { css } from 'styled-system/css'

interface Panda {
  id: number
  x: number
  drift: number
  spin: number
  delay: number
  duration: number
  size: number
}

type Via = 'konami' | 'logo'

const STORAGE_KEY = 'lope:panda-mode'
const CLASS_NAME = 'panda-mode'
const KONAMI = [
  'arrowup',
  'arrowup',
  'arrowdown',
  'arrowdown',
  'arrowleft',
  'arrowright',
  'arrowleft',
  'arrowright',
  'b',
  'a',
]
const TAPS = 5
const TAP_WINDOW_MS = 2000
const BURST_COUNT = 24
const BURST_MS = 2400

const track = useTrack()
const on = ref(false)
const message = ref('')
const pandas = ref<Panda[]>([])

let konamiIndex = 0
let taps: number[] = []
let burstTimer: ReturnType<typeof setTimeout> | undefined

function apply(value: boolean) {
  on.value = value
  document.documentElement.classList.toggle(CLASS_NAME, value)
}

function burst() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  clearTimeout(burstTimer)
  pandas.value = Array.from({ length: BURST_COUNT }, (_, id) => ({
    id: Date.now() + id,
    x: Math.random() * 95,
    drift: (Math.random() - 0.5) * 30,
    spin: (Math.random() - 0.5) * 720,
    delay: Math.random() * 400,
    duration: 1300 + Math.random() * 600,
    size: 1.5 + Math.random() * 1.5,
  }))
  burstTimer = setTimeout(() => {
    pandas.value = []
  }, BURST_MS)
}

function toggle(via: Via) {
  const next = !on.value
  apply(next)
  try {
    if (next) localStorage.setItem(STORAGE_KEY, '1')
    else localStorage.removeItem(STORAGE_KEY)
  } catch {}
  message.value = next ? 'Panda mode on' : 'Panda mode off'
  track('panda_mode', { on: next ? 1 : 0, via })
  if (next) {
    burst()
    window.dispatchEvent(new CustomEvent('lope:achievement', { detail: 'secret' }))
  }
}

function isTyping(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false
  return target.isContentEditable || !!target.closest('input, textarea, select, [contenteditable]')
}

function onKeydown(event: KeyboardEvent) {
  if (event.metaKey || event.ctrlKey || event.altKey || isTyping(event.target)) return
  const key = event.key.toLowerCase()
  if (key === KONAMI[konamiIndex]) konamiIndex++
  else konamiIndex = key === KONAMI[0] ? 1 : 0
  if (konamiIndex === KONAMI.length) {
    konamiIndex = 0
    toggle('konami')
  }
}

function onClick(event: MouseEvent) {
  if (!(event.target instanceof Element) || !event.target.closest('[data-secret-trigger]')) return
  const now = performance.now()
  taps = [...taps.filter((t) => now - t < TAP_WINDOW_MS), now]
  if (taps.length >= TAPS) {
    taps = []
    toggle('logo')
  }
}

useEventListener('keydown', onKeydown)
useEventListener('click', onClick, { capture: true })

onMounted(() => {
  let stored = false
  try {
    stored = localStorage.getItem(STORAGE_KEY) === '1'
  } catch {}
  if (stored) apply(true)
})

onBeforeUnmount(() => {
  clearTimeout(burstTimer)
})

const live = css({ srOnly: true })
const layer = css({ position: 'fixed', inset: '0', zIndex: '100', pointerEvents: 'none', overflow: 'hidden' })
const panda = css({ position: 'absolute', top: '0', lineHeight: 'none', userSelect: 'none' })
</script>

<template>
  <ClientOnly>
    <ark.div :class="live" role="status" aria-live="polite">{{ message }}</ark.div>
    <ark.div v-if="pandas.length" :class="layer" aria-hidden="true">
      <ark.span
        v-for="p in pandas"
        :key="p.id"
        :class="[panda, 'secret-panda']"
        :style="{
          insetInlineStart: `${p.x}%`,
          fontSize: `${p.size}rem`,
          '--drift': `${p.drift}vw`,
          '--spin': `${p.spin}deg`,
          animationDelay: `${p.delay}ms`,
          animationDuration: `${p.duration}ms`,
        }"
        >🐼</ark.span
      >
    </ark.div>
  </ClientOnly>
</template>

<style scoped>
.secret-panda {
  opacity: 0;
  transform: translateY(-120%);
  animation-name: secret-panda-fall;
  animation-timing-function: cubic-bezier(0.35, 0, 0.75, 1);
  animation-fill-mode: forwards;
}

@keyframes secret-panda-fall {
  0% {
    opacity: 0;
    transform: translateY(-120%) rotate(0deg);
  }
  10% {
    opacity: 1;
  }
  80% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(var(--drift), 105vh) rotate(var(--spin));
  }
}

@media (prefers-reduced-motion: reduce) {
  .secret-panda {
    display: none;
  }
}
</style>

<style>
html.panda-mode {
  --colors-ink: #f6e458;
  --colors-ink-muted: #d9c64a;
  --colors-ink-faint: #a8993c;
}

html.panda-mode.light {
  --colors-ink: #5c4a00;
  --colors-ink-muted: #6b5600;
  --colors-ink-faint: #7a6400;
}

html.panda-mode ::selection {
  background: #f6e458;
  color: #141414;
}
</style>
