<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'

const props = defineProps<{
  title: string
  time?: string
  team?: string
  cta?: string
}>()

const meta = computed(() => [props.time, props.team].filter(Boolean).join(' · '))
const label = computed(() => props.cta ?? 'Open the build guide')

const open = ref(false)
const trigger = ref<HTMLButtonElement>()
const panel = ref<HTMLElement>()
const headingId = useId()

function lockPage(locked: boolean) {
  if (!import.meta.client)
    return
  document.body.style.overflow = locked ? 'hidden' : ''
  const root = document.getElementById('__nuxt')
  if (root)
    root.inert = locked
}

async function show() {
  open.value = true
  lockPage(true)
  await nextTick()
  panel.value?.focus()
}

function hide() {
  open.value = false
  lockPage(false)
  trigger.value?.focus()
}

onKeyStroke('Escape', (e) => {
  if (!open.value)
    return
  hide()
  e.preventDefault()
})

onMounted(() => {
  if (window.location.hash.startsWith('#step-'))
    show()
})

onBeforeUnmount(() => lockPage(false))
</script>

<template>
  <section class="guide">
    <button ref="trigger" type="button" class="guide-trigger" @click="show()">
      <span class="guide-trigger-text">
        <span class="guide-trigger-label">{{ label }}</span>
        <span v-if="meta" class="guide-trigger-meta">{{ meta }}</span>
      </span>
      <span class="guide-trigger-icon" aria-hidden="true">→</span>
    </button>

    <Teleport to="body">
      <ark.div
        v-show="open"
        class="guide-dialog"
        @click.self="hide()"
      >
        <div
          ref="panel"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="headingId"
          tabindex="-1"
          class="guide-panel"
        >
          <header class="guide-head">
            <div>
              <h3 :id="headingId" class="guide-title">{{ props.title }}</h3>
              <p v-if="meta" class="guide-meta">{{ meta }}</p>
            </div>
            <button type="button" class="guide-close" aria-label="Close the build guide" @click="hide()">
              ✕
            </button>
          </header>
          <ol class="guide-steps">
            <slot />
          </ol>
        </div>
      </ark.div>
    </Teleport>
  </section>
</template>

<style>
.guide {
  margin-block: 2rem;
}
.guide-trigger {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  padding: 0.95rem 1.1rem;
  border: 1px solid rgb(var(--ink) / 0.14);
  border-radius: 10px;
  background: rgb(var(--ink) / 0.03);
  text-align: start;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
}
.guide-trigger:hover {
  background: rgb(var(--ink) / 0.07);
  border-color: rgb(var(--ink) / 0.3);
}
.guide-trigger-text {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.15rem;
}
.guide-trigger-label {
  font-size: 0.95rem;
  font-weight: 600;
  color: rgb(var(--ink));
}
.guide-trigger-meta {
  font-size: 0.8rem;
  color: rgb(var(--ink) / 0.5);
}
.guide-trigger-icon {
  color: rgb(var(--ink) / 0.45);
}
.guide-trigger:hover .guide-trigger-icon {
  color: rgb(var(--ink));
}
.guide-dialog {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: rgb(0 0 0 / 0.7);
  backdrop-filter: blur(6px);
}
.guide-panel {
  display: flex;
  flex-direction: column;
  width: min(46rem, 100%);
  max-height: min(85vh, 100%);
  padding: 1.3rem 1.5rem 1.5rem;
  border: 1px solid rgb(var(--ink) / 0.12);
  border-radius: 12px;
  background: rgb(var(--bg));
  color: rgb(var(--ink));
  overflow: hidden;
}
.guide-head {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 0.9rem;
  border-bottom: 1px solid rgb(var(--ink) / 0.08);
}
.guide-title {
  margin: 0;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.guide-meta {
  margin: 0.3rem 0 0;
  font-size: 0.8rem;
  color: rgb(var(--ink) / 0.5);
}
.guide-close {
  flex: none;
  padding: 0.2rem 0.45rem;
  border-radius: 6px;
  color: rgb(var(--ink) / 0.5);
  cursor: pointer;
}
.guide-close:hover {
  background: rgb(var(--ink) / 0.08);
  color: rgb(var(--ink));
}
.guide-steps {
  counter-reset: step;
  margin: 0;
  padding: 0 0.2rem 0 0;
  list-style: none;
  overflow-y: auto;
  overscroll-behavior: contain;
}
@media (max-width: 640px) {
  .guide-dialog {
    padding: 0;
  }
  .guide-panel {
    width: 100%;
    height: 100%;
    max-height: 100%;
    border: 0;
    border-radius: 0;
  }
}
</style>
