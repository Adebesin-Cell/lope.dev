<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'

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

  const els = Array.from(
    main.querySelectorAll<HTMLElement>('[data-toc][id], .prose-content :where(h2, h3)[id]'),
  )

  items.value = els
    .map(el => ({ id: el.id, text: el.dataset.toc || el.textContent?.trim() || '' }))
    .filter(i => i.id && i.text)

  observer?.disconnect()
  if (!els.length)
    return

  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting)
          activeId.value = (e.target as HTMLElement).id
      }
    },
    { rootMargin: '-10% 0px -75% 0px' },
  )
  els.forEach(el => observer!.observe(el))
}

onMounted(() => nextTick(collect))
watch(() => route.fullPath, () => nextTick(collect))
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <ClientOnly>
    <ark.nav
      v-if="items.length"
      class="toc-nav fixed start-5 top-24 z-40 hidden lg:block"
      aria-label="On this page"
    >
      <ark.button
        type="button"
        class="toc-trigger grid place-items-center w-9 h-9 text-ink-muted"
        aria-label="On this page"
      >
        <ark.span class="i-lucide-menu text-lg" />
      </ark.button>

      <ark.ul class="toc-panel absolute start-0 top-full min-w-48 max-w-64 max-h-[70vh] overflow-auto pt-3 pe-4">
        <ark.li v-for="i in items" :key="i.id">
          <ark.a
            :href="`#${i.id}`"
            class="block truncate py-1 text-sm text-ink-faint hover:text-ink transition-colors"
            :class="{ 'text-ink font-500': activeId === i.id }"
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
