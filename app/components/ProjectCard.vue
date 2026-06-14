<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import type { Project } from '~~/shared/data/projects'

defineProps<{ project: Project }>()
</script>

<template>
  <ark.a
    :href="project.href"
    target="_blank"
    rel="noopener"
    class="card group flex items-start gap-3 p-3 -mx-3 rounded-lg hover:bg-ink/3 transition-colors"
  >
    <ark.div class="grid place-items-center w-6 h-6 mt-0.5 shrink-0" aria-hidden="true">
      <BrandLogo
        v-if="project.logo"
        :src="project.logo"
        :light="project.logoLight"
        :alt="project.name"
        class="w-full h-full op-80 group-hover:op-100 transition-opacity"
      />
      <ark.span
        v-else-if="project.icon"
        :class="project.icon"
        class="w-full! h-full! op-70 group-hover:op-100 transition-opacity"
        :style="project.color ? { color: project.color } : undefined"
      />
    </ark.div>
    <ark.div class="flex-1 min-w-0">
      <ark.div class="text-sm font-500 text-ink">
        {{ project.name }}
      </ark.div>
      <ark.div class="text-xs text-ink-muted leading-relaxed mt-0.5">
        {{ project.description }}
      </ark.div>
    </ark.div>
  </ark.a>
</template>
