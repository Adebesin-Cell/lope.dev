<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'

const active = ref<HTMLImageElement>()
const src = ref('')
const alt = ref('')

const reduceMotion = import.meta.client
  ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
  : false

function isZoomable(img: HTMLImageElement): boolean {
  return !!img.closest('main .prose-content')
}

function open(img: HTMLImageElement) {
  active.value = img
  src.value = img.currentSrc || img.src
  alt.value = img.alt || ''
  if (import.meta.client)
    document.body.style.overflow = 'hidden'
}

function close() {
  active.value = undefined
  if (import.meta.client)
    document.body.style.overflow = ''
}

function onClick(e: MouseEvent) {
  const target = e.target as HTMLElement | null
  if (!target || target.tagName !== 'IMG')
    return
  const img = target as HTMLImageElement
  if (!isZoomable(img))
    return
  if (img.closest('a'))
    return
  open(img)
}

function markCursors() {
  const imgs = document.querySelectorAll<HTMLImageElement>('main .prose-content img')
  imgs.forEach((img) => {
    img.style.cursor = 'zoom-in'
  })
}

onMounted(() => {
  if (!import.meta.client)
    return
  markCursors()
  document.addEventListener('click', onClick)
})

onBeforeUnmount(() => {
  if (!import.meta.client)
    return
  document.removeEventListener('click', onClick)
  document.body.style.overflow = ''
})

onKeyStroke('Escape', (e) => {
  if (active.value) {
    close()
    e.preventDefault()
  }
})

const enterActive = reduceMotion ? '' : 'transition-all duration-200 ease-out'
const leaveActive = reduceMotion ? '' : 'transition-all duration-150 ease-in'
const fadeFrom = reduceMotion ? '' : 'opacity-0 scale-95'
const fadeTo = reduceMotion ? '' : 'opacity-100 scale-100'
</script>

<template>
  <Teleport to="body">
    <Transition
      :enter-active-class="enterActive"
      :enter-from-class="fadeFrom"
      :enter-to-class="fadeTo"
      :leave-active-class="leaveActive"
      :leave-from-class="fadeTo"
      :leave-to-class="fadeFrom"
    >
      <ark.div
        v-if="active"
        role="dialog"
        aria-modal="true"
        aria-label="Image preview"
        class="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-6 backdrop-blur-md"
        style="cursor: zoom-out"
        @click="close"
      >
        <img
          :src="src"
          :alt="alt"
          class="max-h-[90vh] max-w-[90vw] object-contain"
          style="cursor: zoom-out"
        >
      </ark.div>
    </Transition>
  </Teleport>
</template>
