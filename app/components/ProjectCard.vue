<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import { css } from 'styled-system/css'
import type { Project } from '~~/shared/data/projects'

defineProps<{ project: Project }>()

const card = css({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '3',
  p: '3',
  mx: '-3',
  rounded: 'lg',
  transition: 'colors',
  _hover: { bg: 'ink/3' },
})
const mark = css({ display: 'grid', placeItems: 'center', w: '6', h: '6', mt: '0.5', flexShrink: '0' })
const logo = css({ w: 'full', h: 'full', opacity: '0.8', transition: 'opacity', _groupHover: { opacity: '1' } })
const icon = css({ w: 'full!', h: 'full!', opacity: '0.7', transition: 'opacity', _groupHover: { opacity: '1' } })
const body = css({ flex: '1', minW: '0' })
const name = css({ fontSize: 'sm', fontWeight: 'medium', color: 'ink' })
const role = css({ fontSize: 'xs', fontWeight: 'normal', color: 'ink.faint', ms: '1' })
const desc = css({ fontSize: 'xs', color: 'ink.muted', lineHeight: 'relaxed', mt: '0.5' })
const stack = css({
  display: 'flex',
  flexWrap: 'wrap',
  columnGap: '2',
  rowGap: '0.5',
  mt: '1.5',
  fontSize: '2xs',
  color: 'ink.faint',
})
</script>

<template>
  <component
    :is="project.href ? ark.a : ark.div"
    :href="project.href"
    :target="project.href ? '_blank' : undefined"
    :rel="project.href ? 'noopener' : undefined"
    :class="['card group', card]"
  >
    <ark.div :class="mark" aria-hidden="true">
      <BrandLogo v-if="project.logo" :src="project.logo" :light="project.logoLight" :alt="project.name" :class="logo" />
      <ark.span
        v-else-if="project.icon"
        :class="[project.icon, icon]"
        :style="project.color ? { color: project.color } : undefined"
      />
    </ark.div>
    <ark.div :class="body">
      <ark.h3 :class="name">
        {{ project.name }}
        <ark.span v-if="project.role" :class="role">· {{ project.role }}</ark.span>
      </ark.h3>
      <ark.p :class="desc">
        {{ project.description }}
      </ark.p>
      <ark.ul v-if="project.stack?.length" :class="stack" aria-label="Stack">
        <ark.li v-for="t in project.stack" :key="t">
          {{ t }}
        </ark.li>
      </ark.ul>
    </ark.div>
  </component>
</template>
