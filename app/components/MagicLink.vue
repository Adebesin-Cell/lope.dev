<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'

defineProps<{
  label: string
  href?: string
  to?: string
  icon?: string
  logo?: string
  logoLight?: string
  color?: string
}>()

const NuxtLink = resolveComponent('NuxtLink')
</script>

<template>
  <component
    :is="to ? NuxtLink : 'a'"
    v-bind="to ? { to } : { href, target: '_blank', rel: 'noopener' }"
    class="magic-link"
  >
    <ark.span class="magic-link-icon" aria-hidden="true">
      <BrandLogo v-if="logo" :src="logo" :light="logoLight" :alt="label" class="w-full h-full" />
      <ark.span v-else-if="icon" :class="icon" class="w-full! h-full!" :style="color ? { color } : undefined" />
    </ark.span>
    <ark.span>{{ label }}</ark.span>
  </component>
</template>

<style scoped>
/* antfu-style inline magic link: favicon/icon + subtle pill, themed via ink tokens. */
.magic-link {
  display: inline-flex;
  align-items: center;
  gap: 0.3em;
  vertical-align: middle;
  padding: 0.1em 0.4em;
  margin: 0 0.05em;
  border-radius: 6px;
  line-height: 1;
  text-decoration: none !important;
  background: rgb(var(--ink) / 0.08);
  color: rgb(var(--ink) / 0.92) !important;
  transition: background-color 0.2s, color 0.2s;
}
.magic-link:hover {
  background: rgb(var(--ink) / 0.15);
  color: rgb(var(--ink)) !important;
}
.magic-link-icon {
  display: inline-grid;
  place-items: center;
  width: 1.05em;
  height: 1.05em;
  flex: none;
}
</style>
