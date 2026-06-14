<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'

const route = useRoute()
const { url } = useSiteConfig()
const host = url.replace(/^https?:\/\//, '').replace(/\/$/, '')

const { data: post } = await useAsyncData(`blog-${route.path}`, () =>
  queryCollection('blog').path(route.path).first(),
)

if (!post.value)
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })

useHead(() => ({
  title: post.value?.title ? `${post.value.title} — Lope` : 'Blog — Lope',
  meta: [
    { name: 'description', content: post.value?.description ?? '' },
    { property: 'og:type', content: 'article' },
    { property: 'og:title', content: post.value?.title ?? '' },
    { property: 'og:description', content: post.value?.description ?? '' },
  ],
  // Canonical → original source (Medium) so the self-hosted copy isn't
  // treated as duplicate content.
  link: post.value?.canonical
    ? [{ rel: 'canonical', href: post.value.canonical }]
    : [],
}))

// Per-post OG image (nuxt-og-image, Takumi) — dynamic from the title.
defineOgImage('BlogPost.takumi', { title: post.value?.title, host })

const postUrl = computed(() => `https://${host}${route.path}`)
const shareTitle = computed(() => post.value?.title ?? '')
const shareXUrl = computed(() =>
  `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle.value)}&url=${encodeURIComponent(postUrl.value)}`,
)
const shareBlueskyUrl = computed(() =>
  `https://bsky.app/intent/compose?text=${encodeURIComponent(`${shareTitle.value} ${postUrl.value}`)}`,
)

function fmt(d?: string) {
  if (!d)
    return ''
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
</script>

<template>
  <ark.article v-if="post" class="prose-article slide-enter-content">
    <NuxtLink
      to="/blog"
      class="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink transition-colors mb-8"
    >
      <ark.span class="i-lucide-arrow-left" />
      Back to blog
    </NuxtLink>

    <ark.header class="mb-10">
      <ark.h1 class="text-4xl font-700 tracking-tight mb-3">
        {{ post.title }}
      </ark.h1>
      <ark.p class="text-sm text-ink-muted">
        {{ fmt(post.date) }}
        <ark.span v-if="post.duration"> · {{ post.duration }}</ark.span>
        <ark.span v-else-if="post.readingTime"> · {{ post.readingTime }}</ark.span>
        <template v-if="post.place">
          <ark.span class="text-ink-faint"> · at </ark.span>
          <ark.a
            v-if="post.placeLink"
            :href="post.placeLink"
            target="_blank"
            rel="noopener"
            class="underline hover:text-ink"
          >
            {{ post.place }}
          </ark.a>
          <ark.span v-else>{{ post.place }}</ark.span>
        </template>
        <ark.a
          v-if="post.canonical"
          :href="post.canonical"
          target="_blank"
          rel="noopener"
          class="text-ink-faint underline hover:text-ink-muted"
        >
          · originally on Medium
        </ark.a>
      </ark.p>
    </ark.header>

    <ContentRenderer :value="post" class="prose-content" />

    <ark.div class="mt-14 pt-6 border-t border-ink/10 flex items-center gap-4 text-sm text-ink-muted">
      <ark.span>Share</ark.span>
      <ark.a
        :href="shareXUrl"
        target="_blank"
        rel="noopener"
        aria-label="Share on X"
        class="inline-flex items-center hover:text-ink transition-colors"
      >
        <ark.span class="i-simple-icons-x" aria-hidden="true" />
      </ark.a>
      <ark.a
        :href="shareBlueskyUrl"
        target="_blank"
        rel="noopener"
        aria-label="Share on Bluesky"
        class="inline-flex items-center hover:text-ink transition-colors"
      >
        <ark.span class="i-simple-icons-bluesky" aria-hidden="true" />
      </ark.a>
    </ark.div>

    <ark.footer
      v-if="post.canonical"
      class="mt-8 text-sm text-ink-muted"
    >
      Have thoughts on this piece?
      <ark.a
        :href="post.canonical"
        target="_blank"
        rel="noopener"
        class="text-ink underline hover:text-ink-muted"
      >
        Join the conversation on Medium →
      </ark.a>
    </ark.footer>
  </ark.article>
</template>

<style scoped>
.prose-content :deep(h2) {
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 2.5rem;
  margin-bottom: 0.75rem;
}
.prose-content :deep(h3) {
  font-size: 1.15rem;
  font-weight: 600;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
}
.prose-content :deep(p) {
  margin-block: 1rem;
  line-height: 1.7;
  color: rgb(var(--ink) / 0.78);
}
.prose-content :deep(blockquote) {
  border-inline-start: 2px solid rgb(var(--ink) / 0.18);
  padding-inline-start: 1rem;
  font-style: italic;
  color: rgb(var(--ink) / 0.55);
}
.prose-content :deep(a) {
  text-decoration: underline;
  text-underline-offset: 4px;
}
/* Nuxt Content wraps heading text in a self-anchor — don't underline those. */
.prose-content :deep(h1 a),
.prose-content :deep(h2 a),
.prose-content :deep(h3 a),
.prose-content :deep(h4 a) {
  text-decoration: none;
  color: inherit;
}
.prose-content :deep(code) {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.9em;
  background: rgb(var(--ink) / 0.08);
  padding: 0.1em 0.35em;
  border-radius: 4px;
}
.prose-content :deep(pre) {
  margin-block: 1.25rem;
  padding: 1rem 1.1rem;
  border-radius: 8px;
  background: rgb(var(--ink) / 0.05);
  border: 1px solid rgb(var(--ink) / 0.10);
  overflow-x: auto;
  font-size: 0.85rem;
  line-height: 1.6;
}
.prose-content :deep(pre code) {
  background: none;
  padding: 0;
  font-size: inherit;
}
.prose-content :deep(ul),
.prose-content :deep(ol) {
  margin-block: 1rem;
  padding-inline-start: 1.4rem;
  line-height: 1.7;
  color: rgb(var(--ink) / 0.78);
}
.prose-content :deep(ul) { list-style: disc; }
.prose-content :deep(ol) { list-style: decimal; }
.prose-content :deep(li) { margin-block: 0.35rem; }
.prose-content :deep(img) {
  margin-block: 1.5rem;
  border-radius: 8px;
  max-width: 100%;
}
.prose-content :deep(h1) {
  font-size: 1.8rem;
  font-weight: 700;
  margin-top: 2.5rem;
  margin-bottom: 0.75rem;
}
</style>
