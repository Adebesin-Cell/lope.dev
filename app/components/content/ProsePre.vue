<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import { css } from 'styled-system/css'

const props = defineProps<{
  code?: string
  language?: string | null
  filename?: string | null
  highlights?: number[]
  meta?: string | null
  class?: string | null
}>()

const copied = ref(false)

async function copy() {
  if (!props.code)
    return
  await navigator.clipboard.writeText(props.code)
  copied.value = true
  setTimeout(() => { copied.value = false }, 1500)
}

const wrap = css({ position: 'relative' })
const copyButton = css({ position: 'absolute', right: '2', top: '2', display: 'inline-flex', alignItems: 'center', rounded: 'md', p: '1.5', color: 'ink.muted', transition: 'all', _hover: { color: 'ink' } })
</script>

<template>
  <ark.div :class="['group', wrap]">
    <pre :class="props.class"><slot /></pre>
    <ark.button
      v-if="props.code"
      type="button"
      :aria-label="copied ? 'Copied' : 'Copy code'"
      :class="['copy-code', copyButton]"
      @click="copy"
    >
      <ark.span :class="copied ? 'i-lucide-check' : 'i-lucide-copy'" aria-hidden="true" />
    </ark.button>
  </ark.div>
</template>

<style>
pre code .line {
  display: block;
}

.copy-code {
  opacity: 0;
}

.group:hover .copy-code,
.copy-code:focus-visible {
  opacity: 1;
}

@media (hover: none) {
  .copy-code {
    opacity: 0.6;
  }
}
</style>
