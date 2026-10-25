<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import { css } from 'styled-system/css'

const props = defineProps<{ text: string }>()

const { copy, copied } = useClipboard()

const wrap = css({ display: 'inline-flex', alignItems: 'baseline', gap: '2' })
const button = css({ alignSelf: 'center', opacity: '0.4', transition: 'opacity', _hover: { opacity: '1' } })
const icon = css({ display: 'block!', w: '3.5!', h: '3.5!' })
const done = css({ color: 'green.400' })
</script>

<template>
  <ark.span :class="wrap">
    <slot />
    <ark.button
      type="button"
      :aria-label="copied ? 'Copied' : 'Copy'"
      :class="button"
      @click="copy(props.text)"
    >
      <ark.span :class="[copied ? 'i-lucide-check' : 'i-lucide-copy', icon, copied && done]" aria-hidden="true" />
    </ark.button>
  </ark.span>
</template>
