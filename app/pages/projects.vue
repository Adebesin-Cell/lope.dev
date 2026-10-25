<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import { css } from 'styled-system/css'
import { projects } from '~~/shared/data/projects'
import { button } from 'styled-system/recipes'

const ghostButton = button()
const lead = css({ color: 'ink.muted' })
const pageTitle = css({ textStyle: 'display', mb: '3' })

usePageSeo({
  title: 'Projects: Panda CSS, Ark UI, Chakra UI — Adebesin Tolulope',
  description:
    'What Lope maintains and builds: Panda CSS, Ark UI, Chakra UI and Zag in the Chakra ecosystem, adk-ts and IQ.wiki at IQ, BethelFlow, and side projects.',
})

const siteUrl = useSiteConfig().url.replace(/\/$/, '')
const items = projects.flatMap((g) => g.projects).filter((p) => p.href)

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Projects',
        url: `${siteUrl}/projects`,
        author: { '@type': 'Person', name: 'Adebesin Tolulope', url: siteUrl },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: items.map((p, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: p.name,
            url: p.href,
          })),
        },
      }),
    },
  ],
})

const header = css({ mb: '10' })
const actions = css({ display: 'flex', alignItems: 'center', gap: '3', mt: '6' })
</script>

<template>
  <ark.article class="slide-enter-content">
    <ark.header :class="header">
      <ark.h1 :class="pageTitle"> Projects </ark.h1>
      <ark.p :class="lead"> Open source I maintain, products I build at work, and things I make for fun. </ark.p>
      <ark.div :class="actions">
        <ark.a href="https://github.com/Adebesin-Cell" target="_blank" rel="noopener" :class="ghostButton">
          <ark.span class="i-simple-icons-github" aria-hidden="true" />
          GitHub
        </ark.a>
        <NuxtLink to="/releases" :class="ghostButton">
          <ark.span class="i-lucide-rocket" aria-hidden="true" />
          Recent Releases
        </NuxtLink>
      </ark.div>
    </ark.header>

    <ProjectGroup v-for="g in projects" :key="g.title" :group="g" />
  </ark.article>
</template>
