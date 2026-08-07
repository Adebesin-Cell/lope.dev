<script setup lang="ts">
import type { CardFormat } from '~/composables/useHighlightCard'
import { ark } from '@ark-ui/vue/factory'

const props = defineProps<{ title?: string, url?: string, date?: string }>()

const { draw } = useHighlightCard()

const year = computed(() => (props.date ? String(new Date(props.date).getFullYear()) : undefined))

const open = ref(false)
const quote = ref('')
const format = ref<CardFormat>('x')
const copied = ref(false)
const canvasRef = ref<HTMLCanvasElement>()
const dialogRef = ref<{ $el?: HTMLElement }>()
let lastFocused: HTMLElement | null = null

function onSelect() {
  if (open.value)
    return
  const sel = window.getSelection()
  const raw = sel?.toString().trim() ?? ''
  if (!sel || sel.isCollapsed || raw.length < 12)
    return
  const node = sel.anchorNode
  const el = node instanceof Element ? node : node?.parentElement
  if (!el?.closest('.prose-content'))
    return
  quote.value = raw.replace(/\s*\n\s*/g, '\n').slice(0, 600)
  sel.removeAllRanges()
  lastFocused = document.activeElement as HTMLElement | null
  format.value = 'x'
  open.value = true
  document.body.style.overflow = 'hidden'
  nextTick(() => dialogRef.value?.$el?.focus())
}

function close() {
  open.value = false
  document.body.style.overflow = ''
  lastFocused?.focus()
}

async function download(fmt: CardFormat) {
  format.value = fmt
  if (!canvasRef.value)
    return
  await draw(canvasRef.value, fmt, { quote: quote.value, title: props.title, url: props.url, year: year.value })
  canvasRef.value.toBlob((blob) => {
    if (!blob)
      return
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `highlight-${fmt}.png`
    a.click()
    URL.revokeObjectURL(a.href)
  }, 'image/png')
}

async function copyCard() {
  if (!canvasRef.value)
    return
  await draw(canvasRef.value, format.value, { quote: quote.value, title: props.title, url: props.url, year: year.value })
  canvasRef.value.toBlob(async (blob) => {
    try {
      if (!blob)
        throw new Error('no blob')
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
    }
    catch {
      await navigator.clipboard.writeText(quote.value)
    }
    copied.value = true
    setTimeout(() => { copied.value = false }, 1500)
  }, 'image/png')
}

function trapTab(e: KeyboardEvent) {
  if (e.key !== 'Tab')
    return
  const nodes = dialogRef.value?.$el?.querySelectorAll<HTMLElement>('button:not([disabled])')
  if (!nodes?.length)
    return
  const first = nodes[0]!
  const last = nodes[nodes.length - 1]!
  const active = document.activeElement
  if (e.shiftKey && (active === first || active === dialogRef.value?.$el)) {
    last.focus()
    e.preventDefault()
  }
  else if (!e.shiftKey && active === last) {
    first.focus()
    e.preventDefault()
  }
}

onKeyStroke('Escape', (e) => {
  if (open.value) {
    close()
    e.preventDefault()
  }
})

if (import.meta.client) {
  document.addEventListener('mouseup', onSelect)
  document.addEventListener('touchend', onSelect)
  onBeforeUnmount(() => {
    document.removeEventListener('mouseup', onSelect)
    document.removeEventListener('touchend', onSelect)
    document.body.style.overflow = ''
  })
}
</script>

<template>
  <ClientOnly>
    <Teleport to="body">
      <Transition
        enter-active-class="transition-opacity duration-200 ease-out"
        enter-from-class="opacity-0"
        leave-active-class="transition-opacity duration-150 ease-in"
        leave-to-class="opacity-0"
      >
        <ark.div
          v-if="open"
          ref="dialogRef"
          role="dialog"
          aria-modal="true"
          aria-label="Share this highlight"
          tabindex="-1"
          class="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-5 bg-black/55 p-6 backdrop-blur-md outline-none"
          @click.self="close"
          @keydown="trapTab"
        >
          <ShareCard :quote="quote" :title="title" :url="url" :year="year" :format="format" />

          <ark.div class="flex flex-wrap items-center justify-center gap-2.5">
            <ark.button
              type="button"
              aria-label="Save a square card for Instagram"
              class="btn"
              :class="format === 'ig' ? 'btn-solid' : 'btn-ghost'"
              @click="download('ig')"
            >
              <ark.span class="i-lucide-arrow-down" aria-hidden="true" /> Save for Instagram
            </ark.button>
            <ark.button
              type="button"
              aria-label="Save a wide card for X"
              class="btn"
              :class="format === 'x' ? 'btn-solid' : 'btn-ghost'"
              @click="download('x')"
            >
              <ark.span class="i-lucide-arrow-down" aria-hidden="true" /> Save for X
            </ark.button>
            <ark.button
              type="button"
              aria-label="Copy the card to your clipboard"
              class="btn btn-ghost"
              @click="copyCard"
            >
              <ark.span :class="copied ? 'i-lucide-check' : 'i-lucide-copy'" aria-hidden="true" />
              {{ copied ? 'Copied' : 'Copy' }}
            </ark.button>
          </ark.div>

          <ark.button
            type="button"
            aria-label="Close"
            title="Close (Esc)"
            class="absolute top-5 end-5 inline-flex items-center justify-center w-9 h-9 rounded-lg text-ink-muted hover:text-ink hover:bg-ink/10 transition-colors"
            @click="close"
          >
            <ark.span class="i-lucide-x text-lg" aria-hidden="true" />
          </ark.button>

          <canvas ref="canvasRef" class="hidden" aria-hidden="true" />
        </ark.div>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>
