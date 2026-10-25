<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import { css } from 'styled-system/css'

const shell = css({ position: 'relative', minH: 'screen' })
const skip = css({
  srOnly: true,
  _focus: {
    w: 'auto',
    h: 'auto',
    m: '0',
    overflow: 'visible',
    clip: 'auto',
    whiteSpace: 'normal',
    position: 'fixed',
    insetStart: '4',
    top: '4',
    zIndex: '100',
    rounded: 'md',
    bg: 'bg.soft',
    px: '4',
    py: '2',
    fontSize: 'sm',
    outline: '[2px solid]',
    outlineColor: 'ink/40',
  },
})
const main = css({
  position: 'relative',
  mx: 'auto',
  maxW: '3xl',
  px: '6',
  pt: { base: '10', md: '16' },
  pb: { base: '24', md: '32' },
})
</script>

<template>
  <ark.div :class="shell">
    <ark.a href="#main" :class="skip"> Skip to content </ark.a>
    <DotBackground />
    <ArtPlum />
    <AppHeader />
    <TocNav />
    <ark.main id="main" :class="main">
      <slot />
    </ark.main>
    <AppFooter />
    <ScrollToTop />
    <ImageZoom />
  </ark.div>
</template>
