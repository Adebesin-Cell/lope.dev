<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import { css } from 'styled-system/css'
import { link } from 'styled-system/recipes'
import { substackPosts, substackUrl } from '~/data/substack-posts'

usePageSeo({
  title: 'Essays — Adebesin Tolulope',
  description: 'Away from code, I try to write. Just write, and perhaps share what I think. Personal essays on Substack.',
})

function fmt(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const title = css({ textStyle: 'display', mb: '3' })
const intro = css({ color: 'ink.muted', mb: '10', maxW: 'prose' })
const substack = link({ tone: 'muted' })
const list = css({ '& > * + *': { mt: { base: '4', md: '2' } } })
const row = css({
  display: 'inline-flex',
  flexDirection: { base: 'column', md: 'row' },
  alignItems: { md: 'baseline' },
  gap: { base: '0.5', md: '3' },
  py: '1',
  w: 'fit',
  opacity: '0.9',
  transition: 'opacity',
  _hover: { opacity: '1' },
})
const titleRow = css({ display: 'flex', alignItems: 'baseline', gap: '1.5' })
const postTitle = css({ fontSize: 'md', lineHeight: 'snug' })
const externalIcon = css({ fontSize: 'xs', color: 'ink.faint', alignSelf: 'center' })
const date = css({ fontSize: 'sm', color: 'ink.muted', whiteSpace: 'nowrap' })
</script>

<template>
  <ark.article class="slide-enter-content">
    <ark.h1 :class="title">
      Essays
    </ark.h1>
    <ark.p :class="intro">
      Away from code, I try to write. Just write, and perhaps share what I think. It lives on
      <ark.a
        :href="substackUrl"
        target="_blank"
        rel="noopener"
        :class="substack"
      >
        Substack
      </ark.a>.
    </ark.p>

    <ark.ul :class="list">
      <ark.li v-for="post in substackPosts" :key="post.url">
        <ark.a
          :href="post.url"
          target="_blank"
          rel="noopener"
          :class="row"
        >
          <ark.span :class="titleRow">
            <ark.span :class="postTitle">{{ post.title }}</ark.span>
            <ark.span :class="['i-lucide-arrow-up-right', externalIcon]" aria-hidden="true" />
          </ark.span>
          <ark.span :class="date">{{ fmt(post.date) }}</ark.span>
        </ark.a>
      </ark.li>
    </ark.ul>
  </ark.article>
</template>
