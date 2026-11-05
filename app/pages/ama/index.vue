<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import { css } from 'styled-system/css'

const MAX_LEN = 500

useSeoMeta({
  title: 'Ask me anything — Lope',
  description: 'It is my birthday. Ask me anything.',
  robots: 'noindex, nofollow',
})

const question = ref('')
const website = ref('')
const status = ref<'idle' | 'sending' | 'sent' | 'error' | 'limited' | 'empty'>('idle')
let openedAt = 0
onMounted(() => {
  openedAt = Date.now()
})

async function submit() {
  if (status.value === 'sending') return
  if (!question.value.trim()) {
    status.value = 'empty'
    document.getElementById('ama-question')?.focus()
    return
  }
  status.value = 'sending'
  try {
    await $fetch('/api/ama', {
      method: 'POST',
      body: { question: question.value, website: website.value, elapsed: Date.now() - openedAt },
    })
    question.value = ''
    status.value = 'sent'
  } catch (err) {
    status.value = (err as { statusCode?: number }).statusCode === 429 ? 'limited' : 'error'
  }
}

function again() {
  status.value = 'idle'
  nextTick(() => document.getElementById('ama-question')?.focus())
}

const header = css({ mb: '12' })
const pageTitle = css({ textStyle: 'display', mb: '3' })
const lead = css({ color: 'ink.muted', maxW: 'lg' })
const stage = css({ maxW: '[560px]' })
const field = css({
  flex: '1',
  w: 'full',
  minH: '[180px]',
  bg: 'transparent',
  border: 'none',
  outline: 'none',
  resize: 'none',
  fontSize: '[22px]',
  lineHeight: '[1.35]',
  fontWeight: 'semibold',
  letterSpacing: '[-0.015em]',
  color: '[#f5f5f5]',
  _placeholder: { color: '[#5c5c5c]' },
})
const count = css({ fontVariantNumeric: 'tabular-nums', textTransform: 'none' })
const over = css({ color: '[#ef6c4d]' })
const done = css({ flex: '1', display: 'grid', alignContent: 'center', gap: '2', minH: '[180px]' })
const doneTitle = css({ fontSize: '[28px]', fontWeight: 'semibold', letterSpacing: '[-0.02em]', color: '[#f5f5f5]' })
const doneText = css({ color: '[#a1a1a1]' })
const feedback = css({ mt: '5', minH: '6', fontSize: 'sm', color: 'red.400' })
const trap = css({ srOnly: true })
const srOnly = css({ srOnly: true })
</script>

<template>
  <ark.article class="slide-enter-content">
    <ark.header :class="header">
      <ark.h1 :class="pageTitle"> Ask me anything </ark.h1>
      <ark.p :class="lead">
        It's my birthday. Ask me anything. It's anonymous, I'll answer and share the ones I can.
      </ark.p>
    </ark.header>

    <ark.div :class="stage">
      <AmaCard v-if="status === 'sent'">
        <ark.div class="ama-row">
          <ark.span> Ask me anything </ark.span>
          <ark.span> Sent ✦ </ark.span>
        </ark.div>
        <ark.div :class="done">
          <ark.p :class="doneTitle"> Got it. Thank you! </ark.p>
          <ark.p :class="doneText"> Keep an eye out, I might answer this one. </ark.p>
        </ark.div>
        <ark.div class="ama-row">
          <ark.span> lope.adebesin.com/ama </ark.span>
          <ark.button type="button" class="ama-action" @click="again"> Ask another </ark.button>
        </ark.div>
      </AmaCard>

      <AmaCard v-else as="form" dim novalidate @submit.prevent="submit">
        <ark.div class="ama-row">
          <ark.span> Ask me anything </ark.span>
          <ark.span> Anonymous </ark.span>
        </ark.div>
        <ark.label for="ama-question" :class="srOnly"> Your question </ark.label>
        <textarea
          id="ama-question"
          v-model="question"
          :class="field"
          :maxlength="MAX_LEN"
          placeholder="What do you want to know?"
          :aria-invalid="status === 'empty' || undefined"
          aria-describedby="ama-feedback"
          @input="status === 'empty' && (status = 'idle')"
          @keydown.meta.enter="submit"
          @keydown.ctrl.enter="submit"
        />
        <ark.div :class="trap" aria-hidden="true">
          <ark.label for="ama-website"> Website </ark.label>
          <input id="ama-website" v-model="website" name="website" type="text" tabindex="-1" autocomplete="off" />
        </ark.div>
        <ark.div class="ama-row">
          <ark.span :class="[count, question.length >= MAX_LEN && over]">
            {{ question.length }} / {{ MAX_LEN }}
          </ark.span>
          <ark.button type="submit" class="ama-action" :disabled="status === 'sending'">
            {{ status === 'sending' ? 'Sending…' : 'Send' }} <ark.span aria-hidden="true">→</ark.span>
          </ark.button>
        </ark.div>
      </AmaCard>

      <ark.p :class="srOnly" role="status">{{ status === 'sent' ? 'Question sent. Thank you!' : '' }}</ark.p>
      <ark.p id="ama-feedback" :class="feedback" role="alert">
        <template v-if="status === 'empty'"> Write a question first. </template>
        <template v-else-if="status === 'error'"> That didn't go through. Try again? </template>
        <template v-else-if="status === 'limited'"> That's a lot of questions. Try again in a few minutes. </template>
      </ark.p>
    </ark.div>
  </ark.article>
</template>
