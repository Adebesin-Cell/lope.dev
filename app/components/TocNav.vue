<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import { css } from 'styled-system/css'

interface TocItem {
  id: string
  text: string
}

const route = useRoute()
const items = ref<TocItem[]>([])
const activeId = ref('')
let observer: IntersectionObserver | null = null

// Build the table of contents from whatever the current page exposes:
// explicit [data-toc] markers (project/blog sections) or prose headings.
function collect() {
  const main = document.querySelector('main')
  if (!main) {
    items.value = []
    return
  }

  const els = Array.from(main.querySelectorAll<HTMLElement>('[data-toc][id], .prose-content :where(h2, h3)[id]'))

  items.value = els
    .map((el) => ({ id: el.id, text: el.dataset.toc || el.textContent?.trim() || '' }))
    .filter((i) => i.id && i.text)

  observer?.disconnect()
  if (!els.length) return

  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) activeId.value = (e.target as HTMLElement).id
      }
    },
    { rootMargin: '-10% 0px -75% 0px' },
  )
  els.forEach((el) => observer!.observe(el))
}

onMounted(() => nextTick(collect))
watch(
  () => route.fullPath,
  () => nextTick(collect),
)
onBeforeUnmount(() => observer?.disconnect())

const nav = css({ position: 'fixed', insetStart: '5', top: '24', zIndex: '40', display: { base: 'none', lg: 'block' } })
const trigger = css({ display: 'grid', placeItems: 'center', w: '9', h: '9', color: 'ink.muted' })
const triggerIcon = css({ fontSize: 'lg' })
const panel = css({
  position: 'absolute',
  insetStart: '0',
  top: '[100%]',
  minW: '48',
  maxW: '64',
  maxH: '[70vh]',
  overflow: 'auto',
  pt: '3',
  pe: '4',
})
const link = css({
  display: 'block',
  truncate: true,
  py: '1',
  fontSize: 'sm',
  color: 'ink.faint',
  transition: 'colors',
  _hover: { color: 'ink' },
})
const current = css({ color: 'ink', fontWeight: 'medium' })
</script>

<template>
  <ClientOnly>
    <ark.nav v-if="items.length" :class="['toc-nav', nav]" aria-label="On this page">
      <ark.button type="button" :class="['toc-trigger', trigger]" aria-label="On this page">
        <ark.span :class="['i-lucide-menu', triggerIcon]" />
      </ark.button>

      <ark.ul :class="['toc-panel', panel]">
        <ark.li v-for="i in items" :key="i.id">
          <ark.a
            :href="`#${i.id}`"
            :class="[link, activeId === i.id && current]"
            :aria-current="activeId === i.id ? 'true' : undefined"
          >
            {{ i.text }}
          </ark.a>
        </ark.li>
      </ark.ul>
    </ark.nav>
  </ClientOnly>
</template>

<style scoped>
/* antfu-style: borderless, faint hamburger that brightens on hover/focus while
   the section list reveals directly beneath it. */
.toc-trigger {
  opacity: 0.35;
  transition: opacity 0.2s ease;
}
.toc-nav:hover .toc-trigger,
.toc-nav:focus-within .toc-trigger {
  opacity: 1;
}

.toc-panel {
  opacity: 0;
  transform: translateX(-6px);
  pointer-events: none;
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}
.toc-nav:hover .toc-panel,
.toc-nav:focus-within .toc-panel {
  opacity: 1;
  transform: none;
  pointer-events: auto;
}

@media (prefers-reduced-motion: reduce) {
  .toc-trigger,
  .toc-panel {
    transition: opacity 0.2s ease;
    transform: none;
  }
}
</style>
