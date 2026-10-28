<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import { css } from 'styled-system/css'
import { isMainPart, seriesSlug } from '~/utils/series'

const route = useRoute()
const slug = String(route.params.slug)

const { data } = await useAsyncData(`series-page-${slug}`, async () => {
  const posts = await queryCollection('blog').select('series', 'date', 'draft', 'part').all()
  const inSeries = posts.filter((p) => !p.draft && p.series && seriesSlug(p.series) === slug)
  if (!inSeries.length) return null
  const first = inSeries.map((p) => p.date).toSorted()[0]
  return { name: inSeries[0]!.series!, total: inSeries.filter((p) => isMainPart(p.part)).length, started: first! }
})

if (!data.value) throw createError({ statusCode: 404, statusMessage: 'Series not found', fatal: true })

const series = data.value
const started = new Date(series.started).toLocaleDateString('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
})

usePageSeo({
  title: `${series.name} — Adebesin Tolulope`,
  description: `Every part of ${series.name}, a series by Adebesin Tolulope (Lope). ${series.total} parts so far.`,
})

const header = css({ mb: '10' })
const back = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '1.5',
  fontSize: 'sm',
  color: 'ink.muted',
  transition: 'colors',
  _hover: { color: 'ink' },
})
const title = css({ mt: '8', textStyle: 'display' })
const lead = css({ mt: '3', fontFamily: 'mono', fontSize: 'sm', color: 'ink.faint' })
</script>

<template>
  <ark.article class="slide-enter-content">
    <ark.header :class="header">
      <NuxtLink to="/blog" :class="back">
        <ark.span class="i-lucide-arrow-left" aria-hidden="true" />
        Back to blog
      </NuxtLink>
      <ark.h1 :class="title">{{ series.name }}</ark.h1>
      <ark.p :class="lead">{{ series.total }} parts · started {{ started }}</ark.p>
    </ark.header>

    <SeriesCard :name="series.name" full />
  </ark.article>
</template>
