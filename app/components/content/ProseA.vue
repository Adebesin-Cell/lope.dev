<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const props = defineProps<{ href?: string }>()

const attrs = useAttrs()

const external = computed(() => /^(https?:)?\/\//.test(props.href ?? ''))

const route = computed(() => {
  const href = props.href ?? ''
  return href.startsWith('/') && !/\.[a-z0-9]+(?:[?#]|$)/i.test(href)
})

const rel = computed(() => {
  const current = Array.isArray(attrs.rel) ? attrs.rel : String(attrs.rel ?? '').split(' ')
  const merged = external.value ? [...current, 'noopener', 'noreferrer'] : current
  const cleaned = [...new Set(merged.filter(Boolean))].join(' ')
  return cleaned || undefined
})
</script>

<template>
  <NuxtLink v-if="route" v-bind="attrs" :to="props.href">
    <slot />
  </NuxtLink>
  <a
    v-else
    v-bind="attrs"
    :href="props.href"
    :target="external ? '_blank' : undefined"
    :rel="rel"
  >
    <slot />
  </a>
</template>
