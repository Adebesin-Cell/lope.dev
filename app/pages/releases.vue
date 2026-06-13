<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'

useHead({ title: 'Releases — Adebesin Tolulope' })

interface MergedPR {
  org: string
  repo: string
  number: number
  title: string
  url: string
  mergedAt: string
  orgAvatar: string
  type: string
}

interface ReleasesResponse {
  prs: MergedPR[]
  total: number
}

const { data } = await useFetch<ReleasesResponse>('/api/releases')

const PER_PAGE = 20
const page = ref(1)
const allPrs = computed(() => data.value?.prs ?? [])
const totalPages = computed(() => Math.max(1, Math.ceil(allPrs.value.length / PER_PAGE)))
const pagedPrs = computed(() => allPrs.value.slice((page.value - 1) * PER_PAGE, page.value * PER_PAGE))

function go(to: number) {
  page.value = Math.min(Math.max(1, to), totalPages.value)
  if (import.meta.client)
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

function relTime(iso: string) {
  if (!iso)
    return ''
  const ms = Date.now() - new Date(iso).getTime()
  const days = Math.floor(ms / 86_400_000)
  if (days < 1)
    return 'today'
  if (days < 30)
    return `${days}d ago`
  const months = Math.floor(days / 30)
  if (months < 12)
    return `${months}mo ago`
  return `${Math.floor(months / 12)}y ago`
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
</script>

<template>
  <ark.article>
    <ark.header class="text-center mb-12">
      <ark.img
        src="https://github.com/Adebesin-Cell.png"
        alt="Adebesin Tolulope (Lope)"
        width="80"
        height="80"
        class="w-20 h-20 rounded-full mx-auto mb-5 bg-white/5 ring-1 ring-white/10"
      />
      <ark.h1 class="text-4xl font-700 tracking-tight mb-2">
        <ark.span class="font-500 text-ink-muted">Lope is</ark.span>
        Shipping…
      </ark.h1>
      <ark.p class="text-ink-muted text-sm">
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
          class="pr-row group flex items-center gap-4 py-3 px-2 -mx-2 rounded-md hover:bg-white/3 transition-colors"
        >
          <ark.img
            :src="pr.orgAvatar"
            :alt="pr.org"
            width="40"
            height="40"
            loading="lazy"
            class="w-10 h-10 rounded-lg bg-white/5 shrink-0"
          />
          <ark.div class="flex-1 min-w-0">
            <ark.div class="text-xs text-ink-muted">
              {{ pr.org }}/<ark.span class="text-ink-muted font-500">{{ pr.repo }}</ark.span>
              <ark.span class="text-ink-faint font-mono">#{{ pr.number }}</ark.span>
            </ark.div>
            <ark.div class="text-sm font-500 text-ink truncate">
              <ark.span v-if="pr.type" :class="typeColor(pr.type)" class="font-mono text-xs mr-1">{{ pr.type }}</ark.span>
              {{ cleanTitle(pr.title, pr.type) }}
            </ark.div>
          </ark.div>
          <ark.div class="text-right shrink-0 flex items-center gap-2 text-ink-faint">
            <ark.span class="i-lucide-git-merge text-emerald-400/70" />
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
        <ark.span class="i-lucide-chevron-left" />
      </ark.button>

      <ark.button
        v-for="p in totalPages"
        :key="p"
        type="button"
        class="chip min-w-8 justify-center"
        :class="p === page ? 'bg-white/15 text-ink font-600' : 'text-ink-muted'"
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
        <ark.span class="i-lucide-chevron-right" />
      </ark.button>
    </ark.nav>
  </ark.article>
</template>
