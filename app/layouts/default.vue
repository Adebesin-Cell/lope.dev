<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
</script>

<template>
  <ark.div class="relative min-h-screen">
    <DotBackground />
    <AppHeader />
    <ark.main class="relative mx-auto max-w-3xl px-6 py-24 md:py-32">
      <slot />
    </ark.main>
    <AppFooter />
  </ark.div>
</template>
