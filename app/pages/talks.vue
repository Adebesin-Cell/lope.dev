<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import { css } from 'styled-system/css'
import { givenTalks, talks } from '~~/shared/data/talks'
import { link } from 'styled-system/recipes'

const lead = css({ color: 'ink.muted' })
const srOnly = css({ srOnly: true })
const underlineLink = link()

usePageSeo({
  title: 'Talks — Adebesin Tolulope',
  description: 'Talks by Adebesin Tolulope (Lope) on Panda CSS, design systems and open source, with recordings and slides.',
})

function fmt(d: string) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const header = css({ mb: '10' })
const speaker = css({ display: 'inline-flex', alignItems: 'center', gap: '1.5', color: 'ink.muted', textDecoration: 'underline', textDecorationColor: 'ink/30', textUnderlineOffset: '4px', transition: 'colors', _hover: { color: 'ink' } })
const list = css({ '& > * + *': { borderTopWidth: '1px', borderColor: 'ink/10' } })
const item = css({ py: '8', _first: { pt: '0' } })
const talkTitle = css({ fontSize: '2xl', fontWeight: 'bold', letterSpacing: 'tight', color: 'ink' })
const subtitle = css({ mt: '2', color: 'ink.muted' })
const meta = css({ mt: '5', display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '4' })
const when = css({ fontSize: 'sm', color: 'ink.faint', mt: '1' })
const links = css({ display: 'flex', alignItems: 'center', gap: '4', fontSize: 'sm', color: 'ink.muted' })
const action = css({ display: 'inline-flex', alignItems: 'center', gap: '1.5', transition: 'colors', _hover: { color: 'ink' } })
const topics = css({ mt: '16' })
const topicsLabel = css({ fontSize: 'sm', color: 'ink.muted', mb: '4' })
const topicList = css({ '& > * + *': { mt: '3' } })
</script>

<template>
  <ark.article class="slide-enter-content">
    <ark.header :class="header">
      <SubNav />
      <ark.h1 :class="srOnly">
        Talks
      </ark.h1>
      <NuxtLink to="/giving-talks" :class="speaker">
        <ark.span class="i-lucide-presentation" aria-hidden="true" />
        Speaker info
      </NuxtLink>
    </ark.header>

    <ark.ul :class="list">
      <ark.li v-for="talk in givenTalks" :key="talk.title" :class="item">
        <ark.h2 :class="talkTitle">
          {{ talk.title }}
        </ark.h2>
        <ark.p :class="subtitle">
          {{ talk.subtitle }}
        </ark.p>
        <ark.div :class="meta">
          <ark.div>
            <ark.a :href="talk.eventUrl" target="_blank" rel="noopener" :class="underlineLink">
              {{ talk.event }}
            </ark.a>
            <ark.p :class="when">
              {{ fmt(talk.date) }} · {{ talk.location }}
            </ark.p>
          </ark.div>
          <ark.div :class="links">
            <ark.a v-if="talk.watch" :href="talk.watch" target="_blank" rel="noopener" :class="action">
              <ark.span class="i-lucide-play" aria-hidden="true" />
              Watch
            </ark.a>
            <ark.a v-if="talk.pdf" :href="talk.pdf" target="_blank" rel="noopener" :class="action">
              <ark.span class="i-lucide-download" aria-hidden="true" />
              PDF
            </ark.a>
          </ark.div>
        </ark.div>
      </ark.li>
    </ark.ul>

    <ark.section :class="topics">
      <ark.h2 :class="topicsLabel">
        I'd love to talk about
      </ark.h2>
      <ark.ul :class="topicList">
        <ark.li v-for="talk in talks" :key="talk.name">
          <ark.a :href="talk.href" target="_blank" rel="noopener" :class="underlineLink">{{ talk.name }}</ark.a>
          <ark.span :class="lead">: {{ talk.angle }}</ark.span>
        </ark.li>
      </ark.ul>
    </ark.section>
  </ark.article>
</template>
