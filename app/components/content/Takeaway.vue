<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import { css } from 'styled-system/css'

const props = defineProps<{
  title?: string
}>()

const box = css({
  my: '10',
  px: { base: '4', md: '6' },
  py: '5',
  borderWidth: '1px',
  borderColor: 'ink/10',
  rounded: 'xl',
  bg: 'ink/5',
  '& > :first-child': { mt: '0' },
  '& > :last-child': { mb: '0' },
})

const label = css({
  display: 'flex',
  alignItems: 'center',
  gap: '2',
  mb: '4',
  fontSize: 'xs',
  fontWeight: 'semibold',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'ink.muted',
})
</script>

<template>
  <ark.aside :class="box" :aria-label="props.title ?? 'Takeaway'">
    <ark.p :class="label">
      <ark.span class="i-lucide-package" aria-hidden="true" />
      {{ props.title ?? 'Takeaway' }}
    </ark.p>
    <slot />
  </ark.aside>
</template>
