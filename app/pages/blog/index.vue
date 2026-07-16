<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import { mediumPosts } from '~/data/medium-posts'

const NuxtLink = resolveComponent('NuxtLink')

usePageSeo({
  title: 'Blog — Adebesin Tolulope',
  description: 'Notes on open source, engineering with LLMs, and the projects Lope is building.',
})

interface PostItem {
  title: string
  date: string
  lang?: string
  readingTime?: string
  path?: string
  external?: string
}

const { data } = await useAsyncData('blog-list', () =>
  queryCollection('blog')
    .order('date', 'DESC')
    .all(),
)

const posts = computed<PostItem[]>(() => {
  const onSite: PostItem[] = (data.value ?? [])
    .filter(p => !p.draft)
    .map(p => ({
      title: p.title,
      date: p.date,
      lang: p.lang,
      readingTime: readingTimeText(p.body),
      path: p.path,
    }))

  const external: PostItem[] = mediumPosts.map(m => ({
    title: m.title,
    date: m.date,
    lang: m.lang,
    readingTime: m.readingTime,
    external: m.url,
  }))

  return [...onSite, ...external].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

function year(d: string) {
  return new Date(d).getFullYear()
}

function fmt(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
</script>

<template>
  <ark.article class="slide-enter-content">
    <ark.h1 class="text-4xl font-700 tracking-tight mb-3">
      Blog
    </ark.h1>
    <ark.p class="text-ink-muted mb-10">
      Notes on open source, engineering with LLMs, and projects I'm building.
    </ark.p>

    <ark.div v-if="!posts.length" class="text-ink-muted text-sm italic">
      No posts yet — drafts in flight.
    </ark.div>

    <ark.ul class="relative">
      <template v-for="(post, idx) in posts" :key="post.external ?? post.path">
        <ark.li
          v-if="idx === 0 || year(post.date) !== year(posts[idx - 1].date)"
          :id="`y${year(post.date)}`"
          :data-toc="year(post.date)"
          class="relative select-none pointer-events-none scroll-mt-24 h-16 md:h-20 mt-10 first:mt-2"
          aria-hidden="true"
        >
          <ark.span class="absolute -top-2 md:-top-4 -start-1 md:-start-3 text-6xl sm:text-7xl md:text-8xl font-700 op-5 tracking-tight leading-none">
            {{ year(post.date) }}
          </ark.span>
        </ark.li>
        <ark.li class="slide-enter-content relative">
          <component
            :is="post.external ? 'a' : NuxtLink"
            v-bind="post.external ? { href: post.external, target: '_blank', rel: 'noopener' } : { to: post.path }"
            class="flex flex-col md:flex-row md:items-baseline gap-0.5 md:gap-3 py-2 op-90 hover:op-100 transition-opacity"
          >
            <ark.span class="flex items-baseline gap-1.5 flex-wrap">
              <ark.span
                v-if="post.lang"
                class="text-xs bg-ink/10 rounded px-1.5 py-0.5 text-ink-muted self-center"
              >
                {{ post.lang }}
              </ark.span>
              <ark.span class="text-base leading-snug">{{ post.title }}</ark.span>
              <ark.span
                v-if="post.external"
                class="i-lucide-arrow-up-right text-xs text-ink-faint self-center"
                aria-hidden="true"
              />
            </ark.span>
            <ark.span class="flex items-center gap-1 text-sm text-ink-muted whitespace-nowrap">
              <ark.span>{{ fmt(post.date) }}</ark.span>
              <ark.span v-if="post.readingTime" class="text-ink-faint">· {{ post.readingTime }}</ark.span>
            </ark.span>
          </component>
        </ark.li>
      </template>
    </ark.ul>
  </ark.article>
</template>
