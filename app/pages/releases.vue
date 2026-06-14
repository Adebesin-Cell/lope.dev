<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'

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

const { data } = await useFetch<ReleasesResponse>('/api/releases')

const PER_PAGE = 20
const route = useRoute()
const router = useRouter()
const allPrs = computed(() => data.value?.prs ?? [])
const totalPages = computed(() => Math.max(1, Math.ceil(allPrs.value.length / PER_PAGE)))

// Page lives in the URL (?page=) so it's shareable and back/forward navigable.
const page = computed(() => {
  const n = Number.parseInt(String(route.query.page ?? '1'), 10)
  if (!Number.isFinite(n) || n < 1)
    return 1
  return Math.min(n, totalPages.value)
})
const pagedPrs = computed(() => allPrs.value.slice((page.value - 1) * PER_PAGE, page.value * PER_PAGE))

function go(to: number) {
  const next = Math.min(Math.max(1, to), totalPages.value)
  router.push({ query: { ...route.query, page: next === 1 ? undefined : next } })
  if (import.meta.client)
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

const MS_PER_DAY = 86_400_000
const DAYS_PER_MONTH = 30
const MONTHS_PER_YEAR = 12

function relTime(iso: string) {
  if (!iso)
    return ''
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / MS_PER_DAY)
  if (days < 1)
    return 'today'
  if (days < DAYS_PER_MONTH)
    return `${days}d ago`
  const months = Math.floor(days / DAYS_PER_MONTH)
  if (months < MONTHS_PER_YEAR)
    return `${months}mo ago`
  return `${Math.floor(months / MONTHS_PER_YEAR)}y ago`
}


const TYPE_COLOR: Record<string, string> = {
  feat: 'text-emerald-400',
  fix: 'text-rose-400',
  perf: 'text-violet-400',
  refactor: 'text-amber-400',
  docs: 'text-sky-400',
  release: 'text-emerald-400',
}
function typeColor(type: string) {
  return TYPE_COLOR[type] ?? 'text-ink-faint'
}

function cleanTitle(title: string, type: string) {
  return type ? title.replace(/^\w+(?:\([^)]*\))?!?:\s*/, '') : title
}

const starFormatter = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 })
function formatStars(n: number) {
  return starFormatter.format(n)
}
</script>

<template>
  <ark.article class="slide-enter-content">
    <ark.header class="text-center mb-12">
      <ark.img
        src="https://github.com/Adebesin-Cell.png"
        alt="Adebesin Tolulope (Lope)"
        width="80"
        height="80"
        class="w-20 h-20 rounded-full mx-auto mb-5 bg-ink/5 ring-1 ring-ink/10"
      />
      <ark.h1 class="text-4xl font-700 tracking-tight mb-3">
        Lope is <ark.span class="shipping text-ink-muted">Shipping…</ark.span>
      </ark.h1>
      <ark.p class="text-ink-muted">
        Recent open-source pull requests I've merged, across the projects I work on.
      </ark.p>
    </ark.header>

    <ark.div v-if="!data?.prs?.length" class="text-center text-ink-muted text-sm italic">
      No pull requests to show yet — or GitHub is rate-limiting. Try again in a bit.
    </ark.div>

    <ark.ul class="space-y-1">
      <ark.li v-for="pr in pagedPrs" :key="pr.url">
        <ark.a
          :href="pr.url"
          target="_blank"
          rel="noopener"
          class="pr-row group flex items-center gap-4 py-3 px-3 -mx-3 rounded-lg hover:bg-ink/3 transition-colors"
        >
          <ark.img
            :src="pr.orgAvatar"
            :alt="pr.org"
            width="40"
            height="40"
            loading="lazy"
            class="w-10 h-10 rounded-lg bg-ink/5 object-cover shrink-0"
          />
          <ark.div class="flex-1 min-w-0">
            <ark.div class="text-xs text-ink-muted flex items-center gap-1.5">
              <ark.span>{{ pr.org }}/<ark.span class="font-500">{{ pr.repo }}</ark.span></ark.span>
              <ark.span class="text-ink-faint font-mono">#{{ pr.number }}</ark.span>
              <ark.span v-if="pr.stars" class="text-ink-faint inline-flex items-center gap-0.5">
                <ark.span class="i-lucide-star" aria-hidden="true" />{{ formatStars(pr.stars) }}
              </ark.span>
            </ark.div>
            <ark.div class="text-sm font-500 text-ink truncate">
              <ark.span v-if="pr.type" :class="typeColor(pr.type)" class="font-mono text-xs me-1">{{ pr.type }}</ark.span>
              {{ cleanTitle(pr.title, pr.type) }}
            </ark.div>
          </ark.div>
          <ark.div class="text-end shrink-0 flex items-center gap-2 text-ink-faint">
            <ark.span class="i-lucide-git-merge text-emerald-400/70" aria-label="merged" role="img" />
            <ark.span class="text-xs">{{ relTime(pr.mergedAt) }}</ark.span>
          </ark.div>
        </ark.a>
      </ark.li>
    </ark.ul>

    <ark.nav
      v-if="totalPages > 1"
      class="mt-10 flex flex-wrap items-center justify-center gap-1.5 text-sm"
      aria-label="Pagination"
    >
      <ark.button
        type="button"
        class="chip disabled:op-30 disabled:pointer-events-none"
        :disabled="page <= 1"
        aria-label="Previous page"
        @click="go(page - 1)"
      >
        <ark.span class="i-lucide-chevron-left" aria-hidden="true" />
      </ark.button>

      <ark.button
        v-for="p in totalPages"
        :key="p"
        type="button"
        class="chip min-w-8 justify-center"
        :class="p === page ? 'bg-ink/15 text-ink font-600' : 'text-ink-muted'"
        :aria-current="p === page ? 'page' : undefined"
        :aria-label="`Page ${p}`"
        @click="go(p)"
      >
        {{ p }}
      </ark.button>

      <ark.button
        type="button"
        class="chip disabled:op-30 disabled:pointer-events-none"
        :disabled="page >= totalPages"
        aria-label="Next page"
        @click="go(page + 1)"
      >
        <ark.span class="i-lucide-chevron-right" aria-hidden="true" />
      </ark.button>
    </ark.nav>
  </ark.article>
</template>

<style scoped>
.shipping {
  animation: ship-pulse 2.4s ease-in-out infinite;
}
@keyframes ship-pulse {
  0%,
  100% {
    opacity: 0.4;
  }
  50% {
    opacity: 1;
  }
}
@media (prefers-reduced-motion: reduce) {
  .shipping {
    animation: none;
    opacity: 1;
  }
}
</style>
