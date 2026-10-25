<script setup lang="ts">
import type { CardFormat } from '~/composables/useHighlightCard'
import { ark } from '@ark-ui/vue/factory'
import { css } from 'styled-system/css'
import { button } from 'styled-system/recipes'

const props = defineProps<{ title?: string; url?: string; date?: string }>()

const { draw } = useHighlightCard()
const track = useTrack()

const year = computed(() => (props.date ? String(new Date(props.date).getFullYear()) : undefined))

const slug = computed(
  () =>
    (props.title ?? 'highlight')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60) || 'highlight',
)

const open = ref(false)
const quote = ref('')
const format = ref<CardFormat>('x')
const copied = ref(false)
const canvasRef = ref<HTMLCanvasElement>()
const dialogRef = ref<{ $el?: HTMLElement }>()
let lastFocused: HTMLElement | null = null

const BLOCKS = 'p, li, blockquote, h1, h2, h3, h4, pre'

function paragraphs(sel: Selection, scope: Element) {
  const range = sel.getRangeAt(0)
  const blocks = [...scope.querySelectorAll(BLOCKS)].filter((b) => range.intersectsNode(b) && !b.querySelector(BLOCKS))
  if (!blocks.length) return sel.toString().replace(/\s+/g, ' ').trim()
  return blocks
    .map((b) => {
      const r = document.createRange()
      r.selectNodeContents(b)
      if (r.compareBoundaryPoints(Range.START_TO_START, range) < 0) r.setStart(range.startContainer, range.startOffset)
      if (r.compareBoundaryPoints(Range.END_TO_END, range) > 0) r.setEnd(range.endContainer, range.endOffset)
      return r.toString().replace(/\s+/g, ' ').trim()
    })
    .filter(Boolean)
    .join('\n')
}

function onSelect() {
  if (open.value) return
  const sel = window.getSelection()
  const raw = sel?.toString().trim() ?? ''
  if (!sel || sel.isCollapsed || raw.length < 12) return
  const node = sel.anchorNode
  const el = node instanceof Element ? node : node?.parentElement
  const scope = el?.closest('.prose-content')
  if (!scope) return
  quote.value = paragraphs(sel, scope).slice(0, 600)
  sel.removeAllRanges()
  lastFocused = document.activeElement as HTMLElement | null
  format.value = 'x'
  open.value = true
  track('highlight_opened', { quote: quote.value.slice(0, 200) })
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
  track('highlight_card_downloaded', { format: fmt, quote: quote.value.slice(0, 200) })
  if (!canvasRef.value) return
  await draw(canvasRef.value, fmt, { quote: quote.value, title: props.title, url: props.url, year: year.value })
  canvasRef.value.toBlob((blob) => {
    if (!blob) return
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `${slug.value}-quote-${fmt}.png`
    a.click()
    URL.revokeObjectURL(a.href)
  }, 'image/png')
}

async function copyCard() {
  if (!canvasRef.value) return
  await draw(canvasRef.value, format.value, {
    quote: quote.value,
    title: props.title,
    url: props.url,
    year: year.value,
  })
  canvasRef.value.toBlob(async (blob) => {
    try {
      if (!blob) throw new Error('no blob')
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
    } catch {
      await navigator.clipboard.writeText(quote.value)
    }
    copied.value = true
    track('highlight_card_copied', { format: format.value, quote: quote.value.slice(0, 200) })
    setTimeout(() => {
      copied.value = false
    }, 1500)
  }, 'image/png')
}

function trapTab(e: KeyboardEvent) {
  if (e.key !== 'Tab') return
  const nodes = dialogRef.value?.$el?.querySelectorAll<HTMLElement>('button:not([disabled])')
  if (!nodes?.length) return
  const first = nodes[0]!
  const last = nodes[nodes.length - 1]!
  const active = document.activeElement
  if (e.shiftKey && (active === first || active === dialogRef.value?.$el)) {
    last.focus()
    e.preventDefault()
  } else if (!e.shiftKey && active === last) {
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

const fadeActiveIn = css({
  transitionProperty: 'opacity',
  transitionDuration: 'normal',
  transitionTimingFunction: 'out',
})
const fadeActiveOut = css({ transitionProperty: 'opacity', transitionDuration: 'fast', transitionTimingFunction: 'in' })
const hidden = css({ opacity: '0' })
const overlay = css({
  position: 'fixed',
  inset: '0',
  zIndex: '200',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '5',
  bg: 'black/55',
  p: '6',
  backdropFilter: '[blur(12px)]',
  outline: 'none',
})
const actions = css({ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '2.5' })
const solid = button({ variant: 'solid' })
const ghost = button()
const closeButton = css({
  position: 'absolute',
  top: '5',
  insetEnd: '5',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  w: '9',
  h: '9',
  rounded: 'lg',
  color: 'ink.muted',
  transition: 'colors',
  _hover: { color: 'ink', bg: 'ink/10' },
})
const closeIcon = css({ fontSize: 'lg' })
const offscreen = css({ display: 'none' })
</script>

<template>
  <ClientOnly>
    <Teleport to="body">
      <Transition
        :enter-active-class="fadeActiveIn"
        :enter-from-class="hidden"
        :leave-active-class="fadeActiveOut"
        :leave-to-class="hidden"
      >
        <ark.div
          v-if="open"
          ref="dialogRef"
          role="dialog"
          aria-modal="true"
          aria-label="Share this highlight"
          tabindex="-1"
          :class="overlay"
          @click.self="close"
          @keydown="trapTab"
        >
          <ShareCard :quote="quote" :title="title" :url="url" :year="year" :format="format" />

          <ark.div :class="actions">
            <ark.button
              type="button"
              aria-label="Save a square card for Instagram"
              :class="format === 'ig' ? solid : ghost"
              @click="download('ig')"
            >
              <ark.span class="i-lucide-arrow-down" aria-hidden="true" /> Save for Instagram
            </ark.button>
            <ark.button
              type="button"
              aria-label="Save a wide card for X"
              :class="format === 'x' ? solid : ghost"
              @click="download('x')"
            >
              <ark.span class="i-lucide-arrow-down" aria-hidden="true" /> Save for X
            </ark.button>
            <ark.button type="button" aria-label="Copy the card to your clipboard" :class="ghost" @click="copyCard">
              <ark.span :class="copied ? 'i-lucide-check' : 'i-lucide-copy'" aria-hidden="true" />
              {{ copied ? 'Copied' : 'Copy' }}
            </ark.button>
          </ark.div>

          <ark.button type="button" aria-label="Close" title="Close (Esc)" :class="closeButton" @click="close">
            <ark.span :class="['i-lucide-x', closeIcon]" aria-hidden="true" />
          </ark.button>

          <canvas ref="canvasRef" :class="offscreen" aria-hidden="true" />
        </ark.div>
      </Transition>
    </Teleport>
  </ClientOnly>
</template>
