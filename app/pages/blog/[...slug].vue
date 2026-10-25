<script setup lang="ts">
import { css } from 'styled-system/css'
import { prose } from 'styled-system/recipes'
import { ark } from '@ark-ui/vue/factory'

const route = useRoute()
const { url } = useSiteConfig()
const host = url.replace(/^https?:\/\//, '').replace(/\/$/, '')

const { data: post } = await useAsyncData(`blog-${route.path}`, () => queryCollection('blog').path(route.path).first())

if (!post.value) throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })

const postUrl = computed(() => `https://${host}${route.path}`)
const shareTitle = computed(() => post.value?.title ?? '')
const canonicalUrl = computed(() => post.value?.canonical || postUrl.value)
const readingTime = computed(() => readingTimeText(post.value?.body))

useSeoMeta({
  title: () =>
    post.value?.seoTitle ??
    (post.value?.title ? `${post.value.title} — Adebesin Tolulope` : 'Blog — Adebesin Tolulope'),
  robots: () => (post.value?.draft ? 'noindex, nofollow' : undefined),
  description: () => post.value?.description ?? '',
  ogType: 'article',
  ogTitle: () => post.value?.title ?? '',
  ogDescription: () => post.value?.description ?? '',
  ogUrl: () => postUrl.value,
  articlePublishedTime: () => post.value?.date ?? '',
  articleAuthor: ['Adebesin Tolulope'],
  twitterCard: 'summary_large_image',
  twitterTitle: () => post.value?.title ?? '',
  twitterDescription: () => post.value?.description ?? '',
  twitterCreator: '@I_am_Lope',
})

useHead(() => ({
  link: [{ rel: 'canonical', href: canonicalUrl.value }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.value?.seoTitle ?? post.value?.title,
        description: post.value?.description,
        url: postUrl.value,
        datePublished: post.value?.date,
        dateModified: post.value?.updated ?? post.value?.date,
        inLanguage: 'en',
        author: { '@type': 'Person', name: 'Adebesin Tolulope', alternateName: 'Lope', url: `https://${host}` },
        publisher: { '@type': 'Person', name: 'Adebesin Tolulope', url: `https://${host}` },
        mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl.value },
      }),
    },
  ],
}))

defineOgImage('BlogPost.takumi', {
  title: post.value?.title,
  description: post.value?.description,
  series: post.value?.series,
  part: post.value?.part,
  host,
})

const shareXUrl = computed(
  () =>
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle.value)}&url=${encodeURIComponent(postUrl.value)}`,
)
const shareBlueskyUrl = computed(
  () => `https://bsky.app/intent/compose?text=${encodeURIComponent(`${shareTitle.value} ${postUrl.value}`)}`,
)
const shareLinkedInUrl = computed(
  () => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl.value)}`,
)
const track = useTrack()
const copied = ref(false)
async function copyLink() {
  if (!import.meta.client) return
  await navigator.clipboard.writeText(postUrl.value)
  track('post_shared', { network: 'copy_link' })
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 1500)
}

function fmt(d?: string) {
  if (!d) return ''
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const back = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '1.5',
  fontSize: 'sm',
  color: 'ink.muted',
  transition: 'colors',
  mb: '8',
  _hover: { color: 'ink' },
})
const header = css({ mb: '10' })
const title = css({ textStyle: 'display', mb: '3' })
const meta = css({ fontSize: 'sm', color: 'ink.muted' })
const faint = css({ color: 'ink.faint' })
const metaLink = css({ textDecoration: 'underline', _hover: { color: 'ink' } })
const mediumLink = css({ color: 'ink.faint', textDecoration: 'underline', _hover: { color: 'ink.muted' } })
const proseClass = prose()
const share = css({
  mt: '14',
  pt: '6',
  borderTopWidth: '1px',
  borderColor: 'ink/10',
  display: 'flex',
  alignItems: 'center',
  gap: '4',
  fontSize: 'sm',
  color: 'ink.muted',
})
const shareLink = css({ display: 'inline-flex', alignItems: 'center', transition: 'colors', _hover: { color: 'ink' } })
const footer = css({ mt: '8', fontSize: 'sm', color: 'ink.muted' })
const discuss = css({ color: 'ink', textDecoration: 'underline', _hover: { color: 'ink.muted' } })
const cdUp = css({ mt: '10', fontFamily: 'mono', fontSize: 'sm' })
const dim = css({ opacity: '0.5' })
const cdLink = css({ opacity: '0.5', transition: 'opacity', _hover: { opacity: '0.75' } })
</script>

<template>
  <ark.article v-if="post" :class="['prose-article slide-enter-content']">
    <NuxtLink to="/blog" :class="back">
      <ark.span class="i-lucide-arrow-left" />
      Back to blog
    </NuxtLink>

    <ark.header :class="header">
      <ark.h1 :class="title">
        {{ post.title }}
      </ark.h1>
      <ark.p :class="meta">
        {{ fmt(post.date) }}
        <ark.span v-if="post.duration"> · {{ post.duration }}</ark.span>
        <ark.span v-else-if="readingTime"> · {{ readingTime }}</ark.span>
        <template v-if="post.place">
          <ark.span :class="faint"> · at </ark.span>
          <ark.a v-if="post.placeLink" :href="post.placeLink" target="_blank" rel="noopener" :class="metaLink">
            {{ post.place }}
          </ark.a>
          <ark.span v-else>{{ post.place }}</ark.span>
        </template>
        <ark.a v-if="post.canonical" :href="post.canonical" target="_blank" rel="noopener" :class="mediumLink">
          · originally on Medium
        </ark.a>
      </ark.p>
    </ark.header>

    <ContentRenderer :value="post" :class="['prose-content', proseClass]" />

    <HighlightShare :title="shareTitle" :url="postUrl" :date="post.date" />

    <ark.div :class="share">
      <ark.span>Share</ark.span>
      <ark.a
        :href="shareXUrl"
        target="_blank"
        rel="noopener"
        aria-label="Share on X"
        @click="track('post_shared', { network: 'x' })"
        :class="shareLink"
      >
        <ark.span class="i-simple-icons-x" aria-hidden="true" />
      </ark.a>
      <ark.a
        :href="shareBlueskyUrl"
        target="_blank"
        rel="noopener"
        aria-label="Share on Bluesky"
        @click="track('post_shared', { network: 'bluesky' })"
        :class="shareLink"
      >
        <ark.span class="i-simple-icons-bluesky" aria-hidden="true" />
      </ark.a>
      <ark.a
        :href="shareLinkedInUrl"
        target="_blank"
        rel="noopener"
        aria-label="Share on LinkedIn"
        @click="track('post_shared', { network: 'linkedin' })"
        :class="shareLink"
      >
        <ark.span class="i-simple-icons-linkedin" aria-hidden="true" />
      </ark.a>
      <ark.button type="button" :aria-label="copied ? 'Link copied' : 'Copy link'" :class="shareLink" @click="copyLink">
        <ark.span :class="copied ? 'i-lucide-check' : 'i-lucide-link'" aria-hidden="true" />
      </ark.button>
    </ark.div>

    <ark.footer v-if="post.canonical" :class="footer">
      Have thoughts on this piece?
      <ark.a :href="post.canonical" target="_blank" rel="noopener" :class="discuss">
        Join the conversation on Medium →
      </ark.a>
    </ark.footer>

    <ark.p :class="cdUp">
      <ark.span :class="dim">&gt; </ark.span>
      <NuxtLink to="/blog" :class="cdLink"> cd .. </NuxtLink>
    </ark.p>
  </ark.article>
</template>
