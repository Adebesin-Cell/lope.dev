<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'

usePageSeo({
  title: 'Blog — Adebesin Tolulope',
  description: 'Notes on open source, engineering with LLMs, and the projects Lope is building.',
})

interface BlogPost {
  path: string
  title: string
  description?: string
  date: string
  readingTime?: string
  lang?: string
  draft?: boolean
}

const { data } = await useAsyncData('blog-list', () =>
  queryCollection('blog')
    .order('date', 'DESC')
    .all() as Promise<BlogPost[]>,
)

const grouped = computed(() => {
  const byYear = new Map<string, BlogPost[]>()
  for (const post of (data.value ?? []).filter(p => !p.draft)) {
    const year = new Date(post.date).getFullYear().toString()
    if (!byYear.has(year))
      byYear.set(year, [])
    byYear.get(year)!.push(post)
  }
  return Array.from(byYear.entries()).sort((a, b) => Number(b[0]) - Number(a[0]))
})

function fmt(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
</script>

<template>
  <ark.article class="slide-enter-content">
    <ark.h1 class="text-4xl font-700 tracking-tight mb-3">
      Blog
    </ark.h1>
    <ark.p class="text-ink-muted mb-12">
      Notes on open source, engineering with LLMs, and projects I'm building.
    </ark.p>

    <ark.div v-if="!data?.length" class="text-ink-muted text-sm italic">
      No posts yet — drafts in flight.
    </ark.div>

    <ark.section v-for="[year, posts] in grouped" :key="year" :id="`y${year}`" :data-toc="year" class="relative scroll-mt-24 mb-10 overflow-hidden md:overflow-visible">
      <ark.div
        class="absolute top-0 md:-top-6 -start-2 md:-start-14 text-5xl sm:text-7xl md:text-8xl font-700 op-5 select-none pointer-events-none tracking-tight"
      >
        {{ year }}
      </ark.div>
      <ark.ul class="slide-enter-content relative space-y-3 md:space-y-1 pt-10 md:pt-0">
        <ark.li v-for="post in posts" :key="post.path">
          <NuxtLink
            :to="post.path"
            class="flex flex-col md:flex-row md:items-baseline gap-0.5 md:gap-3 py-1 md:py-2 hover:op-100 op-90 transition-opacity"
          >
            <ark.span
              v-if="post.lang"
              class="text-xs bg-ink/10 rounded px-1.5 py-0.5 text-ink-muted self-start"
            >
              {{ post.lang }}
            </ark.span>
            <ark.span class="text-base">{{ post.title }}</ark.span>
            <ark.span class="text-sm text-ink-muted">{{ fmt(post.date) }}</ark.span>
            <ark.span v-if="post.readingTime" class="text-sm text-ink-faint">
              · {{ post.readingTime }}
            </ark.span>
          </NuxtLink>
        </ark.li>
      </ark.ul>
    </ark.section>
  </ark.article>
</template>
