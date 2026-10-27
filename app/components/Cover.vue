<script setup lang="ts">
import { token } from 'styled-system/tokens'

const props = defineProps<{ series: string; part: number; total: number }>()

const LOGOS: Record<string, string> = { 'Panda internals': '/brands/panda.png' }

const pad = (n: number) => String(n).padStart(2, '0')
const u = (px: number) => `${(px / 12).toFixed(3)}cqw`
const mono = 'ui-monospace, SFMono-Regular, Menlo, monospace'
const yellow = token('colors.panda.yellow')
const faint = token('colors.lope.550')
const label = { fontFamily: mono, fontSize: u(22), letterSpacing: '0.2em', textTransform: 'uppercase' as const }
const logo = computed(() => LOGOS[props.series])
</script>

<template>
  <div :style="{ width: '100%', aspectRatio: '1200 / 630', containerType: 'inline-size' }" aria-hidden="true">
    <div
      :style="{
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        padding: `${u(72)} ${u(80)}`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: token('colors.lope.950'),
      }"
    >
      <div :style="{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }">
        <img v-if="logo" :src="logo" alt="" :style="{ width: u(88), height: u(88), borderRadius: u(18) }" />
        <span v-else />
        <span :style="{ ...label, color: yellow }">{{ series }}</span>
      </div>

      <div :style="{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }">
        <span
          :style="{
            fontSize: u(300),
            fontWeight: 600,
            lineHeight: 0.8,
            letterSpacing: '-0.05em',
            color: yellow,
            fontVariantNumeric: 'tabular-nums',
          }"
        >
          {{ pad(part) }}
        </span>
        <span :style="{ ...label, color: faint }">
          Part <span :style="{ color: token('colors.lope.50') }">{{ pad(part) }}</span> / {{ pad(total) }}
        </span>
      </div>
    </div>
  </div>
</template>
