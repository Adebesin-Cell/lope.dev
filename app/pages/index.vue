<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'

usePageSeo({
  title: 'Adebesin Tolulope (Lope)',
  description: 'Software engineer and open-source contributor — founding engineer at BethelFlow, working across the Chakra and IQ ecosystems.',
})

const siteUrl = useSiteConfig().url.replace(/\/$/, '')

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        'name': 'Adebesin Tolulope',
        'alternateName': 'Lope',
        'url': siteUrl,
        'jobTitle': 'Software Engineer',
        'sameAs': [
          'https://github.com/Adebesin-Cell',
          'https://x.com/I_am_Lope',
          'https://bsky.app/profile/lopeadebesin.bsky.social',
        ],
      }),
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'name': 'Adebesin Tolulope (Lope)',
        'url': siteUrl,
      }),
    },
  ],
})

const roleRows = [
  {
    label: 'Working with',
    chips: [
      { logo: '/brands/iq.svg', label: 'IQ.AI', href: 'https://iqai.com/' },
      { logo: '/brands/iq.svg', label: 'IQ.wiki', href: 'https://iq.wiki/' },
    ],
  },
  {
    label: 'Maintainer at',
    chips: [
      { icon: 'i-simple-icons-chakraui', color: '#4FD1C5', label: 'Chakra UI', href: 'https://github.com/chakra-ui/chakra-ui' },
      { icon: 'i-logos-pandacss-icon', label: 'Panda', href: 'https://github.com/chakra-ui/panda' },
    ],
  },
  {
    label: 'Contributing to',
    chips: [
      { logo: '/brands/zag.png', label: 'Zag', href: 'https://github.com/chakra-ui/zag' },
      { logo: '/brands/ark.png', label: 'Ark UI', href: 'https://github.com/chakra-ui/ark' },
      { logo: '/brands/npmx.svg', logoLight: '/brands/npmx-light.svg', label: 'npmx.dev', href: 'https://npmx.dev' },
    ],
  },
  {
    label: 'Author of',
    chips: [
      { icon: 'i-lucide-feather', color: '#34D399', label: 'Ekphrasis', href: 'https://github.com/Adebesin-Cell/ekphrasis' },
    ],
  },
  {
    label: 'Currently building',
    chips: [{ logo: '/brands/bethelflow.svg', label: 'BethelFlow', href: 'https://www.bethelflow.com/' }],
  },
]
</script>

<template>
  <ark.article class="slide-enter-content space-y-10">
    <ark.h1 class="text-4xl md:text-5xl font-700 tracking-tight leading-tight">
      Adebesin Tolulope <ark.span class="text-ink-muted">(Lope)</ark.span>
    </ark.h1>

    <ark.p class="text-base text-ink-muted leading-relaxed">
      Hey! I'm Lope, a software engineer and open-source contributor. Founding engineer at
      <ark.a href="https://www.bethelflow.com/" class="underline op-90 hover:op-100">BethelFlow</ark.a>,
      working across the Chakra and IQ ecosystems.
    </ark.p>

    <ark.div class="space-y-3 text-sm">
      <ark.div v-for="row in roleRows" :key="row.label" class="flex flex-wrap items-center gap-2">
        <ark.span class="text-ink-muted w-full md:w-44 shrink-0">{{ row.label }}</ark.span>
        <Chip v-for="c in row.chips" :key="c.label" v-bind="c" />
      </ark.div>
    </ark.div>

    <ark.p class="text-base text-ink-muted leading-relaxed">
      I care about open-source sustainability, community growth, and how LLMs are reshaping
      engineering practice. I write <NuxtLink to="/blog" class="underline">blog posts</NuxtLink> about these,
      ship side-projects on the side, and maintain a few small tools I rely on every day.
    </ark.p>

    <ark.p class="text-base text-ink-muted leading-relaxed">
      You can find my work on
      <ark.a href="https://github.com/Adebesin-Cell" class="underline">GitHub</ark.a>,
      reach me on <ark.a href="https://www.linkedin.com/in/adebesin-tolulope/" class="underline">LinkedIn</ark.a>,
      or browse my <NuxtLink to="/projects" class="underline">projects</NuxtLink>.
    </ark.p>
  </ark.article>
</template>
