<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import { css } from 'styled-system/css'

const year = new Date().getFullYear()

const footer = css({
  position: 'relative',
  mx: 'auto',
  maxW: '3xl',
  px: '6',
  pb: '12',
  fontSize: 'xs',
  color: 'ink.faint',
})
const link = css({ textDecoration: 'underline', transition: 'colors', _hover: { color: 'ink.muted' } })
</script>

<template>
  <ark.footer :class="footer">
    © {{ year }} Adebesin Tolulope ·
    <ark.a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="noopener" :class="link">
      CC BY-NC-SA 4.0
    </ark.a>
    · Inspired by
    <ark.a href="https://antfu.me" target="_blank" rel="noopener" :class="link"> antfu </ark.a>
  </ark.footer>
</template>
