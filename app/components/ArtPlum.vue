<script setup lang="ts">
import type { Fn } from '@vueuse/core'
import { ark } from '@ark-ui/vue/factory'
import { css } from 'styled-system/css'

const host = css({ position: 'fixed', inset: '0', zIndex: '-10', pointerEvents: 'none', _print: { display: 'none' } })

const STROKE_COLOR = '#88888825'
const SEGMENT_MAX_LENGTH = 6
const MAX_BEND = Math.PI / 12
const OFFSCREEN_MARGIN = 100
const SEED_INSET = 5
const SEED_SPAN = { start: 0.2, size: 0.6 }
const NARROW_SCREEN = 500
const NARROW_SCREEN_SEEDS = 2
const FRAMES_PER_SECOND = 40
const EARLY_STEPS = 30
const BRANCH_CHANCE = { early: 0.8, late: 0.5 }
const DEFER_CHANCE = 0.5
const DIRECTION = { right: 0, down: Math.PI / 2, left: Math.PI, up: -Math.PI / 2 }

const el = ref<HTMLCanvasElement | null>(null)
const { random } = Math
const size = reactive(useWindowSize())

function initCanvas(canvas: HTMLCanvasElement, width: number, height: number) {
  const ctx = canvas.getContext('2d')!
  const dpr = window.devicePixelRatio || 1
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  canvas.width = dpr * width
  canvas.height = dpr * height
  ctx.scale(dpr, dpr)
  return ctx
}

function isOffscreen(x: number, y: number) {
  return (
    x < -OFFSCREEN_MARGIN ||
    x > size.width + OFFSCREEN_MARGIN ||
    y < -OFFSCREEN_MARGIN ||
    y > size.height + OFFSCREEN_MARGIN
  )
}

function polar2cart(x: number, y: number, r: number, theta: number) {
  return [x + r * Math.cos(theta), y + r * Math.sin(theta)] as const
}

onMounted(() => {
  // Respect reduced-motion — leave the canvas blank rather than animate.
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

  const canvas = el.value
  if (!canvas) return

  const ctx = initCanvas(canvas, size.width, size.height)
  const { width, height } = canvas

  let steps: Fn[] = []
  let prevSteps: Fn[] = []

  const step = (x: number, y: number, rad: number, counter = { value: 0 }) => {
    const length = random() * SEGMENT_MAX_LENGTH
    counter.value += 1

    const [nx, ny] = polar2cart(x, y, length, rad)
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(nx, ny)
    ctx.stroke()

    const rad1 = rad + random() * MAX_BEND
    const rad2 = rad - random() * MAX_BEND

    if (isOffscreen(nx, ny)) return

    const rate = counter.value <= EARLY_STEPS ? BRANCH_CHANCE.early : BRANCH_CHANCE.late
    if (random() < rate) steps.push(() => step(nx, ny, rad1, counter))
    if (random() < rate) steps.push(() => step(nx, ny, rad2, counter))
  }

  let lastTime = performance.now()
  const interval = 1000 / FRAMES_PER_SECOND

  const frame = () => {
    if (performance.now() - lastTime < interval) return

    prevSteps = steps
    steps = []
    lastTime = performance.now()

    if (!prevSteps.length) controls.pause()

    prevSteps.forEach((i) => {
      if (random() < DEFER_CHANCE) steps.push(i)
      else i()
    })
  }

  const controls = useRafFn(frame, { immediate: false })
  const randomMiddle = () => random() * SEED_SPAN.size + SEED_SPAN.start

  ctx.clearRect(0, 0, width, height)
  ctx.lineWidth = 1
  ctx.strokeStyle = STROKE_COLOR
  steps = [
    () => step(randomMiddle() * size.width, -SEED_INSET, DIRECTION.down),
    () => step(randomMiddle() * size.width, size.height + SEED_INSET, DIRECTION.up),
    () => step(-SEED_INSET, randomMiddle() * size.height, DIRECTION.right),
    () => step(size.width + SEED_INSET, randomMiddle() * size.height, DIRECTION.left),
  ]
  if (size.width < NARROW_SCREEN) steps = steps.slice(0, NARROW_SCREEN_SEEDS)
  controls.resume()

  onBeforeUnmount(() => controls.pause())
})
</script>

<template>
  <ark.div
    :class="host"
    aria-hidden="true"
    style="
      mask-image: radial-gradient(circle, transparent, black);
      -webkit-mask-image: radial-gradient(circle, transparent, black);
    "
  >
    <canvas ref="el" width="400" height="400" />
  </ark.div>
</template>
