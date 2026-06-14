<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'

defineProps<{
  icon?: string
  logo?: string
  logoLight?: string
  label: string
  href?: string
  // Brand tint for monochrome icons (full-colour logos ignore it).
  color?: string
}>()
</script>

<template>
  <ark.a
    v-if="href"
    :href="href"
    target="_blank"
    rel="noopener"
    class="chip"
  >
    <ark.span class="grid place-items-center w-[18px] h-[18px] shrink-0" aria-hidden="true">
      <BrandLogo v-if="logo" :src="logo" :light="logoLight" :alt="label" class="w-full h-full" />
      <ark.span v-else-if="icon" :class="icon" class="w-full! h-full!" :style="color ? { color } : undefined" />
    </ark.span>
    <ark.span>{{ label }}</ark.span>
  </ark.a>
  <ark.span v-else class="chip">
    <ark.span class="grid place-items-center w-[18px] h-[18px] shrink-0" aria-hidden="true">
      <BrandLogo v-if="logo" :src="logo" :light="logoLight" :alt="label" class="w-full h-full" />
      <ark.span v-else-if="icon" :class="icon" class="w-full! h-full!" :style="color ? { color } : undefined" />
    </ark.span>
    <ark.span>{{ label }}</ark.span>
  </ark.span>
</template>
