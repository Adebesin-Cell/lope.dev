<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'

const route = useRoute()
const { siteUrl } = useRuntimeConfig().public

const { data: post } = await useAsyncData(`blog-${route.path}`, () =>
  queryCollection('blog').path(route.path).first(),
)

if (!post.value)
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })

// Per-post OG image generated from the title (public/og/<slug>.png).
const slug = route.path.split('/').filter(Boolean).pop()
const ogImage = `${siteUrl}/og/${slug}.png`

useHead(() => ({
  title: post.value?.title ? `${post.value.title} — Lope` : 'Blog — Lope',
  meta: [
    { name: 'description', content: post.value?.description ?? '' },
    { property: 'og:type', content: 'article' },
    { property: 'og:title', content: post.value?.title ?? '' },
    { property: 'og:description', content: post.value?.description ?? '' },
    { key: 'og:image', property: 'og:image', content: ogImage },
    { key: 'twitter:image', name: 'twitter:image', content: ogImage },
  ],
  // Canonical → original source (Medium) so the self-hosted copy isn't
  // treated as duplicate content.
  link: post.value?.canonical
    ? [{ rel: 'canonical', href: post.value.canonical }]
    : [],
}))

function fmt(d?: string) {
  if (!d)
    return ''
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
</script>

<template>
  <ark.article v-if="post" class="prose-article">
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
        <ark.span v-if="post.readingTime"> · {{ post.readingTime }}</ark.span>
        <ark.a
          v-if="post.canonical"
          :href="post.canonical"
          target="_blank"
          rel="noopener"
          class="text-ink-faint underline underline-offset-3 hover:text-ink-muted"
        >
          · originally on Medium
        </ark.a>
      </ark.p>
    </ark.header>

    <ContentRenderer :value="post" class="prose-content" />

    <ark.footer
      v-if="post.canonical"
      class="mt-14 pt-6 border-t border-white/10 text-sm text-ink-muted"
    >
      Have thoughts on this piece?
      <ark.a
        :href="post.canonical"
        target="_blank"
        rel="noopener"
        class="text-ink underline underline-offset-3 hover:text-ink-muted"
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
  color: rgba(255, 255, 255, 0.7);
}
.prose-content :deep(blockquote) {
  border-left: 2px solid rgba(255, 255, 255, 0.15);
  padding-left: 1rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.5);
}
.prose-content :deep(a) {
  text-decoration: underline;
  text-underline-offset: 3px;
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
  background: rgba(255, 255, 255, 0.06);
  padding: 0.1em 0.35em;
  border-radius: 4px;
}
.prose-content :deep(pre) {
  margin-block: 1.25rem;
  padding: 1rem 1.1rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
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
  padding-left: 1.4rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.7);
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
