<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import { css } from 'styled-system/css'

interface Placement {
  x: number
  y: number
  flipX: boolean
  flipY: boolean
}

const EDGE = 8
const GAP = 10
const AHEAD_X = 16
const AHEAD_Y = 20
const BEHIND = 10
const EASE = 0.22

const { note } = useCursorNote()
const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)')
const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

const text = ref('')
const pillEl = ref<HTMLElement>()
const visible = computed(() => finePointer.value && !!note.value)

const pointer = { x: -100, y: -100 }
const current = { x: 0, y: 0 }
let frame = 0
let last = 0

function trackPointer(event: PointerEvent) {
  if (event.pointerType === 'touch') return
  pointer.x = event.clientX
  pointer.y = event.clientY
}

useEventListener('pointermove', trackPointer, { passive: true })
useEventListener('pointerover', trackPointer, { capture: true, passive: true })
useEventListener(
  'scroll',
  () => {
    if (note.value && !note.value.anchor) note.value = null
  },
  { capture: true, passive: true },
)

function clamp(value: number, size: number, viewport: number) {
  return Math.min(Math.max(value, EDGE), Math.max(EDGE, viewport - size - EDGE))
}

function measure(el: HTMLElement): Placement {
  const width = el.offsetWidth
  const height = el.offsetHeight
  const vw = document.documentElement.clientWidth
  const vh = document.documentElement.clientHeight
  const anchor = note.value?.anchor

  if (anchor) {
    const rect = anchor.getBoundingClientRect()
    const flipX = rect.left + width > vw - EDGE
    const flipY = rect.bottom + GAP + height > vh - EDGE
    return {
      x: clamp(flipX ? rect.right - width : rect.left, width, vw),
      y: clamp(flipY ? rect.top - GAP - height : rect.bottom + GAP, height, vh),
      flipX,
      flipY,
    }
  }

  const flipX = pointer.x + AHEAD_X + width > vw - EDGE
  const flipY = pointer.y + AHEAD_Y + height > vh - EDGE
  return {
    x: clamp(flipX ? pointer.x - BEHIND - width : pointer.x + AHEAD_X, width, vw),
    y: clamp(flipY ? pointer.y - BEHIND - height : pointer.y + AHEAD_Y, height, vh),
    flipX,
    flipY,
  }
}

function place(el: HTMLElement, snap: boolean, dt: number) {
  const next = measure(el)
  if (snap || reduceMotion.value || note.value?.anchor) {
    current.x = next.x
    current.y = next.y
  } else {
    const k = 1 - (1 - EASE) ** (dt / 16.67)
    current.x += (next.x - current.x) * k
    current.y += (next.y - current.y) * k
    if (covers(el)) {
      current.x = next.x
      current.y = next.y
    }
  }
  el.style.transform = `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0)`
  const flipX = String(next.flipX)
  const flipY = String(next.flipY)
  if (el.dataset.flipX !== flipX) el.dataset.flipX = flipX
  if (el.dataset.flipY !== flipY) el.dataset.flipY = flipY
}

function covers(el: HTMLElement) {
  return (
    pointer.x >= current.x &&
    pointer.x <= current.x + el.offsetWidth &&
    pointer.y >= current.y &&
    pointer.y <= current.y + el.offsetHeight
  )
}

function tick(now: number) {
  const el = pillEl.value
  if (!el || !visible.value) {
    frame = 0
    return
  }
  place(el, false, last ? Math.min(now - last, 64) : 16.67)
  last = now
  frame = requestAnimationFrame(tick)
}

watch(note, (next) => {
  if (next) text.value = next.text
})

watch(
  visible,
  (shown) => {
    if (!shown || !pillEl.value) return
    place(pillEl.value, true, 0)
    last = 0
    if (!frame) frame = requestAnimationFrame(tick)
  },
  { flush: 'post' },
)

onBeforeUnmount(() => {
  if (frame) cancelAnimationFrame(frame)
})

const layer = css({
  position: 'fixed',
  inset: '0',
  zIndex: '100',
  pointerEvents: 'none',
  overflow: 'hidden',
})
const anchorBox = css({
  position: 'absolute',
  top: '0',
  insetStart: '0',
  willChange: 'transform',
})
const pill = css({
  position: 'relative',
  display: 'block',
  px: '2',
  py: '1',
  rounded: 'md',
  bg: 'accent',
  color: 'accent.fg',
  fontFamily: 'mono',
  fontSize: 'xs',
  fontWeight: 'medium',
  lineHeight: 'tight',
  whiteSpace: 'nowrap',
  boxShadow: 'lg',
  transformOrigin: 'top left',
  _before: {
    content: '""',
    position: 'absolute',
    top: '-1',
    insetStart: '2',
    w: '2',
    h: '2',
    bg: 'accent',
    rounded: '[1px]',
    transform: '[rotate(45deg)]',
  },
  '[data-flip-x=true] &': {
    transformOrigin: 'top right',
    _before: { insetStart: 'auto', insetEnd: '2' },
  },
  '[data-flip-y=true] &': {
    transformOrigin: 'bottom left',
    _before: { top: 'auto', bottom: '-1' },
  },
  '[data-flip-x=true][data-flip-y=true] &': { transformOrigin: 'bottom right' },
})
</script>

<template>
  <ClientOnly>
    <ark.div v-if="finePointer" :class="layer" dir="ltr" aria-hidden="true">
      <Transition name="talking">
        <div v-if="visible" ref="pillEl" :class="anchorBox">
          <ark.span :key="text" :class="[pill, 'talking-pop']">{{ text }}</ark.span>
        </div>
      </Transition>
    </ark.div>
  </ClientOnly>
</template>

<style scoped>
.talking-pop {
  animation: talking-pop 0.38s cubic-bezier(0.3, 1.6, 0.5, 1) both;
}

@keyframes talking-pop {
  from {
    opacity: 0;
    transform: scale(0.5) rotate(-6deg);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

.talking-leave-active {
  transition: opacity 0.18s ease;
}

.talking-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .talking-pop {
    animation: none;
  }
  .talking-leave-active {
    transition: none;
  }
}
</style>
