<script setup lang="ts">
import type { NuxtError } from '#app'
import { ark } from '@ark-ui/vue/factory'
import { css } from 'styled-system/css'
import { button } from 'styled-system/recipes'

const props = defineProps<{ error: NuxtError }>()

// On a thrown SSR error the page renders at an internal route, so the request
// URL no longer reflects where the user actually was — the error carries it.
const requestUrl = useRequestURL()
const path = computed(() => {
  const raw = (props.error as NuxtError & { url?: string }).url || requestUrl.pathname
  try {
    return new URL(raw, requestUrl.origin).pathname
  } catch {
    return raw
  }
})
const isBlog = computed(() => path.value.startsWith('/blog'))
const is404 = computed(() => props.error.statusCode === 404)
const code = computed(() => props.error.statusCode || 500)

const heading = computed(() => {
  if (!is404.value) return 'Something broke'
  return isBlog.value ? 'This post went unpublished' : 'Page not found'
})

const blurb = computed(() => {
  if (!is404.value) return props.error.statusMessage || 'An unexpected error got in the way. Try again in a moment.'
  return isBlog.value
    ? 'That piece either never made it out of drafts or moved somewhere else. The rest of the writing is still up, though.'
    : "The page you're after doesn't exist — maybe it moved, maybe the link is stale. Let's get you back on track."
})

useSeoMeta({
  title: () => `${code.value} — Lope`,
  robots: 'noindex',
})

function go(to: string) {
  clearError({ redirect: to })
}

const relative = css({ position: 'relative' })
const codeMark = css({
  position: 'absolute',
  top: { base: '-10', md: '-16' },
  insetStart: { base: '-2', md: '-6' },
  fontSize: { base: '[7rem]', sm: '[10rem]', md: '[13rem]' },
  fontWeight: 'bold',
  opacity: '0.05',
  _before: { content: 'attr(data-text)' },
  userSelect: 'none',
  pointerEvents: 'none',
  letterSpacing: 'tight',
  lineHeight: 'none',
})
const body = css({ position: 'relative', pt: { base: '20', md: '28' }, '& > * + *': { mt: '5' } })
const title = css({ fontSize: { base: '3xl', md: '4xl' }, fontWeight: 'bold', letterSpacing: 'tight' })
const blurbStyle = css({ fontSize: 'md', color: 'ink.muted', lineHeight: 'relaxed', maxW: 'prose' })
const actions = css({ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '3', pt: '2' })
const solid = button({ variant: 'solid' })
const ghost = button()
</script>

<template>
  <NuxtLayout>
    <ark.article class="slide-enter-content">
      <ark.div :class="relative">
        <ark.div :class="codeMark" :data-text="code" aria-hidden="true" />

        <ark.div :class="body">
          <ark.h1 :class="title">
            {{ heading }}
          </ark.h1>

          <ark.p :class="blurbStyle">
            {{ blurb }}
          </ark.p>

          <ark.div :class="actions">
            <ark.button type="button" :class="solid" @click="go('/')">
              <ark.span class="i-lucide-arrow-left" aria-hidden="true" />
              Back home
            </ark.button>

            <ark.button v-if="isBlog" type="button" :class="ghost" @click="go('/blog')">
              <ark.span class="i-lucide-pen-line" aria-hidden="true" />
              Browse the blog
            </ark.button>
            <template v-else>
              <ark.button type="button" :class="ghost" @click="go('/projects')">
                <ark.span class="i-lucide-box" aria-hidden="true" />
                Projects
              </ark.button>
              <ark.button type="button" :class="ghost" @click="go('/blog')">
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
