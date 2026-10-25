<script setup lang="ts">
import { token } from 'styled-system/tokens'

// Per-post OG image (Takumi renderer) — the title is the hero.
const props = defineProps<{ title?: string; description?: string; series?: string; part?: number; host?: string }>()

const HOOK_MAX_LENGTH = 140

const kicker = computed(() =>
  props.series ? [props.series, props.part ? `Part ${props.part}` : ''].filter(Boolean).join(' · ') : '',
)

const hook = computed(() => {
  const text = props.description?.trim() ?? ''
  return text.length > HOOK_MAX_LENGTH ? `${text.slice(0, HOOK_MAX_LENGTH).replace(/\s+\S*$/, '')}…` : text
})
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
        src="/lope-avatar.jpeg"
        width="72"
        height="72"
        :style="{ width: '72px', height: '72px', borderRadius: '999px' }"
      />
      <span v-if="host" :style="{ fontSize: '26px', color: token('colors.lope.550') }">{{ host }}/blog</span>
    </div>

    <div :style="{ display: 'flex', flexDirection: 'column' }">
      <span
        v-if="kicker"
        :style="{
          fontSize: '22px',
          fontWeight: 600,
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: token('colors.lope.550'),
          marginBottom: '20px',
        }"
        >{{ kicker }}</span
      >
      <span :style="{ fontSize: '62px', fontWeight: 700, letterSpacing: '-1.5px', lineHeight: '1.12' }">{{
        title
      }}</span>
      <span
        v-if="hook"
        :style="{ fontSize: '30px', lineHeight: '1.4', color: token('colors.lope.400'), marginTop: '24px' }"
        >{{ hook }}</span
      >
    </div>

    <div :style="{ display: 'flex', alignItems: 'center' }">
      <span :style="{ fontSize: '30px', fontWeight: 500 }">Adebesin Tolulope</span>
      <span :style="{ fontSize: '30px', color: token('colors.lope.550'), marginLeft: '14px' }">· Blog</span>
    </div>
  </div>
</template>
