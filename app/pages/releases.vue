<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import { css } from 'styled-system/css'
import { chip } from 'styled-system/recipes'

usePageSeo({
  title: 'Releases — Adebesin Tolulope',
  description: 'Recent open-source pull requests Lope has merged across the projects he works on.',
})

interface MergedPR {
  org: string
  repo: string
  number: number
  title: string
  url: string
  mergedAt: string
  orgAvatar: string
  type: string
  stars: number
}

interface ReleasesResponse {
  prs: MergedPR[]
  total: number
}

const { data, pending } = useFetch<ReleasesResponse>('/api/releases', { lazy: true })

const PER_PAGE = 20
const route = useRoute()
const router = useRouter()
const allPrs = computed(() => data.value?.prs ?? [])
const totalPages = computed(() => Math.max(1, Math.ceil(allPrs.value.length / PER_PAGE)))

// Page lives in the URL (?page=) so it's shareable and back/forward navigable.
const page = computed(() => {
  const n = Number.parseInt(String(route.query.page ?? '1'), 10)
  if (!Number.isFinite(n) || n < 1) return 1
  return Math.min(n, totalPages.value)
})
const pagedPrs = computed(() => allPrs.value.slice((page.value - 1) * PER_PAGE, page.value * PER_PAGE))
const pageItems = computed(() => {
  const keep = (p: number) => p === 1 || p === totalPages.value || Math.abs(p - page.value) <= 1
  const pages = Array.from({ length: totalPages.value }, (_, i) => i + 1).filter(keep)
  return pages.flatMap((p, i) => (i > 0 && p - pages[i - 1]! > 1 ? (['gap', p] as const) : [p]))
})

function go(to: number) {
  const next = Math.min(Math.max(1, to), totalPages.value)
  router.push({ query: { ...route.query, page: next === 1 ? undefined : next } })
  if (import.meta.client) window.scrollTo({ top: 0, behavior: 'smooth' })
}

const MS_PER_DAY = 86_400_000
const DAYS_PER_MONTH = 30
const MONTHS_PER_YEAR = 12

function relTime(iso: string) {
  if (!iso) return ''
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / MS_PER_DAY)
  if (days < 1) return 'today'
  if (days < DAYS_PER_MONTH) return `${days}d ago`
  const months = Math.floor(days / DAYS_PER_MONTH)
  if (months < MONTHS_PER_YEAR) return `${months}mo ago`
  return `${Math.floor(months / MONTHS_PER_YEAR)}y ago`
}

const TYPE_COLOR: Record<string, string> = {
  feat: css({ color: 'emerald.400' }),
  fix: css({ color: 'rose.400' }),
  perf: css({ color: 'violet.400' }),
  refactor: css({ color: 'amber.400' }),
  docs: css({ color: 'sky.400' }),
  release: css({ color: 'emerald.400' }),
}
function typeColor(type: string) {
  return TYPE_COLOR[type] ?? css({ color: 'ink.faint' })
}

function cleanTitle(title: string, type: string) {
  return type ? title.replace(/^\w+(?:\([^)]*\))?!?:\s*/, '') : title
}

const starFormatter = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 })
function formatStars(n: number) {
  return starFormatter.format(n)
}

const header = css({ mb: '10' })
const avatar = css({
  w: '20',
  h: '20',
  rounded: 'full',
  mb: '5',
  bg: 'ink/5',
  outline: '[1px solid]',
  outlineColor: 'ink/10',
})
const title = css({ textStyle: 'display', mb: '3' })
const shipping = css({
  color: 'ink.muted',
  animation: 'shipping',
  _motionReduce: { animation: '[none]', opacity: '1' },
})
const lead = css({ color: 'ink.muted' })
const empty = css({ textAlign: 'center', color: 'ink.muted', fontSize: 'sm', fontStyle: 'italic' })
const list = css({ '& > * + *': { mt: '1' } })
const prRow = css({
  display: 'flex',
  alignItems: 'center',
  gap: '4',
  p: '3',
  mx: '-3',
  rounded: 'lg',
  transition: 'colors',
  _hover: { bg: 'ink/3' },
})
const orgAvatar = css({ w: '10', h: '10', rounded: 'lg', bg: 'ink/5', objectFit: 'cover', flexShrink: '0' })
const body = css({ flex: '1', minW: '0' })
const repoLine = css({ fontSize: 'xs', color: 'ink.muted', display: 'flex', alignItems: 'center', gap: '1.5' })
const medium = css({ fontWeight: 'medium' })
const number = css({ color: 'ink.faint', fontFamily: 'mono' })
const stars = css({ color: 'ink.faint', display: 'inline-flex', alignItems: 'center', gap: '0.5' })
const prTitle = css({ fontSize: 'sm', fontWeight: 'medium', color: 'ink', truncate: true })
const typeTag = css({ fontFamily: 'mono', fontSize: 'xs', me: '1' })
const when = css({
  textAlign: 'end',
  flexShrink: '0',
  display: 'flex',
  alignItems: 'center',
  gap: '2',
  color: 'ink.faint',
})
const merged = css({ color: 'emerald.400/70' })
const xs = css({ fontSize: 'xs' })
const gap = css({ px: '1', color: 'ink.faint' })
const pager = css({
  mt: '10',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1.5',
  fontSize: 'sm',
})
const chipClass = chip()
const pageEdge = css({ _disabled: { opacity: '0.3', pointerEvents: 'none' } })
const pageNumber = css({ minW: '8', justifyContent: 'center' })
const currentPage = css({ bg: 'ink/15', color: 'ink', fontWeight: 'semibold' })
const otherPage = css({ color: 'ink.muted' })
</script>

<template>
  <ark.article class="slide-enter-content">
    <ark.header :class="header">
      <SubNav />
      <ark.img
        src="https://github.com/Adebesin-Cell.png"
        alt="Adebesin Tolulope (Lope)"
        width="80"
        height="80"
        :class="avatar"
      />
      <ark.h1 :class="title"> Lope is <ark.span :class="shipping">Shipping…</ark.span> </ark.h1>
      <ark.p :class="lead"> Recent open-source pull requests I've merged, across the projects I work on. </ark.p>
    </ark.header>

    <ark.p v-if="pending && !data" role="status" :class="empty">Fetching pull requests…</ark.p>
    <ark.div v-else-if="!data?.prs?.length" :class="empty">
      No pull requests to show yet — or GitHub is rate-limiting. Try again in a bit.
    </ark.div>

    <ark.ul :class="list">
      <ark.li v-for="pr in pagedPrs" :key="pr.url">
        <ark.a :href="pr.url" target="_blank" rel="noopener" :class="['pr-row group', prRow]">
          <ark.img :src="pr.orgAvatar" :alt="pr.org" width="40" height="40" loading="lazy" :class="orgAvatar" />
          <ark.div :class="body">
            <ark.div :class="repoLine">
              <ark.span
                >{{ pr.org }}/<ark.span :class="medium">{{ pr.repo }}</ark.span></ark.span
              >
              <ark.span :class="number">#{{ pr.number }}</ark.span>
              <ark.span v-if="pr.stars" :class="stars">
                <ark.span class="i-lucide-star" aria-hidden="true" />{{ formatStars(pr.stars) }}
              </ark.span>
            </ark.div>
            <ark.div :class="prTitle">
              <ark.span v-if="pr.type" :class="[typeColor(pr.type), typeTag]">{{ pr.type }}</ark.span>
              {{ cleanTitle(pr.title, pr.type) }}
            </ark.div>
          </ark.div>
          <ark.div :class="when">
            <ark.span :class="['i-lucide-git-merge', merged]" aria-label="merged" role="img" />
            <ark.span :class="xs">{{ relTime(pr.mergedAt) }}</ark.span>
          </ark.div>
        </ark.a>
      </ark.li>
    </ark.ul>

    <ark.nav v-if="totalPages > 1" :class="pager" aria-label="Pagination">
      <ark.button
        type="button"
        :class="[chipClass, pageEdge]"
        :disabled="page <= 1"
        aria-label="Previous page"
        @click="go(page - 1)"
      >
        <ark.span class="i-lucide-chevron-left" aria-hidden="true" />
      </ark.button>

      <template v-for="(p, i) in pageItems" :key="`${p}-${i}`">
        <ark.span v-if="p === 'gap'" :class="gap" aria-hidden="true">…</ark.span>
        <ark.button
          v-else
          type="button"
          :class="[chipClass, pageNumber, p === page ? currentPage : otherPage]"
          :aria-current="p === page ? 'page' : undefined"
          :aria-label="`Page ${p}`"
          @click="go(p)"
        >
          {{ p }}
        </ark.button>
      </template>

      <ark.button
        type="button"
        :class="[chipClass, pageEdge]"
        :disabled="page >= totalPages"
        aria-label="Next page"
        @click="go(page + 1)"
      >
        <ark.span class="i-lucide-chevron-right" aria-hidden="true" />
      </ark.button>
    </ark.nav>
  </ark.article>
</template>
