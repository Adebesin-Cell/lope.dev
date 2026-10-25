<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'

const props = defineProps<{
  icon?: string
  logo?: string
  logoLight?: string
  label: string
  href?: string
  to?: string
  // Brand tint for monochrome icons (full-colour logos ignore it).
  color?: string
}>()

const NuxtLink = resolveComponent('NuxtLink')
const tag = computed(() => (props.to ? NuxtLink : props.href ? 'a' : 'span'))
const linkAttrs = computed(() =>
  props.to
    ? { to: props.to }
    : props.href
      ? { href: props.href, target: '_blank', rel: 'noopener' }
      : {},
)
</script>

<template>
  <component :is="tag" v-bind="linkAttrs" class="chip">
    <ark.span v-if="logo || icon" class="grid place-items-center self-center w-[1.1em] h-[1.1em] shrink-0" aria-hidden="true">
      <BrandLogo v-if="logo" :src="logo" :light="logoLight" :alt="label" class="w-full h-full" />
      <ark.span v-else :class="icon" class="w-full! h-full!" :style="color ? { color } : undefined" />
    </ark.span>
    <ark.span>{{ label }}</ark.span>
  </component>
</template>
