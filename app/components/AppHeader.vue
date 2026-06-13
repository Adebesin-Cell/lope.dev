<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'

const links = [
  { to: '/blog', label: 'Blog' },
  { to: '/projects', label: 'Projects' },
  { to: '/talks', label: 'Talks' },
  { to: '/releases', label: 'Releases' },
]

const icons = [
  { href: 'https://github.com/Adebesin-Cell', icon: 'i-simple-icons-github', label: 'GitHub' },
  { href: 'https://bsky.app/profile/lopeadebesin.bsky.social', icon: 'i-simple-icons-bluesky', label: 'Bluesky' },
  { href: 'https://x.com/I_am_Lope', icon: 'i-simple-icons-x', label: 'X' },
  { href: '/feed.xml', icon: 'i-lucide-rss', label: 'RSS' },
]

// Mobile menu state — collapses the nav into a togglable panel below md.
const open = ref(false)
const route = useRoute()
// Close the panel whenever the route changes (a nav link was tapped).
watch(() => route.fullPath, () => { open.value = false })
</script>

<template>
  <ark.header class="fixed inset-x-0 top-0 z-50 px-6 py-5">
    <ark.div class="flex items-center justify-between">
      <Logo />

      <!-- Desktop: keep the original inline layout exactly -->
      <ark.nav class="hidden md:flex items-center gap-5 text-sm">
        <NuxtLink
          v-for="l in links"
          :key="l.to"
          :to="l.to"
          class="nav-link"
          active-class="op-100 font-500"
        >
          {{ l.label }}
        </NuxtLink>
        <ark.span class="w-px h-4 bg-white/10" />
        <ark.a
          v-for="i in icons"
          :key="i.href"
          :href="i.href"
          :aria-label="i.label"
          target="_blank"
          rel="noopener"
          class="nav-link"
        >
          <ark.span :class="i.icon" />
        </ark.a>
        <ThemeToggle />
      </ark.nav>

      <!-- Mobile: theme toggle + hamburger trigger -->
      <ark.div class="flex md:hidden items-center gap-4 text-sm">
        <ThemeToggle />
        <ark.button
          type="button"
          class="nav-link text-xl"
          :aria-expanded="open"
          aria-controls="mobile-nav"
          aria-label="Toggle menu"
          @click="open = !open"
        >
          <ark.span :class="open ? 'i-lucide-x' : 'i-lucide-menu'" />
        </ark.button>
      </ark.div>
    </ark.div>

    <!-- Mobile collapsible panel -->
    <ark.nav
      v-show="open"
      id="mobile-nav"
      class="md:hidden mt-4 flex flex-col gap-1 rounded-xl border border-white/10 bg-bg/95 backdrop-blur p-3 text-sm"
    >
      <NuxtLink
        v-for="l in links"
        :key="l.to"
        :to="l.to"
        class="nav-link py-2 px-1 rounded-md"
        active-class="op-100 font-500"
      >
        {{ l.label }}
      </NuxtLink>
      <ark.span class="my-1 h-px w-full bg-white/10" />
      <ark.div class="flex items-center gap-5 py-2 px-1 text-lg">
        <ark.a
          v-for="i in icons"
          :key="i.href"
          :href="i.href"
          :aria-label="i.label"
          target="_blank"
          rel="noopener"
          class="nav-link"
        >
          <ark.span :class="i.icon" />
        </ark.a>
      </ark.div>
    </ark.nav>
  </ark.header>
</template>
