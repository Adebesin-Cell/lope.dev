<script setup lang="ts">
import { token } from 'styled-system/tokens'

// Rendered to the site-wide OG image by nuxt-og-image (Takumi renderer).
withDefaults(defineProps<{ title?: string; subtitle?: string; host?: string }>(), {
  title: 'Adebesin Tolulope',
  subtitle: 'Design engineer · open sourcer',
  host: '',
})

const tags = ['Chakra UI', 'Panda', 'Zag', 'Ark UI', 'IQ Industries', 'npmx']
</script>

<template>
  <div
    :style="{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '90px',
      backgroundColor: token('colors.lope.950'),
      color: token('colors.lope.50'),
    }"
  >
    <div :style="{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }">
      <img
        src="/lope-avatar-square.jpg"
        width="76"
        height="76"
        :style="{ width: '76px', height: '76px', borderRadius: '999px' }"
      />
      <span v-if="host" :style="{ fontSize: '26px', color: token('colors.lope.550') }">{{ host }}</span>
    </div>

    <div :style="{ display: 'flex', flexDirection: 'column' }">
      <span :style="{ fontSize: '84px', fontWeight: 700, letterSpacing: '-2px', lineHeight: '1' }">{{ title }}</span>
      <span :style="{ fontSize: '34px', color: token('colors.lope.400'), marginTop: '18px' }">{{ subtitle }}</span>
    </div>

    <div :style="{ display: 'flex' }">
      <span
        v-for="t in tags"
        :key="t"
        :style="{
          display: 'flex',
          padding: '10px 20px',
          marginRight: '14px',
          borderRadius: '999px',
          backgroundColor: 'rgba(255,255,255,0.06)',
          fontSize: '24px',
          color: token('colors.lope.300'),
        }"
        >{{ t }}</span
      >
    </div>
  </div>
</template>
