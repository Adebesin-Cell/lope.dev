<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import type { Project } from '~~/shared/data/projects'

defineProps<{ project: Project }>()
</script>

<template>
  <component
    :is="project.href ? ark.a : ark.div"
    :href="project.href"
    :target="project.href ? '_blank' : undefined"
    :rel="project.href ? 'noopener' : undefined"
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
      <ark.h3 class="text-sm font-500 text-ink">
        {{ project.name }}
        <ark.span v-if="project.role" class="text-xs font-400 text-ink-faint ms-1">· {{ project.role }}</ark.span>
      </ark.h3>
      <ark.p class="text-xs text-ink-muted leading-relaxed mt-0.5">
        {{ project.description }}
      </ark.p>
      <ark.ul v-if="project.stack?.length" class="flex flex-wrap gap-x-2 gap-y-0.5 mt-1.5 text-[11px] text-ink-faint" aria-label="Stack">
        <ark.li v-for="t in project.stack" :key="t">
          {{ t }}
        </ark.li>
      </ark.ul>
    </ark.div>
  </component>
</template>
