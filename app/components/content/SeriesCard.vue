<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import { css } from 'styled-system/css'

const props = defineProps<{ name: string }>()

const { data: posts } = await useAsyncData(`series-${props.name}`, () =>
  queryCollection('blog').where('series', '=', props.name).order('part', 'ASC').all(),
)
const parts = computed(() => (posts.value ?? []).filter((p) => !p.draft))

const card = css({ mt: '10', p: '5', rounded: 'lg', borderWidth: '1px', borderColor: 'ink/10' })
const label = css({ fontSize: 'xs', color: 'ink.faint', textTransform: 'uppercase', letterSpacing: 'wider' })
const list = css({ listStyle: 'none!', p: '0!', mt: '3', display: 'grid', gap: '1' })
const item = css({ m: '0!', p: '0!', _before: { display: 'none' } })
const link = css({
  display: 'flex',
  gap: '3',
  alignItems: 'baseline',
  py: '1.5',
  px: '2',
  mx: '-2',
  rounded: 'md',
  textDecoration: 'none!',
  color: 'ink',
  transition: 'colors',
  _hover: { bg: 'ink/3' },
})
const num = css({ fontFamily: 'mono', fontSize: 'xs', color: 'ink.faint', flexShrink: '0' })
const title = css({ fontSize: 'sm', fontWeight: 'medium' })
</script>

<template>
  <ark.nav v-if="parts.length" :class="card" :aria-label="`${name} series`">
    <ark.p :class="label">{{ name }} series</ark.p>
    <ark.ol :class="list">
      <ark.li v-for="p in parts" :key="p.path" :class="item">
        <NuxtLink :to="p.path" :class="link">
          <ark.span :class="num">{{ String(p.part).padStart(2, '0') }}</ark.span>
          <ark.span :class="title">{{ p.title }}</ark.span>
        </NuxtLink>
      </ark.li>
    </ark.ol>
  </ark.nav>
</template>
