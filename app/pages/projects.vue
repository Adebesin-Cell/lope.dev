<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import { projects } from '~~/shared/data/projects'

useHead({ title: 'Projects — Adebesin Tolulope' })
</script>

<template>
  <ark.article class="slide-enter-content">
    <ark.header class="text-center mb-12">
      <ark.h1 class="text-4xl font-700 tracking-tight mb-3">
        Projects
      </ark.h1>
      <ark.p class="text-ink-muted">
        Things I've built, contribute to, or care about.
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
