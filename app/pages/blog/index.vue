<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import { css } from 'styled-system/css'

usePageSeo({
  title: 'Blog — Adebesin Tolulope',
  description:
    'Adebesin Tolulope on Panda CSS internals, design systems, open source in the Chakra ecosystem, engineering with LLMs, and building BethelFlow.',
})

const { data } = await useAsyncData('blog-list', () =>
  queryCollection('blog').select('title', 'date', 'lang', 'draft', 'path', 'readingTime').order('date', 'DESC').all(),
)

const { isRead } = useReads()
const posts = computed(() => (data.value ?? []).filter((p) => !p.draft))

function year(d: string) {
  return new Date(d).getUTCFullYear()
}

function fmt(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' })
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
  _before: { content: 'attr(data-text)' },
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
const date = css({
  display: 'flex',
  alignItems: 'center',
  gap: '1',
  fontSize: 'sm',
  color: 'ink.muted',
  whiteSpace: 'nowrap',
})
const faint = css({ color: 'ink.faint' })
const readMark = css({ fontSize: 'sm', color: 'ink.faint', alignSelf: 'center' })
</script>

<template>
  <ark.article class="slide-enter-content">
    <SubNav />
    <ark.h1 :class="srOnly"> Blog </ark.h1>
    <ark.p :class="intro"> Notes on open source, engineering with LLMs, and projects I'm building. </ark.p>

    <ark.div v-if="!posts.length" :class="empty"> No posts yet — drafts in flight. </ark.div>

    <ark.ul :class="list">
      <template v-for="(post, idx) in posts" :key="post.path">
        <ark.li
          v-if="idx === 0 || year(post.date) !== year(posts[idx - 1]?.date ?? '')"
          :id="`y${year(post.date)}`"
          :data-toc="year(post.date)"
          :class="yearRow"
          aria-hidden="true"
        >
          <ark.span :class="yearText" :data-text="year(post.date)" />
        </ark.li>
        <ark.li :class="['slide-enter-content', item]">
          <NuxtLink :to="post.path" :class="row">
            <ark.span :class="titleRow">
              <ark.span v-if="post.lang" :class="langTag">
                {{ post.lang }}
              </ark.span>
              <ark.span :class="postTitle">{{ post.title }}</ark.span>
              <ark.span v-if="isRead(post.path)" :class="['i-lucide-check', readMark]" title="Read" />
              <ark.span v-if="isRead(post.path)" :class="srOnly">(read)</ark.span>
            </ark.span>
            <ark.span :class="date">
              <ark.span>{{ fmt(post.date) }}</ark.span>
              <ark.span v-if="post.readingTime" :class="faint">· {{ post.readingTime }}</ark.span>
            </ark.span>
          </NuxtLink>
        </ark.li>
      </template>
    </ark.ul>
  </ark.article>
</template>
