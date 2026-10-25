<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'

usePageSeo({
  title: 'Adebesin Tolulope (Lope) — Design Engineer',
  description: 'Adebesin Tolulope (Lope), design engineer and open sourcer. Core maintainer of Panda CSS, Chakra UI, Ark UI and Zag. Writing on design systems and CSS.',
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
        'image': `${siteUrl}/lope-avatar.jpeg`,
        'jobTitle': 'Design Engineer',
        'description': 'Design engineer and open sourcer. Core maintainer of Panda CSS, Chakra UI, Ark UI and Zag.',
        'worksFor': { '@type': 'Organization', 'name': 'IQ.AI', 'url': 'https://iqai.com/' },
        'alumniOf': { '@type': 'CollegeOrUniversity', 'name': 'Federal University of Technology, Akure' },
        'knowsAbout': ['Design engineering', 'Frontend engineering', 'Design systems', 'CSS', 'Panda CSS', 'Chakra UI', 'Ark UI', 'Zag', 'React', 'Vue', 'Nuxt', 'TypeScript', 'Open source'],
        'sameAs': [
          'https://github.com/Adebesin-Cell',
          'https://www.linkedin.com/in/adebesin-tolulope/',
          'https://x.com/I_am_Lope',
          'https://bsky.app/profile/lopeadebesin.bsky.social',
          'https://iamlope.substack.com',
          'https://iamlope.medium.com',
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
    label: 'Core maintainer at',
    chips: [
      { icon: 'i-simple-icons-chakraui', color: '#4FD1C5', label: 'Chakra UI', href: 'https://github.com/chakra-ui/chakra-ui' },
      { icon: 'i-logos-pandacss-icon', label: 'Panda', href: 'https://github.com/chakra-ui/panda' },
      { logo: '/brands/ark.png', label: 'Ark UI', href: 'https://github.com/chakra-ui/ark' },
      { logo: '/brands/zag.png', label: 'Zag', href: 'https://github.com/chakra-ui/zag' },
    ],
  },
  {
    label: 'Contributing to',
    chips: [
      { logo: '/brands/npmx.svg', logoLight: '/brands/npmx-light.svg', label: 'npmx.dev', href: 'https://npmx.dev' },
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
      Hi, I'm Adebesin Tolulope, a design engineer and open sourcer.
    </ark.p>

    <ark.div class="space-y-3 text-sm">
      <ark.div v-for="row in roleRows" :key="row.label" class="flex flex-wrap items-center gap-2">
        <ark.span class="text-ink-muted w-full md:w-44 shrink-0">{{ row.label }}</ark.span>
        <Chip v-for="c in row.chips" :key="c.label" v-bind="c" />
      </ark.div>
    </ark.div>

    <ark.p class="text-base text-ink-muted leading-relaxed">
      I build the tools other developers style their apps with, then use them to make products
      that feel good to use. Most of my time goes into Panda, Ark and Zag, and the rest into
      BethelFlow, software churches use to run their week. Everything is on my
      <Chip class="align-middle" to="/projects" label="projects" icon="i-lucide-folder-git-2" /> page.
    </ark.p>

    <ark.p class="text-base text-ink-muted leading-relaxed">
      I write a <Chip class="align-middle" to="/blog/build-once-at-build-time" label="series" icon="i-lucide-newspaper" />
      on how Panda CSS works inside, and gave my first talk,
      <Chip class="align-middle" href="https://sailsconf.com/2026/talks/17347112-5f4c-4086-bd0d-013eb2d2ff77" label="Rebuilding Panda's Engine" icon="i-lucide-mic" />,
      at SailsConf in October 2026. For fun, I make animated pages and small games in
      <Chip class="align-middle" to="/play" label="play" icon="i-lucide-gamepad-2" />.
    </ark.p>

    <ark.p class="text-base text-ink-muted leading-relaxed">
      Away from the keyboard, I play basketball, train at the gym and cook, and church is a big part of my life.
    </ark.p>

    <ark.div class="space-y-3">
      <ark.p class="text-base text-ink-muted">
        Find me on
      </ark.p>
      <ark.div class="flex flex-wrap gap-2">
        <Chip href="https://github.com/Adebesin-Cell" label="GitHub" icon="i-simple-icons-github" />
        <Chip href="https://www.linkedin.com/in/adebesin-tolulope/" label="LinkedIn" icon="i-simple-icons-linkedin" color="#0A66C2" />
        <Chip href="https://bsky.app/profile/lopeadebesin.bsky.social" label="Bluesky" icon="i-simple-icons-bluesky" color="#1185FE" />
        <Chip href="https://x.com/I_am_Lope" label="X" icon="i-simple-icons-x" />
      </ark.div>
    </ark.div>
  </ark.article>
</template>
