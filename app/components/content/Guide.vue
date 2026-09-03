<script setup lang="ts">
const props = defineProps<{
  title: string
  time?: string
  team?: string
}>()

const meta = computed(() => [props.time, props.team].filter(Boolean).join(' · '))
</script>

<template>
  <section class="guide">
    <header class="guide-head">
      <h3 class="guide-title">{{ props.title }}</h3>
      <p v-if="meta" class="guide-meta">{{ meta }}</p>
    </header>
    <ol class="guide-steps">
      <slot />
    </ol>
  </section>
</template>
