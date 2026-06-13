<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'

const year = new Date().getFullYear()
</script>

<template>
  <ark.footer class="relative mx-auto max-w-3xl px-6 pb-12 text-xs text-ink-faint">
    <ark.div>
      <ark.a
        href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
        target="_blank"
        rel="noopener"
        class="underline hover:text-ink-muted transition-colors"
      >
        CC BY-NC-SA 4.0
      </ark.a>
      2026-PRESENT © Adebesin Tolulope (Lope)
      <ark.span class="op-50">· {{ year }}</ark.span>
    </ark.div>
    <ark.div class="mt-1">
      Design inspired by
      <ark.a
        href="https://antfu.me"
        target="_blank"
        rel="noopener"
        class="underline hover:text-ink-muted transition-colors"
      >
        antfu
      </ark.a>
    </ark.div>
  </ark.footer>
</template>
