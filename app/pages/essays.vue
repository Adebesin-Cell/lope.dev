<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import { substackPosts, substackUrl } from '~/data/substack-posts'

usePageSeo({
  title: 'Essays — Adebesin Tolulope',
  description: 'I write to figure out what I actually mean. Usually it costs more than I thought. Personal essays on Substack.',
})

function fmt(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
</script>

<template>
  <ark.article class="slide-enter-content">
    <ark.h1 class="text-4xl font-700 tracking-tight mb-3">
      Essays
    </ark.h1>
    <ark.p class="text-ink-muted mb-10 max-w-prose">
      I write to figure out what I actually mean. Usually it costs more than I thought. It lives on
      <ark.a
        :href="substackUrl"
        target="_blank"
        rel="noopener"
        class="underline hover:text-ink transition-colors"
      >
        Substack
      </ark.a>.
    </ark.p>

    <ark.ul class="space-y-4 md:space-y-2">
      <ark.li v-for="post in substackPosts" :key="post.url">
        <ark.a
          :href="post.url"
          target="_blank"
          rel="noopener"
          class="flex flex-col md:flex-row md:items-baseline gap-0.5 md:gap-3 py-1 op-90 hover:op-100 transition-opacity"
        >
          <ark.span class="flex items-baseline gap-1.5">
            <ark.span class="text-base leading-snug">{{ post.title }}</ark.span>
            <ark.span class="i-lucide-arrow-up-right text-xs text-ink-faint self-center" aria-hidden="true" />
          </ark.span>
          <ark.span class="text-sm text-ink-muted whitespace-nowrap">{{ fmt(post.date) }}</ark.span>
        </ark.a>
      </ark.li>
    </ark.ul>
  </ark.article>
</template>
