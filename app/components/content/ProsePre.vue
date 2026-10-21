<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'

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
</script>

<template>
  <ark.div class="group relative">
    <pre :class="props.class"><slot /></pre>
    <ark.button
      v-if="props.code"
      type="button"
      :aria-label="copied ? 'Copied' : 'Copy code'"
      class="absolute right-2 top-2 inline-flex items-center rounded-md p-1.5 text-ink-muted opacity-60 transition hover:text-ink hover:opacity-100 focus-visible:opacity-100 group-hover:opacity-100"
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
</style>
