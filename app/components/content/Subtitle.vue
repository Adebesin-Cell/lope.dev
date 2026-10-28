<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import { css } from 'styled-system/css'

const subtitle = css({ mt: '8', mb: '2', fontSize: '[1.25em]', fontWeight: 'semibold', lineHeight: '[1.6]', color: 'ink' })
</script>

<template>
  <ark.p :class="subtitle"><slot mdc-unwrap="p" /></ark.p>
</template>
