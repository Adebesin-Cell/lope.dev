<script setup lang="ts">
import type { Fn } from '@vueuse/core'
import { ark } from '@ark-ui/vue/factory'

const r180 = Math.PI
const r90 = Math.PI / 2
const r15 = Math.PI / 12
const color = '#88888825'

const el = ref<HTMLCanvasElement | null>(null)
const { random } = Math
const size = reactive(useWindowSize())
const MIN_BRANCH = 30
const len = 6

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

function polar2cart(x: number, y: number, r: number, theta: number) {
  return [x + r * Math.cos(theta), y + r * Math.sin(theta)] as const
}

onMounted(() => {
  // Respect reduced-motion — leave the canvas blank rather than animate.
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches)
    return

  const canvas = el.value
  if (!canvas)
    return

  const ctx = initCanvas(canvas, size.width, size.height)
  const { width, height } = canvas

  let steps: Fn[] = []
  let prevSteps: Fn[] = []

  const step = (x: number, y: number, rad: number, counter = { value: 0 }) => {
    const length = random() * len
    counter.value += 1

    const [nx, ny] = polar2cart(x, y, length, rad)
    ctx.beginPath()
    ctx.moveTo(x, y)
    ctx.lineTo(nx, ny)
    ctx.stroke()

    const rad1 = rad + random() * r15
    const rad2 = rad - random() * r15

    if (nx < -100 || nx > size.width + 100 || ny < -100 || ny > size.height + 100)
      return

    const rate = counter.value <= MIN_BRANCH ? 0.8 : 0.5
    if (random() < rate)
      steps.push(() => step(nx, ny, rad1, counter))
    if (random() < rate)
      steps.push(() => step(nx, ny, rad2, counter))
  }

  let lastTime = performance.now()
  const interval = 1000 / 40

  const frame = () => {
    if (performance.now() - lastTime < interval)
      return

    prevSteps = steps
    steps = []
    lastTime = performance.now()

    if (!prevSteps.length)
      controls.pause()

    prevSteps.forEach((i) => {
      if (random() < 0.5)
        steps.push(i)
      else
        i()
    })
  }

  const controls = useRafFn(frame, { immediate: false })
  const randomMiddle = () => random() * 0.6 + 0.2

  ctx.clearRect(0, 0, width, height)
  ctx.lineWidth = 1
  ctx.strokeStyle = color
  steps = [
    () => step(randomMiddle() * size.width, -5, r90),
    () => step(randomMiddle() * size.width, size.height + 5, -r90),
    () => step(-5, randomMiddle() * size.height, 0),
    () => step(size.width + 5, randomMiddle() * size.height, r180),
  ]
  if (size.width < 500)
    steps = steps.slice(0, 2)
  controls.resume()

  onBeforeUnmount(() => controls.pause())
})
</script>

<template>
  <ark.div
    class="fixed inset-0 -z-10 pointer-events-none print:hidden"
    aria-hidden="true"
    style="mask-image: radial-gradient(circle, transparent, black); -webkit-mask-image: radial-gradient(circle, transparent, black);"
  >
    <canvas ref="el" width="400" height="400" />
  </ark.div>
</template>
