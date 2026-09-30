<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'

usePageSeo({
  title: 'Academia — Adebesin Tolulope',
  description: 'Research and academic work by Adebesin Tolulope (Lope) — Computer Engineering projects, evaluations and write-ups.',
})

const work = [
  {
    to: '/academia/ekphrasis',
    title: 'Ekphrasis',
    subtitle: 'Context-aware image descriptions for blind and low-vision web users',
    meta: 'B.Eng Computer Engineering · Federal University of Technology, Akure · 2026',
    blurb: 'A Chrome extension that writes image descriptions grounded in the text around the image, then checks its own claims against the image before anything is announced. Six metrics pre-registered, four passed, two missed. Both misses are published.',
  },
]
</script>

<template>
  <ark.article class="slide-enter-content">
    <ark.header class="mb-12">
      <ark.h1 class="text-4xl font-700 tracking-tight mb-3">
        Academia
      </ark.h1>
      <ark.p class="text-ink-muted max-w-prose leading-relaxed">
        Research, and the academic work around it. Projects that were measured rather than shipped,
        with the evaluation written down before the data existed. This is where those live, misses
        and all.
      </ark.p>
    </ark.header>

    <ark.ul class="space-y-4">
      <ark.li v-for="item in work" :key="item.to">
        <NuxtLink
          :to="item.to"
          class="group block rounded-lg border border-ink/10 p-5 transition-colors hover:border-ink/25 hover:bg-ink/2"
        >
          <ark.div class="flex items-baseline gap-2">
            <ark.h2 class="text-lg font-600">
              {{ item.title }}
            </ark.h2>
            <ark.span
              class="i-lucide-arrow-up-right text-sm text-ink-faint transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </ark.div>
          <ark.p class="mt-1 text-sm text-ink-muted">
            {{ item.subtitle }}
          </ark.p>
          <ark.p class="mt-3 text-xs uppercase tracking-wider text-ink-faint">
            {{ item.meta }}
          </ark.p>
          <ark.p class="mt-3 text-sm text-ink-muted leading-relaxed">
            {{ item.blurb }}
          </ark.p>
        </NuxtLink>
      </ark.li>
    </ark.ul>
  </ark.article>
</template>
