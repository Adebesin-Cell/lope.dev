<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import { projects } from '~~/shared/data/projects'

usePageSeo({
  title: 'Projects: Panda CSS, Ark UI, Chakra UI — Adebesin Tolulope',
  description: 'What Lope maintains and builds: Panda CSS, Ark UI, Chakra UI and Zag in the Chakra ecosystem, adk-ts and IQ.wiki at IQ, BethelFlow, and side projects.',
})

const siteUrl = useSiteConfig().url.replace(/\/$/, '')
const items = projects.flatMap(g => g.projects).filter(p => p.href)

useHead({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      'name': 'Projects',
      'url': `${siteUrl}/projects`,
      'author': { '@type': 'Person', 'name': 'Adebesin Tolulope', 'url': siteUrl },
      'mainEntity': {
        '@type': 'ItemList',
        'itemListElement': items.map((p, i) => ({
          '@type': 'ListItem',
          'position': i + 1,
          'name': p.name,
          'url': p.href,
        })),
      },
    }),
  }],
})
</script>

<template>
  <ark.article class="slide-enter-content">
    <ark.header class="text-center mb-12">
      <ark.h1 class="text-4xl font-700 tracking-tight mb-3">
        Projects
      </ark.h1>
      <ark.p class="text-ink-muted">
        Open source I maintain, products I build at work, and things I make for fun.
      </ark.p>
      <ark.div class="flex items-center justify-center gap-3 mt-6">
        <ark.a
          href="https://github.com/Adebesin-Cell"
          target="_blank"
          rel="noopener"
          class="btn btn-ghost"
        >
          <ark.span class="i-simple-icons-github" aria-hidden="true" />
          GitHub
        </ark.a>
        <NuxtLink to="/releases" class="btn btn-ghost">
          <ark.span class="i-lucide-rocket" aria-hidden="true" />
          Recent Releases
        </NuxtLink>
      </ark.div>
    </ark.header>

    <ProjectGroup v-for="g in projects" :key="g.title" :group="g" />
  </ark.article>
</template>
