<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import type { Talk } from '~~/shared/data/talks'

defineProps<{ talk: Talk }>()
</script>

<template>
  <ark.a
    :href="talk.href"
    target="_blank"
    rel="noopener"
    class="group flex flex-col gap-3 p-5 rounded-xl border border-ink/10 transition-colors hover:border-ink/25 hover:bg-ink/2"
  >
    <ark.div class="flex items-center gap-3">
      <ark.div class="w-9 h-9 shrink-0 rounded-lg overflow-hidden">
        <ark.img
          :src="talk.logo"
          :alt="talk.name"
          loading="lazy"
          class="w-full h-full object-cover op-90 group-hover:op-100 transition-opacity"
        />
      </ark.div>
      <ark.h3 class="text-sm font-600 text-ink">
        {{ talk.name }}
      </ark.h3>
    </ark.div>

    <ark.p class="text-xs text-ink-muted leading-relaxed">
      {{ talk.angle }}
    </ark.p>

    <ark.div class="flex flex-wrap gap-1.5 mt-auto">
      <Chip v-for="topic in talk.topics" :key="topic" :label="topic" />
    </ark.div>
  </ark.a>
</template>
