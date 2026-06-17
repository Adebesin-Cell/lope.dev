<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'

const props = withDefaults(defineProps<{ user?: string, domain?: string }>(), {
  user: 'lope',
  domain: 'braindao.org',
})

const href = ref('#')
onMounted(() => {
  href.value = `mailto:${props.user}@${props.domain}`
})
</script>

<template>
  <ark.a :href="href" class="font-mono underline" @click="!href.startsWith('mailto:') && $event.preventDefault()">
    <slot>email</slot>
  </ark.a>
</template>
