<script setup lang="ts">
import { Collapsible } from '@ark-ui/vue/collapsible'
import { css } from 'styled-system/css'

const props = defineProps<{
  title: string
}>()

const box = css({
  my: '10',
  borderWidth: '[1px]',
  borderColor: 'ink/10',
  rounded: 'xl',
  bg: 'ink/5',
})

const trigger = css({
  display: 'flex',
  alignItems: 'center',
  gap: '2',
  width: 'full',
  px: { base: '4', md: '6' },
  py: '4',
  fontSize: 'sm',
  fontWeight: 'medium',
  textAlign: 'start',
  color: 'ink.muted',
  cursor: 'pointer',
  rounded: 'xl',
  transition: '[color 0.15s]',
  _hover: { color: 'ink' },
  _focusVisible: { outline: '[2px solid]', outlineColor: 'ink', outlineOffset: '[2px]' },
})

const indicator = css({
  display: 'inline-flex',
  transition: '[transform 0.2s ease]',
  _open: { transform: '[rotate(90deg)]' },
  _motionReduce: { transition: '[none]' },
})

const content = css({
  px: { base: '4', md: '6' },
  pb: '5',
  '& > :first-child': { mt: '0' },
  '& > :last-child': { mb: '0' },
})
</script>

<template>
  <Collapsible.Root :class="box">
    <Collapsible.Trigger :class="trigger">
      <Collapsible.Indicator :class="indicator">
        <span class="i-lucide-chevron-right" aria-hidden="true" />
      </Collapsible.Indicator>
      {{ props.title }}
    </Collapsible.Trigger>
    <Collapsible.Content :class="content">
      <slot />
    </Collapsible.Content>
  </Collapsible.Root>
</template>
