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
      I care about open-source sustainability, community growth, and how LLMs are reshaping
      engineering practice. I write <Chip class="align-middle" to="/blog" label="blog posts" icon="i-lucide-newspaper" /> about these,
      ship side-projects on the side, and maintain a few small tools I rely on every day.
    </ark.p>

    <ark.p class="text-base text-ink-muted leading-relaxed">
      You can find my work on
      <Chip class="align-middle" href="https://github.com/Adebesin-Cell" label="GitHub" icon="i-simple-icons-github" />,
      reach me on <Chip class="align-middle" href="https://www.linkedin.com/in/adebesin-tolulope/" label="LinkedIn" icon="i-simple-icons-linkedin" color="#0A66C2" />,
      or browse my <Chip class="align-middle" to="/projects" label="projects" icon="i-lucide-folder-git-2" />.
    </ark.p>
  </ark.article>
</template>
