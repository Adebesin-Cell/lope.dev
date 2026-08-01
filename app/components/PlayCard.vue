<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
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
</script>

<template>
  <component
    :is="ark[tag]"
    v-bind="item.href ? { href: item.href, target: '_blank', rel: 'noopener' } : {}"
    class="play-card group block rounded-xl border border-ink/10 overflow-hidden transition-colors hover:border-ink/25"
    :class="item.href ? 'cursor-pointer' : 'cursor-default'"
    @mouseenter="enter"
    @mouseleave="leave"
    @focusin="enter"
    @focusout="leave"
  >
    <ark.div class="relative aspect-video bg-ink/5 overflow-hidden">
      <template v-if="isSoon">
        <ark.span class="absolute inset-0 grid place-items-center px-4 text-center select-none pointer-events-none">
          <ark.span class="text-4xl sm:text-5xl font-700 uppercase tracking-tight leading-none op-6">
            {{ item.title }}
          </ark.span>
        </ark.span>
        <ark.span class="play-shimmer absolute inset-0 pointer-events-none" aria-hidden="true" />
        <ark.span class="absolute bottom-3 start-3 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-ink-muted">
          <ark.span class="play-dot h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
          Coming soon
        </ark.span>
      </template>

      <template v-else>
        <ark.span v-if="!hasPoster" class="absolute inset-0 grid place-items-center">
          <ark.span class="i-lucide-gamepad-2 text-2xl text-ink-faint" aria-hidden="true" />
        </ark.span>
        <img
          v-show="hasPoster"
          :src="item.poster"
          :alt="item.title"
          loading="lazy"
          class="absolute inset-0 w-full h-full object-cover"
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
          class="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
          :class="playing ? 'opacity-100' : 'opacity-0'"
          @playing="playing = true"
          @error="hasVideo = false"
        />
      </template>
    </ark.div>

    <ark.div class="p-4">
      <ark.div class="flex items-center gap-1.5">
        <ark.h3 class="text-sm font-500 text-ink">
          {{ item.title }}
        </ark.h3>
        <ark.span
          v-if="item.href"
          class="i-lucide-arrow-up-right text-ink-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          aria-hidden="true"
        />
      </ark.div>
      <ark.p class="mt-1 text-xs text-ink-muted leading-relaxed">
        {{ item.blurb }}
      </ark.p>
      <ark.div class="mt-3 flex flex-wrap gap-1.5">
        <ark.span
          v-for="t in item.tags"
          :key="t"
          class="rounded-full bg-ink/5 px-2 py-0.5 text-[10px] text-ink-muted"
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
