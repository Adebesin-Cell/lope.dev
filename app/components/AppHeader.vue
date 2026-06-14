<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'

const links = [
  { to: '/blog', label: 'Blog', icon: 'i-lucide-pencil-line' },
  { to: '/projects', label: 'Projects', icon: 'i-lucide-folder-git-2' },
  { to: '/talks', label: 'Talks', icon: 'i-lucide-mic' },
  { to: '/releases', label: 'Releases', icon: 'i-lucide-git-merge' },
]

const icons = [
  { href: 'https://github.com/Adebesin-Cell', icon: 'i-simple-icons-github', label: 'GitHub' },
  { href: 'https://bsky.app/profile/lopeadebesin.bsky.social', icon: 'i-simple-icons-bluesky', label: 'Bluesky' },
  { href: 'https://x.com/I_am_Lope', icon: 'i-simple-icons-x', label: 'X' },
  { href: '/feed.xml', icon: 'i-lucide-rss', label: 'RSS' },
]

// Mobile menu state — opens a full-height slide-over drawer below md.
const open = ref(false)
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
        <ark.span class="w-px h-4 bg-ink/10" />
        <ark.a
          v-for="i in icons"
          :key="i.href"
          :href="i.href"
          :aria-label="i.label"
          target="_blank"
          rel="noopener"
          class="nav-link"
        >
          <ark.span :class="i.icon" aria-hidden="true" />
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
          aria-label="Open menu"
          @click="open = true"
        >
          <ark.span class="i-lucide-menu" aria-hidden="true" />
        </ark.button>
      </ark.div>
    </ark.div>

    <!-- Mobile slide-over drawer -->
    <MobileMenu
      :open="open"
      :links="links"
      :icons="icons"
      @close="open = false"
    />
  </ark.header>
</template>
