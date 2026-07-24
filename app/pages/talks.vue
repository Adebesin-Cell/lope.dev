<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'
import { talks } from '~~/shared/data/talks'

usePageSeo({
  title: 'Talks — Adebesin Tolulope',
  description: 'What Lope would love to talk about: Panda, Chakra, Zag, Ark UI, and open source.',
})
</script>

<template>
  <ark.article class="slide-enter-content">
    <ark.header class="text-center mb-12">
      <ark.h1 class="text-4xl font-700 tracking-tight mb-3">
        Talks
      </ark.h1>
      <ark.p class="text-ink-muted">
        Talks I'd love to share, on the tools I build and maintain every day.
      </ark.p>
    </ark.header>

    <ark.section>
      <ark.h2 class="text-xs uppercase tracking-wider text-ink-muted font-500 mb-4">
        What I'd love to talk about
      </ark.h2>
      <ark.div class="grid gap-4 sm:grid-cols-2">
        <TalkCard v-for="talk in talks" :key="talk.name" :talk="talk" />
      </ark.div>
    </ark.section>

    <ark.div class="mt-12 rounded-lg border border-ink/10 p-6 bg-ink/2">
      <ark.h2 class="text-lg font-600 mb-2">
        The dream stage
      </ark.h2>
      <ark.p class="text-sm text-ink-muted leading-relaxed">
        <ark.span class="text-ink font-500">React Conf</ark.span> is the one I'm aiming for.
      </ark.p>
      <ark.p class="text-sm text-ink-muted leading-relaxed mt-3">
        Organising a meetup or conference? I'd love to give a talk. Reach me on
        <ark.a href="https://www.linkedin.com/in/adebesin-tolulope/" class="underline">LinkedIn</ark.a>.
      </ark.p>
    </ark.div>
  </ark.article>
</template>
