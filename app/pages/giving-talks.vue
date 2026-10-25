<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import { css } from 'styled-system/css'
import { link } from 'styled-system/recipes'

const prose = css({ color: 'ink.muted', lineHeight: '[2rem]', '& > * + *': { mt: '6' } })
const underlineLink = link()

usePageSeo({
  title: 'Giving Talks — Adebesin Tolulope',
  description: 'Speaker info for Adebesin Tolulope (Lope): bio, headshot and links for conferences and meetups.',
})

const info = [
  { label: 'Name', value: 'Adebesin Tolulope (Lope)' },
  {
    label: 'Headshot',
    value: 'lope.adebesin.com/lope-headshot.jpg',
    href: '/lope-headshot.jpg',
    copy: 'https://lope.adebesin.com/lope-headshot.jpg',
  },
  {
    label: 'Introduction',
    value:
      "Adebesin Tolulope (Lope) is a design engineer and open sourcer. He's a core maintainer of Panda CSS, Chakra UI, Ark UI and Zag, the tools thousands of teams build their interfaces on, and he's building BethelFlow, a church operating system. He cares about the layer under our interfaces, and about making open source a warmer room for the next person who wants in.",
  },
  { label: 'Location', value: 'Nigeria' },
  { label: 'Company', value: 'IQ Industries', href: 'https://iqindustries.com/' },
  {
    label: 'Website',
    value: 'lope.adebesin.com',
    href: 'https://lope.adebesin.com',
    copy: 'https://lope.adebesin.com',
  },
  { label: 'GitHub', value: '@Adebesin-Cell', href: 'https://github.com/Adebesin-Cell' },
  { label: 'X', value: '@I_am_Lope', href: 'https://x.com/I_am_Lope' },
  { label: 'LinkedIn', value: 'adebesin-tolulope', href: 'https://www.linkedin.com/in/adebesin-tolulope/' },
]

const title = css({ fontSize: '4xl', fontWeight: 'bold', letterSpacing: 'tight', color: 'ink', mb: '8' })
const subhead = css({ fontSize: 'xl', fontWeight: 'bold', color: 'ink', pt: '4' })
const grid = css({
  display: 'grid',
  gridTemplateColumns: 'max-content 1fr',
  columnGap: '4',
  rowGap: '2',
  lineHeight: '[1.75rem]',
})
const term = css({ textAlign: 'end', fontWeight: 'semibold', opacity: '0.6' })
const value = css({ color: 'ink' })
</script>

<template>
  <ark.article :class="['slide-enter-content', prose]">
    <ark.h1 :class="title"> Giving Talks </ark.h1>

    <ark.p>
      Hey! I'm <NuxtLink to="/" :class="underlineLink">Lope</NuxtLink>, a design engineer and open sourcer. I talk about
      Panda CSS, design systems, headless components and open source. Here are the
      <NuxtLink to="/talks" :class="underlineLink">talks I've given</NuxtLink>.
    </ark.p>

    <ark.p>
      Organising a conference or meetup? I'd love to give a talk. Reach me on
      <ark.a href="https://www.linkedin.com/in/adebesin-tolulope/" target="_blank" rel="noopener" :class="underlineLink"
        >LinkedIn</ark.a
      >.
    </ark.p>

    <ark.h2 :class="subhead"> Information </ark.h2>

    <ark.p> You can use the following to introduce me: </ark.p>

    <ark.dl :class="grid">
      <template v-for="row in info" :key="row.label">
        <ark.dt :class="term">
          {{ row.label }}
        </ark.dt>
        <ark.dd :class="value">
          <TextCopy :text="row.copy ?? row.value">
            <ark.a v-if="row.href" :href="row.href" target="_blank" rel="noopener" :class="underlineLink">
              {{ row.value }}
            </ark.a>
            <template v-else>
              {{ row.value }}
            </template>
          </TextCopy>
        </ark.dd>
      </template>
    </ark.dl>
  </ark.article>
</template>
