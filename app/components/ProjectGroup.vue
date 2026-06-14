<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import type { ProjectGroup } from '~~/shared/data/projects'

const props = defineProps<{ group: ProjectGroup }>()

const slug = computed(() =>
  props.group.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
)
</script>

<template>
  <ark.section :id="slug" :data-toc="group.title" class="relative scroll-mt-24 py-14 md:py-16 overflow-hidden md:overflow-visible">
    <ark.h2
      class="watermark-heading absolute -top-3 -start-2 md:-start-12 text-3xl sm:text-5xl md:text-6xl font-700 op-5 select-none pointer-events-none uppercase tracking-tight whitespace-nowrap"
    >
      {{ group.title }}
    </ark.h2>

    <ark.h3 class="relative mb-4 text-xs uppercase tracking-wider text-ink-muted font-500">
      {{ group.title }}
    </ark.h3>

    <ark.div class="relative grid gap-y-1 gap-x-8 md:grid-cols-2">
      <ProjectCard v-for="p in group.projects" :key="p.name" :project="p" />
    </ark.div>
  </ark.section>
</template>
