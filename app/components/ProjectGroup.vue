<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import { css } from 'styled-system/css'
import { visuallyHidden } from 'styled-system/patterns'
import type { ProjectGroup } from '~~/shared/data/projects'

const props = defineProps<{ group: ProjectGroup }>()

const slug = computed(() =>
  props.group.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, ''),
)

const srOnly = visuallyHidden()
const section = css({
  position: 'relative',
  scrollMarginTop: '24',
  py: { base: '10', md: '12' },
  overflow: { base: 'hidden', md: 'visible' },
})
const watermark = css({
  position: 'absolute',
  top: '-3',
  insetStart: { base: '-2', md: '-12' },
  fontSize: { base: '3xl', sm: '5xl', md: '6xl' },
  fontWeight: 'bold',
  opacity: '0.05',
  _before: { content: 'attr(data-text)' },
  userSelect: 'none',
  pointerEvents: 'none',
  textTransform: 'uppercase',
  letterSpacing: 'tight',
  whiteSpace: 'nowrap',
})
const grid = css({
  position: 'relative',
  display: 'grid',
  rowGap: '1',
  columnGap: '8',
  gridTemplateColumns: { md: 'repeat(2, minmax(0, 1fr))' },
})
</script>

<template>
  <ark.section :id="slug" :data-toc="group.title" :class="section">
    <ark.div aria-hidden="true" :data-text="group.title" :class="['watermark-heading', watermark]" />

    <ark.h2 :class="srOnly">
      {{ group.title }}
    </ark.h2>

    <ark.div :class="grid">
      <ProjectCard v-for="p in group.projects" :key="p.name" :project="p" />
    </ark.div>
  </ark.section>
</template>
