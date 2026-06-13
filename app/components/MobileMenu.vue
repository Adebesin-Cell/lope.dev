<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'

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
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition
      enter-active-class="transition-opacity duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <ark.div
        v-if="open"
        class="fixed inset-0 z-90 bg-black/60 md:hidden"
        @click="emit('close')"
      />
    </Transition>

    <!-- Sliding drawer panel -->
    <Transition
      enter-active-class="transition-transform duration-250 ease-out"
      enter-from-class="translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-200 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="translate-x-full"
    >
      <ark.div
        v-if="open"
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        class="fixed inset-y-0 right-0 z-100 w-80 max-w-[85vw] overflow-y-auto border-l border-white/10 bg-[#0a0a0a] md:hidden"
      >
        <!-- Drawer header -->
        <ark.div class="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <ark.span class="text-sm font-500 text-ink">Menu</ark.span>
          <ark.button
            type="button"
            class="nav-link text-xl"
            aria-label="Close menu"
            @click="emit('close')"
          >
            <ark.span class="i-lucide-x" />
          </ark.button>
        </ark.div>

        <!-- Pages section -->
        <ark.div class="px-4 py-5">
          <ark.p class="px-1 pb-2 text-xs uppercase tracking-wider text-ink-faint">Pages</ark.p>
          <ark.nav class="flex flex-col gap-0.5">
            <NuxtLink
              v-for="l in links"
              :key="l.to"
              :to="l.to"
              class="flex items-center gap-3 rounded-md px-2 py-2.5 text-sm op-70 transition hover:bg-white/5 hover:op-100"
              active-class="op-100 font-500 bg-white/5"
              @click="emit('close')"
            >
              <ark.span :class="l.icon" class="text-base text-ink-muted" />
              <ark.span>{{ l.label }}</ark.span>
            </NuxtLink>
          </ark.nav>
        </ark.div>

        <!-- Divider -->
        <ark.div class="mx-4 h-px bg-white/10" />

        <!-- Elsewhere section -->
        <ark.div class="px-4 py-5">
          <ark.p class="px-1 pb-2 text-xs uppercase tracking-wider text-ink-faint">Elsewhere</ark.p>
          <ark.div class="flex flex-col gap-0.5">
            <ark.a
              v-for="i in icons"
              :key="i.href"
              :href="i.href"
              :aria-label="i.label"
              target="_blank"
              rel="noopener"
              class="flex items-center gap-3 rounded-md px-2 py-2.5 text-sm op-70 transition hover:bg-white/5 hover:op-100"
            >
              <ark.span :class="i.icon" class="text-base text-ink-muted" />
              <ark.span>{{ i.label }}</ark.span>
              <ark.span class="i-lucide-arrow-up-right ml-auto text-ink-faint" />
            </ark.a>
          </ark.div>
        </ark.div>
      </ark.div>
    </Transition>
  </Teleport>
</template>
