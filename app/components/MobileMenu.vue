<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import { css, cx } from 'styled-system/css'
import { link } from 'styled-system/recipes'

const navLink = link({ tone: 'nav' })

interface NavLink {
  to: string
  label: string
  icon: string
}

interface NavIcon {
  href: string
  icon: string
  label: string
}

const props = defineProps<{
  open: boolean
  links: NavLink[]
  icons: NavIcon[]
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const route = useRoute()

// Close on route change (a nav link was tapped).
watch(() => route.fullPath, () => emit('close'))

// Lock body scroll while the drawer is open; restore when it closes.
watch(() => props.open, (isOpen) => {
  if (import.meta.client)
    document.body.style.overflow = isOpen ? 'hidden' : ''
})

// Close on Escape.
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.open)
    emit('close')
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  if (import.meta.client)
    document.body.style.overflow = ''
})

const fade = {
  enterActive: css({ transitionProperty: 'opacity', transitionDuration: '200ms', transitionTimingFunction: 'ease-out' }),
  leaveActive: css({ transitionProperty: 'opacity', transitionDuration: '150ms', transitionTimingFunction: 'ease-in' }),
  hidden: css({ opacity: '0' }),
  shown: css({ opacity: '1' }),
}
const slide = {
  enterActive: css({ transitionProperty: 'transform', transitionDuration: '250ms', transitionTimingFunction: 'ease-out' }),
  leaveActive: css({ transitionProperty: 'transform', transitionDuration: '200ms', transitionTimingFunction: 'ease-in' }),
  out: css({ transform: 'translateX(100%)' }),
  in: css({ transform: 'translateX(0)' }),
}
const backdrop = css({ position: 'fixed', inset: '0', zIndex: '90', bg: 'black/60', display: { md: 'none' } })
const panel = css({
  position: 'fixed',
  insetY: '0',
  insetEnd: '0',
  zIndex: '100',
  w: '80',
  maxW: '85vw',
  overflowY: 'auto',
  borderStartWidth: '1px',
  borderColor: 'ink/10',
  bg: 'bg',
  display: { md: 'none' },
})
const top = css({ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: '1px', borderColor: 'ink/10', px: '5', py: '4' })
const title = css({ fontSize: 'sm', fontWeight: '500', color: 'ink' })
const closeButton = cx(navLink, css({ fontSize: 'xl' }))
const section = css({ px: '4', py: '5' })
const label = css({ px: '1', pb: '2', fontSize: 'xs', textTransform: 'uppercase', letterSpacing: 'wider', color: 'ink.faint' })
const list = css({ display: 'flex', flexDirection: 'column', gap: '0.5' })
const item = css({
  display: 'flex',
  alignItems: 'center',
  gap: '3',
  rounded: 'md',
  px: '2',
  py: '2.5',
  fontSize: 'sm',
  opacity: '0.7',
  transition: 'all',
  _hover: { bg: 'ink/5', opacity: '1' },
  '&.router-link-active': { opacity: '1', fontWeight: '500', bg: 'ink/5' },
})
const itemIcon = css({ fontSize: 'md', color: 'ink.muted' })
const external = css({ ms: 'auto', color: 'ink.faint' })
const rule = css({ mx: '4', h: '1px', bg: 'ink/10' })
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition
      :enter-active-class="fade.enterActive"
      :enter-from-class="fade.hidden"
      :enter-to-class="fade.shown"
      :leave-active-class="fade.leaveActive"
      :leave-from-class="fade.shown"
      :leave-to-class="fade.hidden"
    >
      <ark.div
        v-if="open"
        :class="backdrop"
        @click="emit('close')"
      />
    </Transition>

    <!-- Sliding drawer panel -->
    <Transition
      :enter-active-class="slide.enterActive"
      :enter-from-class="slide.out"
      :enter-to-class="slide.in"
      :leave-active-class="slide.leaveActive"
      :leave-from-class="slide.in"
      :leave-to-class="slide.out"
    >
      <ark.div
        v-if="open"
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        :class="panel"
      >
        <!-- Drawer header -->
        <ark.div :class="top">
          <ark.span :class="title">Menu</ark.span>
          <ark.button
            type="button"
            :class="closeButton"
            aria-label="Close menu"
            @click="emit('close')"
          >
            <ark.span class="i-lucide-x" aria-hidden="true" />
          </ark.button>
        </ark.div>

        <!-- Pages section -->
        <ark.div :class="section">
          <ark.p :class="label">Pages</ark.p>
          <ark.nav :class="list">
            <NuxtLink
              v-for="l in links"
              :key="l.to"
              :to="l.to"
              :class="item"
              @click="emit('close')"
            >
              <ark.span :class="[l.icon, itemIcon]" aria-hidden="true" />
              <ark.span>{{ l.label }}</ark.span>
            </NuxtLink>
          </ark.nav>
        </ark.div>

        <!-- Divider -->
        <ark.div :class="rule" />

        <!-- Elsewhere section -->
        <ark.div :class="section">
          <ark.p :class="label">Elsewhere</ark.p>
          <ark.div :class="list">
            <ark.a
              v-for="i in icons"
              :key="i.href"
              :href="i.href"
              :aria-label="i.label"
              target="_blank"
              rel="noopener"
              :class="item"
            >
              <ark.span :class="[i.icon, itemIcon]" aria-hidden="true" />
              <ark.span>{{ i.label }}</ark.span>
              <ark.span :class="['i-lucide-arrow-up-right', external]" aria-hidden="true" />
            </ark.a>
          </ark.div>
        </ark.div>
      </ark.div>
    </Transition>
  </Teleport>
</template>
