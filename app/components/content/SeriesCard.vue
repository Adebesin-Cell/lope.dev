<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import { css, cx } from 'styled-system/css'

const props = defineProps<{ name: string; compact?: boolean }>()

const WINDOW = 5
const FILTER_FROM = 10

const route = useRoute()
const { data: posts } = await useAsyncData(`series-${props.name}`, () =>
  queryCollection('blog')
    .where('series', '=', props.name)
    .order('part', 'ASC')
    .select('path', 'title', 'description', 'part', 'date', 'draft')
    .all(),
)

const shortDate = (d: string, year = false) =>
  new Date(d).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: year ? 'numeric' : undefined,
    timeZone: 'UTC',
  })

const parts = computed(() =>
  (posts.value ?? [])
    .filter((p) => !p.draft)
    .map((p) => ({
      path: p.path,
      title: p.title,
      description: p.description,
      part: p.part ?? 0,
      number: String(p.part).padStart(2, '0'),
      date: shortDate(p.date),
      fullDate: shortDate(p.date, true),
      current: p.path === route.path,
    })),
)

type Part = (typeof parts.value)[number]
type Row = { kind: 'part'; part: Part } | { kind: 'more'; hidden: number }

const expanded = ref(false)
const query = ref('')

const collapsed = computed<Row[]>(() => {
  const all = parts.value
  if (all.length <= WINDOW + 2) return all.map((part) => ({ kind: 'part', part }))

  const current = all.findIndex((p) => p.current)
  const start = Math.max(0, Math.min(current - 2, all.length - WINDOW))
  const keep = (i: number) =>
    current === -1 ? i === 0 || i >= all.length - WINDOW : i >= start && i < start + WINDOW

  const rows: Row[] = []
  all.forEach((part, i) => {
    const last = rows.at(-1)
    if (keep(i)) rows.push({ kind: 'part', part })
    else if (last?.kind === 'more') last.hidden++
    else rows.push({ kind: 'more', hidden: 1 })
  })
  return rows
})

const filtered = computed<Row[]>(() => {
  const q = query.value.trim().toLowerCase()
  return parts.value
    .filter((p) => !q || p.title.toLowerCase().includes(q) || String(p.part) === q.replace(/^0+/, ''))
    .map((part) => ({ kind: 'part', part }))
})

const rows = computed(() => (expanded.value ? filtered.value : collapsed.value))
const scroller = ref<HTMLElement>()

async function expand() {
  expanded.value = true
  await nextTick()
  scroller.value?.querySelector('[aria-current=page]')?.scrollIntoView({ block: 'center' })
}

const active = ref<string>()
const activePart = computed(() => parts.value.find((p) => p.path === active.value))
const x = ref(0)
const y = ref(0)

function track(event: PointerEvent) {
  if (event.pointerType !== 'mouse') return
  x.value = event.clientX
  y.value = event.clientY
}

function enter(event: PointerEvent, path: string) {
  if (event.pointerType !== 'mouse') return
  track(event)
  active.value = path
}

const root = css({ mt: '14', mb: '4', '&[data-compact]': { m: '0' } })
const head = css({ display: 'flex', alignItems: 'center', gap: '3', mb: '4' })
const label = css({
  fontFamily: 'mono',
  fontSize: 'xs',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'ink.muted',
})
const rule = css({ flex: '1', h: '[1px]', bg: 'ink/10' })
const count = css({ fontFamily: 'mono', fontSize: 'xs', color: 'ink.faint' })
const filter = css({
  w: 'full',
  mb: '2',
  py: '2',
  bg: 'transparent',
  borderBottomWidth: '[1px]',
  borderColor: 'ink/10',
  fontFamily: 'mono',
  fontSize: 'sm',
  color: 'ink',
  outline: 'none',
  _placeholder: { color: 'ink.faint' },
  _focusVisible: { borderColor: 'ink/40' },
})
const scroll = css({
  '&[data-expanded]': {
    maxH: '96',
    overflowY: 'auto',
    overscrollBehavior: 'contain',
    py: '4',
    maskImage: '[linear-gradient(to bottom, transparent, black 1.5rem, black calc(100% - 1.5rem), transparent)]',
  },
})
const list = css({ listStyle: 'none!', p: '0!', m: '0!' })
const item = css({ m: '0!', p: '0!', _before: { display: 'none' } })
const rowBase = css({
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  columnGap: '4',
  py: '2.5',
  '[data-compact] &': { py: '1.5' },
})
const row = css({
  textDecoration: 'none!',
  color: 'ink.muted',
  transition: 'colors',
  _hover: { color: 'ink' },
  _focusVisible: { color: 'ink' },
  '&[aria-current=page]': { color: 'ink' },
})
const num = css({ fontFamily: 'mono', fontSize: 'xs', color: 'ink.faint', pt: '1' })
const line = css({ display: 'flex', alignItems: 'baseline', gap: '3', minW: '0' })
const title = css({
  fontSize: 'md',
  fontWeight: 'medium',
  textDecoration: 'underline',
  textDecorationColor: 'transparent',
  textUnderlineOffset: '4px',
  transition: 'colors',
  '[data-part]:hover &': { textDecorationColor: 'ink/40' },
  '[data-compact] &': { fontSize: 'sm' },
  '@media (hover: hover) and (pointer: fine)': { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
})
const leader = css({
  flex: '1',
  minW: '6',
  borderBottomWidth: '[1px]',
  borderStyle: 'dotted',
  borderColor: 'ink/15',
  transform: 'translateY(-4px)',
})
const meta = css({ fontFamily: 'mono', fontSize: 'xs', color: 'ink.faint', flexShrink: '0' })
const desc = css({
  gridColumn: '2',
  mt: '1',
  fontSize: 'sm',
  color: 'ink.faint',
  lineClamp: '2',
  '[data-compact] &': { display: 'none' },
  '@media (hover: hover) and (pointer: fine)': { display: 'none' },
})
const more = css({
  w: 'full',
  textAlign: 'start',
  fontFamily: 'mono',
  fontSize: 'xs',
  color: 'ink.faint',
  cursor: 'pointer',
  transition: 'colors',
  _hover: { color: 'ink' },
  _focusVisible: { color: 'ink' },
})
const empty = css({ py: '4', fontFamily: 'mono', fontSize: 'xs', color: 'ink.faint' })
const preview = css({
  position: 'fixed',
  top: '0',
  left: '0',
  zIndex: '60',
  w: '[21rem]',
  rounded: 'lg',
  overflow: 'hidden',
  boxShadow: 'lg',
  pointerEvents: 'none',
  opacity: '0',
  transitionProperty: 'opacity, scale',
  transitionDuration: 'fast',
  transitionTimingFunction: 'out',
  scale: '[0.96]',
  '&[data-open]': { opacity: '1', scale: '[1]' },
  '@media (hover: none)': { display: 'none' },
  _motionReduce: { transitionDuration: '[0s]' },
})
</script>

<template>
  <ark.nav
    v-if="parts.length"
    :class="root"
    :data-compact="compact ? '' : undefined"
    :aria-label="`${name} series`"
  >
    <ark.div :class="head">
      <ark.span :class="label">{{ name }}</ark.span>
      <ark.span :class="rule" aria-hidden="true" />
      <ark.span :class="count">{{ parts.length }} parts</ark.span>
    </ark.div>

    <ark.input
      v-if="expanded && parts.length > FILTER_FROM"
      v-model="query"
      type="search"
      :class="filter"
      placeholder="Filter by title or part number"
      :aria-label="`Filter ${name} parts`"
    />

    <ark.div ref="scroller" :class="scroll" :data-expanded="expanded ? '' : undefined">
      <ark.ol :class="list" @pointerleave="active = undefined">
        <ark.li v-for="(r, i) in rows" :key="r.kind === 'part' ? r.part.path : `more-${i}`" :class="item">
          <NuxtLink
            v-if="r.kind === 'part'"
            :to="r.part.path"
            :class="cx(rowBase, row)"
            :aria-current="r.part.current ? 'page' : undefined"
            data-part
            @pointerenter="enter($event, r.part.path)"
            @pointermove="track"
          >
            <ark.span :class="num">{{ r.part.number }}</ark.span>
            <ark.span :class="line">
              <ark.span :class="title">{{ r.part.title }}</ark.span>
              <ark.span :class="leader" aria-hidden="true" />
              <ark.span :class="meta">{{ r.part.current ? "you're here" : r.part.date }}</ark.span>
            </ark.span>
            <ark.span :class="desc">{{ r.part.description }}</ark.span>
          </NuxtLink>
          <ark.button v-else type="button" :class="cx(rowBase, more)" @click="expand">
            <ark.span aria-hidden="true">··</ark.span>
            <ark.span>+ {{ r.hidden }} more</ark.span>
          </ark.button>
        </ark.li>
      </ark.ol>
      <ark.p v-if="expanded && !rows.length" :class="empty">No part matches “{{ query }}”.</ark.p>
    </ark.div>

    <Teleport to="body">
      <ark.div
        :class="preview"
        :data-open="activePart ? '' : undefined"
        :style="{ transform: `translate(${x + 20}px, ${y + 20}px)` }"
        aria-hidden="true"
      >
        <Cover v-if="activePart" :series="name" :part="activePart.part" :total="parts.length" />
      </ark.div>
    </Teleport>
  </ark.nav>
</template>
