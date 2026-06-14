<script setup lang="ts">
import type { NuxtError } from '#app'
import { ark } from '@ark-ui/vue/factory'

const props = defineProps<{ error: NuxtError }>()

// On a thrown SSR error the page renders at an internal route, so the request
// URL no longer reflects where the user actually was — the error carries it.
const requestUrl = useRequestURL()
const path = computed(() => {
  const raw = (props.error as NuxtError & { url?: string }).url || requestUrl.pathname
  try {
    return new URL(raw, requestUrl.origin).pathname
  }
  catch {
    return raw
  }
})
const isBlog = computed(() => path.value.startsWith('/blog'))
const is404 = computed(() => props.error.statusCode === 404)
const code = computed(() => props.error.statusCode || 500)

const heading = computed(() => {
  if (!is404.value)
    return 'Something broke'
  return isBlog.value ? 'This post went unpublished' : 'Page not found'
})

const blurb = computed(() => {
  if (!is404.value)
    return props.error.statusMessage || 'An unexpected error got in the way. Try again in a moment.'
  return isBlog.value
    ? "That piece either never made it out of drafts or moved somewhere else. The rest of the writing is still up, though."
    : "The page you're after doesn't exist — maybe it moved, maybe the link is stale. Let's get you back on track."
})

useSeoMeta({
  title: () => `${code.value} — Lope`,
  robots: 'noindex',
})

function go(path: string) {
  clearError({ redirect: path })
}
</script>

<template>
  <NuxtLayout>
    <ark.article class="slide-enter-content">
      <ark.div class="relative">
        <ark.div
          class="absolute -top-10 md:-top-16 -start-2 md:-start-6 text-[7rem] sm:text-[10rem] md:text-[13rem] font-700 op-5 select-none pointer-events-none tracking-tight leading-none"
          aria-hidden="true"
        >
          {{ code }}
        </ark.div>

        <ark.div class="relative pt-20 md:pt-28 space-y-5">
          <ark.h1 class="text-3xl md:text-4xl font-700 tracking-tight">
            {{ heading }}
          </ark.h1>

          <ark.p class="text-base text-ink-muted leading-relaxed max-w-prose">
            {{ blurb }}
          </ark.p>

          <ark.div class="flex flex-wrap items-center gap-3 pt-2">
            <ark.button
              type="button"
              class="btn btn-solid inline-flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-500 transition"
              @click="go('/')"
            >
              <ark.span class="i-lucide-arrow-left" aria-hidden="true" />
              Back home
            </ark.button>

            <ark.button
              v-if="isBlog"
              type="button"
              class="btn btn-ghost inline-flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-500 transition"
              @click="go('/blog')"
            >
              <ark.span class="i-lucide-pen-line" aria-hidden="true" />
              Browse the blog
            </ark.button>
            <template v-else>
              <ark.button
                type="button"
                class="btn btn-ghost inline-flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-500 transition"
                @click="go('/projects')"
              >
                <ark.span class="i-lucide-box" aria-hidden="true" />
                Projects
              </ark.button>
              <ark.button
                type="button"
                class="btn btn-ghost inline-flex items-center gap-1.5 rounded-md px-4 py-2 text-sm font-500 transition"
                @click="go('/blog')"
              >
                <ark.span class="i-lucide-pen-line" aria-hidden="true" />
                Blog
              </ark.button>
            </template>
          </ark.div>
        </ark.div>
      </ark.div>
    </ark.article>
  </NuxtLayout>
</template>
