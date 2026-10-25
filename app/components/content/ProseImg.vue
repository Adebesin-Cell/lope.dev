<script setup lang="ts">
defineOptions({ inheritAttrs: false })

const props = defineProps<{
  src?: string
  alt?: string
  width?: string | number
  height?: string | number
}>()

const attrs = useAttrs()

const optimizable = computed(() => {
  const src = props.src ?? ''
  return src.startsWith('/') && /\.(?:jpe?g|png)$/i.test(src)
})

const loading = computed(() => (attrs.loading === 'eager' ? 'eager' : 'lazy'))

const priority = computed(() => {
  const value = attrs.fetchpriority
  return value === 'high' || value === 'low' || value === 'auto' ? value : undefined
})

const passthrough = computed(() => {
  const rest = { ...attrs }
  delete rest.loading
  delete rest.fetchpriority
  return rest
})
</script>

<template>
  <NuxtPicture
    v-if="optimizable"
    v-bind="passthrough"
    :src="props.src"
    :alt="props.alt"
    :width="props.width"
    :height="props.height"
    sizes="sm:100vw md:700px"
    :img-attrs="{ fetchpriority: priority }"
    :loading="loading"
    decoding="async"
  />
  <img
    v-else
    v-bind="passthrough"
    :src="props.src"
    :alt="props.alt"
    :width="props.width"
    :height="props.height"
    :fetchpriority="priority"
    :loading="loading"
    decoding="async"
  >
</template>
