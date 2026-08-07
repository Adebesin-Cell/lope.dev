<script setup lang="ts">
import type { CardFormat } from '~/composables/useHighlightCard'
import { ark } from '@ark-ui/vue/factory'
import caveat from 'tegaki/fonts/caveat'
import { DIMENSIONS, PLUM_SEED, plumSegments } from '~/composables/useHighlightCard'

const props = defineProps<{
  quote: string
  title?: string
  url?: string
  year?: string
  format: CardFormat
}>()

const branches = computed(() => {
  const [w, h] = DIMENSIONS[props.format]
  const d = plumSegments(w, h, PLUM_SEED)
    .map(([x1, y1, x2, y2]) => `M${x1.toFixed(1)},${y1.toFixed(1)}L${x2.toFixed(1)},${y2.toFixed(1)}`)
    .join('')
  return { w, h, d }
})
const paras = computed(() => props.quote.split('\n').map(s => s.trim()).filter(Boolean))
const cleanUrl = computed(() => props.url?.replace(/^https?:\/\//, '') ?? '')

const quoteStyle = computed(() => {
  const cqw = Math.min(5.2, Math.max(2.4, 5.4 - props.quote.length * 0.006))
  return { fontSize: `${cqw.toFixed(2)}cqw` }
})
</script>

<template>
  <ark.figure
    class="share-card"
    :class="format === 'ig' ? 'w-[clamp(320px,72vw,560px)]' : 'w-[clamp(360px,86vw,860px)]'"
  >
    <ark.div class="dots" aria-hidden="true" />
    <ark.span v-if="year" class="watermark" aria-hidden="true">{{ year }}</ark.span>

    <ark.svg
      class="branches"
      :viewBox="`0 0 ${branches.w} ${branches.h}`"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <ark.path :d="branches.d" fill="none" stroke="rgba(210,210,215,0.16)" stroke-width="1" stroke-linecap="round" />
    </ark.svg>

    <ark.header class="head">
      <ark.div class="who">
        <ark.img src="/lope-avatar.jpeg" alt="" class="avatar" />
        <ark.span class="name">Adebesin Tolulope</ark.span>
        <ark.span class="alias">(Lope)</ark.span>
      </ark.div>
      <ClientOnly>
        <TegakiRenderer :font="caveat" text="at" :time="{ mode: 'uncontrolled', loop: true, speed: 0.6 }" class="stamp" />
        <template #fallback>
          <ark.span class="stamp">at</ark.span>
        </template>
      </ClientOnly>
    </ark.header>

    <ark.div class="body">
      <ark.span class="mark" aria-hidden="true">“</ark.span>
      <ark.blockquote class="quote" :style="quoteStyle">
        <ark.p v-for="(p, i) in paras" :key="i">{{ p }}</ark.p>
      </ark.blockquote>
    </ark.div>

    <ark.footer class="foot">
      <ark.div class="sign-col">
        <ClientOnly>
          <TegakiRenderer :font="caveat" text="— Lope" :time="{ mode: 'uncontrolled', loop: false, speed: 0.9 }" class="sign" />
          <template #fallback>
            <ark.span class="sign">— Lope</ark.span>
          </template>
        </ClientOnly>
        <ark.span v-if="url" class="link">{{ cleanUrl }}</ark.span>
      </ark.div>
      <ark.span v-if="title" class="source">
        <ark.span class="i-lucide-newspaper source-icon" aria-hidden="true" />
        <ark.span class="source-title">{{ title }}</ark.span>
      </ark.span>
    </ark.footer>
  </ark.figure>
</template>

<style scoped>
.share-card {
  container-type: inline-size;
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 76vh;
  overflow: hidden;
  margin: 0;
  padding: 6cqw 7cqw;
  border-radius: 14px;
  background: #0a0a0a;
  border: 1px solid rgba(244, 244, 245, 0.08);
  color: #f4f4f5;
}

.dots {
  position: absolute;
  inset: 0;
  z-index: 0;
  background-image: radial-gradient(circle, rgba(244, 244, 245, 0.05) 1px, transparent 1px);
  background-size: 20px 20px;
  pointer-events: none;
}
.watermark {
  position: absolute;
  right: -1.5cqw;
  bottom: -6cqw;
  z-index: 0;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 36cqw;
  letter-spacing: -0.04em;
  line-height: 0.8;
  color: rgba(244, 244, 245, 0.05);
  pointer-events: none;
  user-select: none;
}
.branches {
  position: absolute;
  inset: 0;
  z-index: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.head {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2cqw;
}
.who {
  display: flex;
  align-items: center;
  gap: 1.6cqw;
}
.avatar {
  width: 3.6cqw;
  height: 3.6cqw;
  min-width: 28px;
  min-height: 28px;
  border-radius: 8px;
  object-fit: cover;
}
.name {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 1.7cqw;
  white-space: nowrap;
}
.alias {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 1.7cqw;
  color: rgba(161, 161, 170, 0.9);
}
.stamp {
  font-family: 'Caveat', cursive;
  font-weight: 700;
  font-size: 3.4cqw;
  line-height: 1;
  color: rgba(161, 161, 170, 0.9);
}

.body {
  position: relative;
  z-index: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}
.mark {
  font-family: 'Newsreader', serif;
  font-size: 8cqw;
  line-height: 0.7;
  color: rgba(244, 244, 245, 0.22);
  margin-top: 2cqw;
}
.quote {
  margin: 1cqw 0 0;
  font-family: 'Newsreader', serif;
  font-weight: 500;
  line-height: 1.42;
  overflow: hidden;
}
.quote p { margin: 0 0 0.55em; }
.quote p:last-child { margin-bottom: 0; }

.foot {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 2cqw;
  margin-top: 5cqw;
}
.sign-col {
  display: flex;
  flex-direction: column;
  gap: 0.8cqw;
}
.sign {
  font-family: 'Caveat', cursive;
  font-weight: 600;
  font-size: 3.2cqw;
  line-height: 1;
  color: #f4f4f5;
}
.link {
  font-family: 'JetBrains Mono', monospace;
  font-size: 1cqw;
  color: #71717a;
}
.source {
  display: inline-flex;
  align-items: center;
  gap: 1cqw;
  max-width: 50cqw;
  padding: 1cqw 1.6cqw;
  border-radius: 8px;
  background: rgba(244, 244, 245, 0.05);
  border: 1px solid rgba(244, 244, 245, 0.1);
}
.source-icon {
  flex-shrink: 0;
  width: 1.6cqw;
  height: 1.6cqw;
  color: rgba(161, 161, 170, 0.9);
}
.source-title {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 1.5cqw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
