<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import { css } from 'styled-system/css'
import { button } from 'styled-system/recipes'

interface Question {
  rkey: string
  text: string
  createdAt: string
}

const STORAGE_KEY = 'ama-key'

useSeoMeta({ title: 'AMA inbox', robots: 'noindex, nofollow' })

const pass = ref('')
const key = ref('')
const questions = ref<Question[] | null>(null)
const status = ref<'checking' | 'locked' | 'loading' | 'error' | 'limited' | 'empty' | 'offline'>('checking')
const restoring = ref(false)
const active = ref<number | null>(null)
const current = computed(() => (active.value === null ? null : questions.value?.[active.value]))

async function unlock(k = pass.value) {
  if (!k) {
    status.value = 'empty'
    document.getElementById('ama-pass')?.focus()
    return
  }
  status.value = 'loading'
  try {
    questions.value = await $fetch<Question[]>('/api/ama/inbox', { headers: { 'x-ama-key': k } })
    key.value = k
    try {
      sessionStorage.setItem(STORAGE_KEY, k)
    } catch {}
  } catch (err) {
    const code = (err as { statusCode?: number }).statusCode
    if (code === 401) {
      try {
        sessionStorage.removeItem(STORAGE_KEY)
      } catch {}
    }
    status.value = code === 401 ? 'error' : code === 429 ? 'limited' : 'offline'
  }
}

async function remove(q: Question) {
  if (!window.confirm(`Delete this question?\n\n“${q.text.slice(0, 120)}”`)) return
  try {
    await $fetch(`/api/ama/${encodeURIComponent(q.rkey)}`, { method: 'DELETE', headers: { 'x-ama-key': key.value } })
  } catch {
    window.alert("Couldn't delete that one. Try again in a moment.")
    return
  }
  questions.value = questions.value?.filter((x) => x.rkey !== q.rkey) ?? null
  if (active.value !== null) {
    const len = questions.value?.length ?? 0
    active.value = len ? Math.min(active.value, len - 1) : null
  }
}

function step(dir: number) {
  const len = questions.value?.length ?? 0
  if (active.value === null || !len) return
  active.value = (active.value + dir + len) % len
}

let returnFocus: HTMLElement | null = null
function setInert(on: boolean) {
  const app = document.getElementById('__nuxt')
  if (app) app.inert = on
}
watch(active, (now, before) => {
  if (now !== null && before === null) {
    returnFocus = document.activeElement as HTMLElement | null
    setInert(true)
    nextTick(() => document.querySelector<HTMLElement>('.stage [data-close]')?.focus())
  }
  if (now === null && before !== null) {
    setInert(false)
    returnFocus?.focus()
  }
})
onBeforeUnmount(() => setInert(false))

useEventListener('keydown', (e: KeyboardEvent) => {
  if (active.value === null) return
  if (e.key === 'Escape') active.value = null
  if (e.key === 'ArrowRight') step(1)
  if (e.key === 'ArrowLeft') step(-1)
})

onMounted(() => {
  let saved: string | null = null
  try {
    saved = sessionStorage.getItem(STORAGE_KEY)
  } catch {}
  if (!saved) {
    status.value = 'locked'
    return
  }
  restoring.value = true
  unlock(saved).finally(() => {
    restoring.value = false
  })
})

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function number(i: number) {
  return String((questions.value?.length ?? 0) - i).padStart(2, '0')
}

function size(text: string) {
  if (text.length > 260) return 'sm'
  if (text.length > 120) return 'md'
  return 'lg'
}

const header = css({ mb: '10' })
const pageTitle = css({ textStyle: 'display', mb: '3' })
const lead = css({ color: 'ink.muted' })
const lockWrap = css({ maxW: '[400px]' })
const opening = css({ color: 'ink.faint', fontSize: 'sm' })
const lockTag = css({ display: 'inline-flex', alignItems: 'center', gap: '1.5' })
const fieldWrap = css({ display: 'grid', gap: '2', mt: '6' })
const fieldLabel = css({ fontSize: 'sm', fontWeight: 'medium', color: '[#cfcfcf]' })
const input = css({
  h: '12',
  px: '4',
  rounded: 'lg',
  bg: '[rgba(255,255,255,0.04)]',
  borderWidth: '1px',
  borderColor: '[rgba(255,255,255,0.1)]',
  color: '[#f5f5f5]',
  fontSize: 'md',
  transition: 'colors',
  _focusVisible: { outline: 'none', borderColor: '[rgba(255,255,255,0.4)]' },
  _invalid: { borderColor: '[#ef6c4d]' },
})
const error = css({ mt: '5', minH: '6', fontSize: 'sm', color: 'red.400' })
const empty = css({ color: 'ink.muted' })
const list = css({ '& > * + *': { borderTopWidth: '1px', borderColor: 'ink/10' } })
const row = css({ py: '5', display: 'grid', gap: '3' })
const rowText = css({ color: 'ink', whiteSpace: 'pre-wrap', wordBreak: 'break-word' })
const rowMeta = css({ display: 'flex', alignItems: 'center', gap: '3', fontSize: 'sm', color: 'ink.faint' })
const spacer = css({ flex: '1' })
</script>

<template>
  <ark.article class="slide-enter-content">
    <ark.header :class="header">
      <ark.h1 :class="pageTitle">
        Inbox<template v-if="questions"> · {{ questions.length }}</template>
      </ark.h1>
      <ark.p :class="lead">
        <template v-if="questions"> Open a card to screenshot it. Use ← → to flip through, Esc to close. </template>
        <template v-else> Questions from /ama land here. Only I can open it. </template>
      </ark.p>
    </ark.header>

    <template v-if="questions">
      <ark.p v-if="!questions.length" :class="empty"> No questions yet. </ark.p>
      <ark.ul v-else :class="list">
        <ark.li v-for="(q, i) in questions" :key="q.rkey" :class="row">
          <ark.p :class="rowText"> {{ q.text }} </ark.p>
          <ark.div :class="rowMeta">
            <ark.span> № {{ number(i) }} · {{ fmt(q.createdAt) }} </ark.span>
            <ark.span :class="spacer" />
            <ark.button type="button" :class="button({ variant: 'solid' })" @click="active = i"> Card </ark.button>
            <ark.button type="button" :class="button()" @click="remove(q)"> Delete </ark.button>
          </ark.div>
        </ark.li>
      </ark.ul>
    </template>

    <ark.p v-else-if="status === 'checking' || restoring" :class="opening" aria-live="polite"> Opening inbox… </ark.p>

    <ark.div v-else :class="lockWrap">
      <AmaCard as="form" dim novalidate @submit.prevent="unlock()">
        <ark.div class="ama-row">
          <ark.span> AMA inbox </ark.span>
          <ark.span :class="lockTag"><ark.span class="i-lucide-lock" aria-hidden="true" /> Locked </ark.span>
        </ark.div>
        <ark.div :class="fieldWrap">
          <ark.label for="ama-pass" :class="fieldLabel"> Password </ark.label>
          <input
            id="ama-pass"
            v-model="pass"
            type="password"
            autocomplete="current-password"
            :class="input"
            :aria-invalid="status === 'error' || undefined"
            aria-describedby="ama-lock-feedback"
          />
        </ark.div>
        <ark.button type="submit" class="ama-action" :disabled="status === 'loading'">
          {{ status === 'loading' ? 'Opening…' : 'Unlock' }}
        </ark.button>
      </AmaCard>
      <ark.p id="ama-lock-feedback" :class="error" role="alert">
        <template v-if="status === 'empty'"> Enter the password. </template>
        <template v-else-if="status === 'error'"> Wrong password. </template>
        <template v-else-if="status === 'limited'"> Too many tries. Wait a few minutes. </template>
        <template v-else-if="status === 'offline'"> Couldn't reach the inbox. Try again. </template>
      </ark.p>
    </ark.div>

    <Teleport to="body">
      <div v-if="current && active !== null" class="stage" role="dialog" aria-modal="true" aria-label="Question card">
        <div class="poster">
          <AmaCard poster>
            <div class="ama-row">
              <span>Ask me<br />anything</span>
              <span>№ {{ number(active) }}</span>
            </div>
            <p class="question" :data-size="size(current.text)">{{ current.text }}</p>
            <div class="ama-row bottom">
              <span>lope.adebesin.com/ama</span>
              <span>{{ fmt(current.createdAt) }}</span>
            </div>
          </AmaCard>
        </div>
        <div class="controls">
          <button type="button" aria-label="Previous question" @click="step(-1)">←</button>
          <button type="button" data-close @click="active = null">Close</button>
          <button type="button" @click="remove(current)">Delete</button>
          <button type="button" aria-label="Next question" @click="step(1)">→</button>
        </div>
      </div>
    </Teleport>
  </ark.article>
</template>

<style scoped>
.stage {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: grid;
  place-items: center;
  align-content: center;
  gap: 40px;
  padding: 24px;
  background: #000;
  overflow: auto;
}

.poster {
  width: min(440px, 80vw);
}

.ama-row.bottom {
  text-transform: none;
  letter-spacing: 0.02em;
  font-size: 12px;
  color: #7a7a7a;
}

.question {
  flex: 1;
  display: flex;
  align-items: center;
  margin: 4px 0;
  font:
    600 30px/1.22 'Inter',
    system-ui,
    sans-serif;
  letter-spacing: -0.02em;
  color: #f5f5f5;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
}

.question[data-size='md'] {
  font-size: 23px;
  line-height: 1.3;
}

.question[data-size='sm'] {
  font-size: 17px;
  line-height: 1.45;
  font-weight: 500;
}

.controls {
  display: flex;
  gap: 8px;
}

.controls button {
  height: 36px;
  padding: 0 14px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: #111;
  color: #ededed;
  font:
    500 14px/1 'Inter',
    system-ui,
    sans-serif;
  cursor: pointer;
}

.controls button:hover {
  background: #1c1c1c;
}

.controls button:focus-visible {
  outline: 2px solid #ededed;
  outline-offset: 2px;
}
</style>
