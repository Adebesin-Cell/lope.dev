<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import { css } from 'styled-system/css'
import type { PlayItem } from '~~/shared/data/play'

const props = defineProps<{ item: PlayItem }>()

const video = ref<HTMLVideoElement>()
const hasVideo = ref(true)
const hasPoster = ref(true)
const playing = ref(false)

function enter() {
  const el = video.value
  if (!el || !hasVideo.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    return
  el.play().catch(() => {})
}

function leave() {
  const el = video.value
  playing.value = false
  if (!el)
    return
  el.pause()
  el.currentTime = 0
}

const tag = computed(() => (props.item.href ? 'a' : 'div'))
const isSoon = computed(() => !props.item.href)

const card = css({ display: 'block', rounded: 'xl', borderWidth: '1px', borderColor: 'ink/10', overflow: 'hidden', transition: 'colors', _hover: { borderColor: 'ink/25' } })
const media = css({ position: 'relative', aspectRatio: 'video', bg: 'ink/5', overflow: 'hidden' })
const fill = css({ position: 'absolute', inset: '0' })
const center = css({ position: 'absolute', inset: '0', display: 'grid', placeItems: 'center' })
const soonTitleWrap = css({ position: 'absolute', inset: '0', display: 'grid', placeItems: 'center', px: '4', textAlign: 'center', userSelect: 'none', pointerEvents: 'none' })
const soonTitle = css({ fontSize: { base: '4xl', sm: '5xl' }, fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: 'tight', lineHeight: 'none', opacity: '0.06' })
const soonBadge = css({ position: 'absolute', bottom: '3', insetStart: '3', display: 'inline-flex', alignItems: 'center', gap: '1.5', fontSize: '2xs', textTransform: 'uppercase', letterSpacing: 'wider', color: 'ink.muted' })
const dot = css({ h: '1.5', w: '1.5', rounded: 'full', bg: 'currentColor' })
const fallbackIcon = css({ fontSize: '2xl', color: 'ink.faint' })
const cover = css({ position: 'absolute', inset: '0', w: 'full', h: 'full', objectFit: 'cover' })
const videoEl = css({ position: 'absolute', inset: '0', w: 'full', h: 'full', objectFit: 'cover', transitionProperty: 'opacity', transitionDuration: 'slow' })
const body = css({ p: '4' })
const titleRow = css({ display: 'flex', alignItems: 'center', gap: '1.5' })
const title = css({ fontSize: 'sm', fontWeight: 'medium', color: 'ink' })
const arrow = css({ color: 'ink.faint', transition: 'transform', _groupHover: { transform: 'translate(0.125rem, -0.125rem)' } })
const blurb = css({ mt: '1', fontSize: 'xs', color: 'ink.muted', lineHeight: 'relaxed' })
const tags = css({ mt: '3', display: 'flex', flexWrap: 'wrap', gap: '1.5' })
const tagStyle = css({ rounded: 'full', bg: 'ink/5', px: '2', py: '0.5', fontSize: '3xs', color: 'ink.muted' })
</script>

<template>
  <component
    :is="ark[tag]"
    v-bind="item.href ? { href: item.href, target: '_blank', rel: 'noopener' } : {}"
    :class="['play-card group', card]"
    :style="{ cursor: item.href ? 'pointer' : 'default' }"
    @mouseenter="enter"
    @mouseleave="leave"
    @focusin="enter"
    @focusout="leave"
  >
    <ark.div :class="media">
      <template v-if="isSoon">
        <ark.span :class="soonTitleWrap">
          <ark.span :class="soonTitle">
            {{ item.title }}
          </ark.span>
        </ark.span>
        <ark.span :class="['play-shimmer', fill]" :style="{ pointerEvents: 'none' }" aria-hidden="true" />
        <ark.span :class="soonBadge">
          <ark.span :class="['play-dot', dot]" aria-hidden="true" />
          Coming soon
        </ark.span>
      </template>

      <template v-else>
        <ark.span v-if="!hasPoster" :class="center">
          <ark.span :class="['i-lucide-gamepad-2', fallbackIcon]" aria-hidden="true" />
        </ark.span>
        <img
          v-show="hasPoster"
          :src="item.poster"
          :alt="item.title"
          loading="lazy"
          :class="cover"
          @error="hasPoster = false"
        >
        <video
          v-if="hasVideo"
          ref="video"
          :src="item.video"
          :poster="item.poster"
          muted
          loop
          playsinline
          preload="none"
          :class="videoEl"
          :style="{ opacity: playing ? 1 : 0 }"
          @playing="playing = true"
          @error="hasVideo = false"
        />
      </template>
    </ark.div>

    <ark.div :class="body">
      <ark.div :class="titleRow">
        <ark.h3 :class="title">
          {{ item.title }}
        </ark.h3>
        <ark.span
          v-if="item.href"
          :class="['i-lucide-arrow-up-right', arrow]"
          aria-hidden="true"
        />
      </ark.div>
      <ark.p :class="blurb">
        {{ item.blurb }}
      </ark.p>
      <ark.div :class="tags">
        <ark.span
          v-for="t in item.tags"
          :key="t"
          :class="tagStyle"
        >
          {{ t }}
        </ark.span>
      </ark.div>
    </ark.div>
  </component>
</template>

<style scoped>
.play-shimmer {
  background: linear-gradient(105deg, transparent 42%, rgb(255 255 255 / 5%) 50%, transparent 58%);
  background-size: 220% 100%;
  animation: play-shimmer 4s linear infinite;
}
.play-dot {
  animation: play-pulse 1.8s ease-in-out infinite;
}
@keyframes play-shimmer {
  to { background-position: -220% 0; }
}
@keyframes play-pulse {
  0%, 100% { opacity: 0.25; }
  50% { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .play-shimmer, .play-dot { animation: none; }
}
</style>
