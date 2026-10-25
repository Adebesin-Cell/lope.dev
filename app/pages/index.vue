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

const socials = [
  { href: 'https://github.com/Adebesin-Cell', label: 'GitHub', icon: 'i-simple-icons-github' },
  { href: 'https://www.linkedin.com/in/adebesin-tolulope/', label: 'LinkedIn', icon: 'i-simple-icons-linkedin' },
  { href: 'https://bsky.app/profile/lopeadebesin.bsky.social', label: 'Bluesky', icon: 'i-simple-icons-bluesky' },
  { href: 'https://x.com/I_am_Lope', label: 'X', icon: 'i-simple-icons-x' },
]

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
  <ark.article class="slide-enter-content space-y-6 text-base text-ink-muted leading-7">
    <ark.h1 class="text-4xl font-700 tracking-tight leading-tight text-ink mb-8">
      Adebesin Tolulope <ark.span class="text-ink-muted">(Lope)</ark.span>
    </ark.h1>

    <ark.p>
      Hi, I'm Adebesin Tolulope, a design engineer and open sourcer.
    </ark.p>

    <ark.p class="leading-9">
      <template v-for="row in roleRows" :key="row.label">
        {{ row.label }}
        <Chip v-for="c in row.chips" :key="c.label" v-bind="c" class="me-1" />
        <br>
      </template>
    </ark.p>

    <ark.p>
      I build the tools other developers style their apps with, then use them to make products
      that feel good to use. Most of my time goes into Panda, Ark and Zag, and the rest into
      BethelFlow, software churches use to run their week. Everything is on my
      <Chip to="/projects" label="projects" icon="i-lucide-folder-git-2" /> page.
    </ark.p>

    <ark.p>
      I write a <Chip to="/blog/build-once-at-build-time" label="series" icon="i-lucide-newspaper" />
      on how Panda CSS works inside, and gave my first talk,
      <Chip href="https://sailsconf.com/2026/talks/17347112-5f4c-4086-bd0d-013eb2d2ff77" label="Rebuilding Panda's Engine" icon="i-lucide-mic" />,
      at SailsConf in October 2026. For fun, I make animated pages and small games in
      <Chip to="/play" label="play" icon="i-lucide-gamepad-2" />.
    </ark.p>

    <ark.p>
      Away from the keyboard, I play basketball, train at the gym and cook, and church is a big part of my life.
    </ark.p>

    <ark.div class="pt-6 border-t border-ink/10">
      <ark.p class="mb-3">
        Find me on
      </ark.p>
      <ark.p class="flex flex-wrap gap-x-4 gap-y-2">
        <ark.a v-for="l in socials" :key="l.label" :href="l.href" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink transition-colors">
          <ark.span :class="l.icon" class="op-75" aria-hidden="true" />
          {{ l.label }}
        </ark.a>
      </ark.p>
    </ark.div>
  </ark.article>
</template>
