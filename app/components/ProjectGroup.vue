<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import type { ProjectGroup } from '~~/shared/data/projects'

defineProps<{ group: ProjectGroup }>()
</script>

<template>
  <ark.section class="relative py-12 overflow-hidden md:overflow-visible">
    <ark.h2
      class="watermark-heading absolute -top-4 -left-2 md:-left-12 max-w-full text-4xl sm:text-5xl md:text-6xl font-700 op-5 select-none pointer-events-none uppercase tracking-tight truncate"
    >
      {{ group.title }}
    </ark.h2>

    <ark.h3 class="relative mb-4 text-xs uppercase tracking-wider text-ink-muted font-500">
      {{ group.title }}
    </ark.h3>

    <ark.div class="relative grid gap-1 md:grid-cols-2">
      <ProjectCard v-for="p in group.projects" :key="p.name" :project="p" />
    </ark.div>
  </ark.section>
</template>
