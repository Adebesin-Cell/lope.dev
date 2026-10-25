<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import { css, cx } from 'styled-system/css'
import { link } from 'styled-system/recipes'

const navLink = link({ tone: 'nav' })

const links = [
  { to: '/blog', label: 'Blog', icon: 'i-lucide-pencil-line' },
  { to: '/projects', label: 'Projects', icon: 'i-lucide-folder-git-2' },
  { to: '/play', label: 'Play', icon: 'i-lucide-gamepad-2' },
  { to: '/talks', label: 'Talks', icon: 'i-lucide-mic' },
]

const icons = [
  { href: 'https://github.com/Adebesin-Cell', icon: 'i-simple-icons-github', label: 'GitHub' },
  { href: 'https://bsky.app/profile/lopeadebesin.bsky.social', icon: 'i-simple-icons-bluesky', label: 'Bluesky' },
  { href: 'https://x.com/I_am_Lope', icon: 'i-simple-icons-x', label: 'X' },
  { href: '/feed.xml', icon: 'i-lucide-rss', label: 'RSS' },
]

// Mobile menu state — opens a full-height slide-over drawer below md.
const open = ref(false)

const header = css({ position: 'relative', zIndex: '50' })
const logo = css({ position: { base: 'absolute', xl: 'fixed' }, m: '5', userSelect: 'none', outline: 'none' })
const nav = css({ display: 'grid', gridTemplateColumns: 'auto max-content', alignItems: 'center', w: 'full', px: '6', py: '5', boxSizing: 'border-box' })
const bar = css({ display: 'flex', alignItems: 'center', gap: '5', fontSize: 'sm' })
const desktop = css({ display: { base: 'none', md: 'flex' }, alignItems: 'center', gap: '5' })
const divider = css({ w: '[1px]', h: '4', bg: 'ink/10' })
const menuButton = cx(navLink, css({ fontSize: 'xl', display: { md: 'none' } }))
</script>

<template>
  <ark.header :class="header">
    <!-- Pinned separately from the nav, so it stays put on wide screens. -->
    <Logo :class="logo" />

    <ark.nav :class="nav">
      <ark.div />

      <ark.div :class="bar">
        <ark.div :class="desktop">
          <NuxtLink
            v-for="l in links"
            :key="l.to"
            :to="l.to"
            :class="navLink"
          >
            {{ l.label }}
          </NuxtLink>
          <ark.span :class="divider" />
          <ark.a
            v-for="i in icons"
            :key="i.href"
            :href="i.href"
            :aria-label="i.label"
            target="_blank"
            rel="noopener"
            :class="navLink"
          >
            <ark.span :class="i.icon" aria-hidden="true" />
          </ark.a>
        </ark.div>

        <ThemeToggle />

        <ark.button
          type="button"
          :class="menuButton"
          :aria-expanded="open"
          aria-controls="mobile-nav"
          aria-label="Open menu"
          @click="open = true"
        >
          <ark.span class="i-lucide-menu" aria-hidden="true" />
        </ark.button>
      </ark.div>
    </ark.nav>

    <!-- Mobile slide-over drawer -->
    <MobileMenu
      :open="open"
      :links="links"
      :icons="icons"
      @close="open = false"
    />
  </ark.header>
</template>
