<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import { projects } from '~~/shared/data/projects'

useHead({ title: 'Projects — Adebesin Tolulope' })
</script>

<template>
  <ark.article>
    <ark.header class="text-center mb-12">
      <ark.h1 class="text-4xl font-700 tracking-tight mb-3">
        Projects
      </ark.h1>
      <ark.p class="text-ink-muted italic">
        Things I've built, contribute to, or care about.
      </ark.p>
      <ark.div class="flex items-center justify-center gap-2 mt-6 text-sm">
        <ark.a
          href="https://github.com/Adebesin-Cell"
          target="_blank"
          rel="noopener"
          class="chip"
        >
          <ark.span class="i-simple-icons-github" />
          GitHub
        </ark.a>
        <NuxtLink to="/releases" class="chip">
          <ark.span class="i-lucide-rocket" />
          Recent Releases
        </NuxtLink>
      </ark.div>
    </ark.header>

    <ProjectGroup v-for="g in projects" :key="g.title" :group="g" />
  </ark.article>
</template>
