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
    class="card group flex items-start gap-3 p-3 -mx-3 rounded-lg hover:bg-white/3 transition-colors"
  >
    <BrandLogo
      v-if="project.logo"
      :src="project.logo"
      :light="project.logoLight"
      :alt="project.name"
      class="w-6 h-6 mt-0.5 op-80 group-hover:op-100 transition-opacity"
    />
    <ark.span
      v-else-if="project.icon"
      :class="project.icon"
      class="text-2xl op-50 group-hover:op-90 transition-opacity mt-0.5"
    />
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
