<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import { css } from 'styled-system/css'
import { mediumPosts } from '~/data/medium-posts'

const NuxtLink = resolveComponent('NuxtLink')

usePageSeo({
  title: 'Blog — Adebesin Tolulope',
  description:
    'Adebesin Tolulope on Panda CSS internals, design systems, open source in the Chakra ecosystem, engineering with LLMs, and building BethelFlow.',
})

interface PostItem {
  title: string
  date: string
  lang?: string
  readingTime?: string
  path?: string
  external?: string
}

const { data } = await useAsyncData('blog-list', () => queryCollection('blog').order('date', 'DESC').all())

const posts = computed<PostItem[]>(() => {
  const onSite: PostItem[] = (data.value ?? [])
    .filter((p) => !p.draft)
    .map((p) => ({
      title: p.title,
      date: p.date,
      lang: p.lang,
      readingTime: readingTimeText(p.body),
      path: p.path,
    }))

  const external: PostItem[] = mediumPosts.map((m) => ({
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

const srOnly = css({ srOnly: true })
const intro = css({ color: 'ink.muted', mb: '10' })
const empty = css({ color: 'ink.muted', fontSize: 'sm', fontStyle: 'italic' })
const list = css({ position: 'relative' })
const yearRow = css({
  position: 'relative',
  userSelect: 'none',
  pointerEvents: 'none',
  scrollMarginTop: '24',
  h: { base: '16', md: '20' },
  mt: '10',
  _first: { mt: '2' },
})
const yearText = css({
  position: 'absolute',
  top: { base: '-2', md: '-4' },
  insetStart: { base: '-1', md: '-3' },
  fontSize: { base: '6xl', sm: '7xl', md: '8xl' },
  fontWeight: 'bold',
  opacity: '0.05',
  letterSpacing: 'tight',
  lineHeight: 'none',
})
const item = css({ position: 'relative' })
const row = css({
  display: 'inline-flex',
  flexDirection: { base: 'column', md: 'row' },
  alignItems: { md: 'baseline' },
  gap: { base: '0.5', md: '3' },
  py: '2',
  w: 'fit',
  opacity: '0.9',
  transition: 'opacity',
  _hover: { opacity: '1' },
})
const titleRow = css({ display: 'flex', alignItems: 'baseline', gap: '1.5', flexWrap: 'wrap' })
const langTag = css({
  fontSize: 'xs',
  bg: 'ink/10',
  rounded: 'sm',
  px: '1.5',
  py: '0.5',
  color: 'ink.muted',
  alignSelf: 'center',
})
const postTitle = css({ fontSize: 'md', lineHeight: 'snug' })
const externalIcon = css({ fontSize: 'xs', color: 'ink.faint', alignSelf: 'center' })
const date = css({
  display: 'flex',
  alignItems: 'center',
  gap: '1',
  fontSize: 'sm',
  color: 'ink.muted',
  whiteSpace: 'nowrap',
})
const faint = css({ color: 'ink.faint' })
</script>

<template>
  <ark.article class="slide-enter-content">
    <SubNav />
    <ark.h1 :class="srOnly"> Blog </ark.h1>
    <ark.p :class="intro"> Notes on open source, engineering with LLMs, and projects I'm building. </ark.p>

    <ark.div v-if="!posts.length" :class="empty"> No posts yet — drafts in flight. </ark.div>

    <ark.ul :class="list">
      <template v-for="(post, idx) in posts" :key="post.external ?? post.path">
        <ark.li
          v-if="idx === 0 || year(post.date) !== year(posts[idx - 1]?.date ?? '')"
          :id="`y${year(post.date)}`"
          :data-toc="year(post.date)"
          :class="yearRow"
          aria-hidden="true"
        >
          <ark.span :class="yearText">
            {{ year(post.date) }}
          </ark.span>
        </ark.li>
        <ark.li :class="['slide-enter-content', item]">
          <component
            :is="post.external ? 'a' : NuxtLink"
            v-bind="post.external ? { href: post.external, target: '_blank', rel: 'noopener' } : { to: post.path }"
            :class="row"
          >
            <ark.span :class="titleRow">
              <ark.span v-if="post.lang" :class="langTag">
                {{ post.lang }}
              </ark.span>
              <ark.span :class="postTitle">{{ post.title }}</ark.span>
              <ark.span v-if="post.external" :class="['i-lucide-arrow-up-right', externalIcon]" aria-hidden="true" />
            </ark.span>
            <ark.span :class="date">
              <ark.span>{{ fmt(post.date) }}</ark.span>
              <ark.span v-if="post.readingTime" :class="faint">· {{ post.readingTime }}</ark.span>
            </ark.span>
          </component>
        </ark.li>
      </template>
    </ark.ul>
  </ark.article>
</template>
