<script setup lang="ts">
import { css } from 'styled-system/css'

const route = useRoute()
const { data } = await useAsyncData(`cover-${route.path}`, async () => {
  const post = await queryCollection('blog').path(route.path).select('series', 'part').first()
  if (!post?.series) return null
  const all = await queryCollection('blog').where('series', '=', post.series).select('draft').all()
  return { series: post.series, part: post.part ?? 0, total: all.filter((p) => !p.draft).length }
})

const frame = css({ my: '8', rounded: 'lg', overflow: 'hidden', borderWidth: '1px', borderColor: 'ink/10' })
</script>

<template>
  <div v-if="data" :class="frame">
    <Cover :series="data.series" :part="data.part" :total="data.total" />
  </div>
</template>
