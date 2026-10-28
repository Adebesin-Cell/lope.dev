<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import { css } from 'styled-system/css'

const route = useRoute()
const router = useRouter()
const parent = computed(() => route.path.replace(/\/$/, '').replace(/\/[^/]*$/, '') || '/')

function goBack(event: MouseEvent) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
  event.preventDefault()
  if (window.history.state?.back) router.back()
  else router.push(parent.value)
}

const wrap = css({ mt: '10', fontFamily: 'mono', fontSize: 'sm' })
const dim = css({ opacity: '0.5' })
const link = css({ opacity: '0.5', transition: 'opacity', _hover: { opacity: '0.75' } })
</script>

<template>
  <ark.p v-if="route.path !== '/'" :class="wrap">
    <ark.span :class="dim">&gt; </ark.span>
    <NuxtLink v-slot="{ href }" :to="parent" custom>
      <ark.a :href="href ?? parent" :class="link" @click="goBack"> cd .. </ark.a>
    </NuxtLink>
  </ark.p>
</template>
