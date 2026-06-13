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
</script>

<template>
  <ark.header class="fixed inset-x-0 top-0 z-50 px-6 py-5 flex items-center justify-between">
    <Logo />
    <ark.nav class="flex items-center gap-5 text-sm">
      <NuxtLink
        v-for="l in links"
        :key="l.to"
        :to="l.to"
        class="nav-link"
        active-class="op-100 font-500"
      >
        {{ l.label }}
      </NuxtLink>
      <ark.span class="hidden md:inline w-px h-4 bg-white/10" />
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
  </ark.header>
</template>
