<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'

usePageSeo({
  title: 'Giving Talks — Adebesin Tolulope',
  description: 'Speaker info for Adebesin Tolulope (Lope): bio, headshot and links for conferences and meetups.',
})

const info = [
  { label: 'Name', value: 'Adebesin Tolulope (Lope)' },
  { label: 'Headshot', value: 'lope.adebesin.com/lope-headshot.jpg', href: '/lope-headshot.jpg' },
  { label: 'Introduction', value: 'Adebesin Tolulope (Lope) is an open-source engineer from Nigeria. He works on Chakra UI, Panda CSS, and Ark UI, where he co-led the latest Panda CSS and now leads Ark UI v6. He also contributes to Zag.js and is building BethelFlow, a church operating system. He cares about the layer under our interfaces and about making open source a warmer room for the next person who wants in.' },
  { label: 'Location', value: 'Nigeria' },
  { label: 'Company', value: 'IQ Industries', href: 'https://iqindustries.com/' },
  { label: 'Website', value: 'lope.adebesin.com', href: 'https://lope.adebesin.com' },
  { label: 'GitHub', value: '@Adebesin-Cell', href: 'https://github.com/Adebesin-Cell' },
  { label: 'X', value: '@I_am_Lope', href: 'https://x.com/I_am_Lope' },
  { label: 'LinkedIn', value: 'adebesin-tolulope', href: 'https://www.linkedin.com/in/adebesin-tolulope/' },
]
</script>

<template>
  <ark.article class="slide-enter-content space-y-6 text-ink-muted leading-8">
    <ark.h1 class="text-4xl font-700 tracking-tight text-ink mb-8">
      Giving Talks
    </ark.h1>

    <ark.p>
      Hey! I'm <NuxtLink to="/" class="text-ink underline decoration-ink/30 underline-offset-4">Lope</NuxtLink>,
      a design engineer and open sourcer. I talk about Panda CSS, design systems, headless components and open source.
      Here are the <NuxtLink to="/talks" class="text-ink underline decoration-ink/30 underline-offset-4">talks I've given</NuxtLink>.
    </ark.p>

    <ark.p>
      Organising a conference or meetup? I'd love to give a talk. Reach me on
      <ark.a href="https://www.linkedin.com/in/adebesin-tolulope/" target="_blank" rel="noopener" class="text-ink underline decoration-ink/30 underline-offset-4">LinkedIn</ark.a>.
    </ark.p>

    <ark.h2 class="text-xl font-700 text-ink pt-4">
      Information
    </ark.h2>

    <ark.p>
      You can use the following to introduce me:
    </ark.p>

    <ark.dl class="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-2 leading-7">
      <template v-for="row in info" :key="row.label">
        <ark.dt class="text-end font-600 op-60">
          {{ row.label }}
        </ark.dt>
        <ark.dd class="text-ink">
          <ark.a v-if="row.href" :href="row.href" target="_blank" rel="noopener" class="underline decoration-ink/30 underline-offset-4 hover:decoration-ink transition-colors">
            {{ row.value }}
          </ark.a>
          <template v-else>
            {{ row.value }}
          </template>
        </ark.dd>
      </template>
    </ark.dl>
  </ark.article>
</template>
