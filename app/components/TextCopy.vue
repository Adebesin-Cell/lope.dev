<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'

const props = defineProps<{ text: string }>()

const { copy, copied } = useClipboard()
</script>

<template>
  <ark.span class="inline-flex items-baseline gap-2">
    <slot />
    <ark.button
      type="button"
      :aria-label="copied ? 'Copied' : 'Copy'"
      class="self-center op-40 hover:op-100 transition-opacity"
      @click="copy(props.text)"
    >
      <ark.span :class="copied ? 'i-lucide-check text-green-400' : 'i-lucide-copy'" class="block w-3.5 h-3.5" aria-hidden="true" />
    </ark.button>
  </ark.span>
</template>
