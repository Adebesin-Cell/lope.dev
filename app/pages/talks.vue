<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import { givenTalks, talks } from '~~/shared/data/talks'

usePageSeo({
  title: 'Talks — Adebesin Tolulope',
  description: 'Talks by Adebesin Tolulope (Lope) on Panda CSS, design systems and open source, with recordings and slides.',
})

function fmt(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
</script>

<template>
  <ark.article class="slide-enter-content">
    <ark.header class="mb-10">
      <ark.h1 class="text-4xl font-700 tracking-tight mb-4">
        Talks
      </ark.h1>
      <NuxtLink to="/giving-talks" class="inline-flex items-center gap-1.5 text-ink-muted hover:text-ink transition-colors underline decoration-ink/30 underline-offset-4">
        <ark.span class="i-lucide-presentation" aria-hidden="true" />
        Speaker info
      </NuxtLink>
    </ark.header>

    <ark.ul class="divide-y divide-ink/10">
      <ark.li v-for="talk in givenTalks" :key="talk.title" class="py-8 first:pt-0">
        <ark.h2 class="text-2xl font-700 tracking-tight text-ink">
          {{ talk.title }}
        </ark.h2>
        <ark.p class="mt-2 text-ink-muted">
          {{ talk.subtitle }}
        </ark.p>
        <ark.div class="mt-5 flex flex-wrap items-end justify-between gap-4">
          <ark.div>
            <ark.a :href="talk.eventUrl" target="_blank" rel="noopener" class="text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink transition-colors">
              {{ talk.event }}
            </ark.a>
            <ark.p class="text-sm text-ink-faint mt-1">
              {{ fmt(talk.date) }} · {{ talk.location }}
            </ark.p>
          </ark.div>
          <ark.div class="flex items-center gap-4 text-sm text-ink-muted">
            <ark.a v-if="talk.watch" :href="talk.watch" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 hover:text-ink transition-colors">
              <ark.span class="i-lucide-play" aria-hidden="true" />
              Watch
            </ark.a>
            <ark.a v-if="talk.pdf" :href="talk.pdf" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 hover:text-ink transition-colors">
              <ark.span class="i-lucide-download" aria-hidden="true" />
              PDF
            </ark.a>
          </ark.div>
        </ark.div>
      </ark.li>
    </ark.ul>

    <ark.section class="mt-16">
      <ark.h2 class="text-sm text-ink-muted mb-4">
        I'd love to talk about
      </ark.h2>
      <ark.ul class="space-y-3">
        <ark.li v-for="talk in talks" :key="talk.name">
          <ark.a :href="talk.href" target="_blank" rel="noopener" class="text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink transition-colors">{{ talk.name }}</ark.a>
          <ark.span class="text-ink-muted">: {{ talk.angle }}</ark.span>
        </ark.li>
      </ark.ul>
    </ark.section>
  </ark.article>
</template>
