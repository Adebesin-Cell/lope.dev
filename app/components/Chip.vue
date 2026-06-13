<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'

defineProps<{
  icon?: string
  logo?: string
  logoLight?: string
  label: string
  href?: string
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
    <BrandLogo v-if="logo" :src="logo" :light="logoLight" :alt="label" class="w-4 h-4" />
    <ark.span v-else-if="icon" :class="icon" class="text-base" />
    <ark.span>{{ label }}</ark.span>
  </ark.a>
  <ark.span v-else class="chip">
    <BrandLogo v-if="logo" :src="logo" :light="logoLight" :alt="label" class="w-4 h-4" />
    <ark.span v-else-if="icon" :class="icon" class="text-base" />
    <ark.span>{{ label }}</ark.span>
  </ark.span>
</template>
