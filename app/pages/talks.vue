<script setup lang="ts">
import { ark } from '@ark-ui/vue/factory'

usePageSeo({
  title: 'Talks — Adebesin Tolulope',
  description: 'Where Lope wants to be on stage — speaking plans, starting with meetups.',
})
</script>

<template>
  <ark.article class="slide-enter-content">
    <ark.h1 class="text-4xl font-700 tracking-tight mb-3">
      Talks
    </ark.h1>
    <ark.p class="text-ink-muted mb-10">
      Nothing on stage yet — but that's the plan.
    </ark.p>

    <ark.div class="rounded-lg border border-ink/10 p-6 bg-ink/2">
      <ark.h2 class="text-lg font-600 mb-2">
        The wish
      </ark.h2>
      <ark.p class="text-sm text-ink-muted leading-relaxed">
        I haven't given a conference talk yet — but it's a goal. Speaking at
        <ark.span class="text-ink font-500">React Conf</ark.span> is right at the top of my list.
      </ark.p>
      <ark.p class="text-sm text-ink-muted leading-relaxed mt-3">
        If you're organising a meetup or conference and want me there, reach me at
        <ark.a href="mailto:lope@braindao.org" class="font-mono underline">lope@braindao.org</ark.a>.
      </ark.p>
    </ark.div>
  </ark.article>
</template>
