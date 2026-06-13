<script setup lang="ts">
// Per-post OG image (Takumi renderer) — the title is the hero.
defineProps<{ title?: string, host?: string }>()
</script>

<template>
  <div :style="{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '90px', backgroundColor: '#0a0a0a', color: '#fafafa' }">
    <div :style="{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }">
      <img src="https://github.com/Adebesin-Cell.png?size=160" :style="{ width: '72px', height: '72px', borderRadius: '999px' }">
      <span v-if="host" :style="{ fontSize: '26px', color: '#71717a' }">{{ host }}/blog</span>
    </div>

    <div :style="{ display: 'flex' }">
      <span :style="{ fontSize: '62px', fontWeight: 700, letterSpacing: '-1.5px', lineHeight: '1.12' }">{{ title }}</span>
    </div>

    <div :style="{ display: 'flex', alignItems: 'center' }">
      <span :style="{ fontSize: '30px', fontWeight: 500 }">Adebesin Tolulope</span>
      <span :style="{ fontSize: '30px', color: '#71717a', marginLeft: '14px' }">· Blog</span>
    </div>
  </div>
</template>
