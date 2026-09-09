<script setup lang="ts">
const props = defineProps<{
  title: string
  parts?: string
  gotcha?: string
}>()

const id = computed(() => `step-${props.title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '')}`)
</script>

<template>
  <li :id="id" class="step">
    <h4 class="step-title">
      <a :href="`#${id}`">{{ props.title }}</a>
    </h4>
    <p v-if="props.parts" class="step-parts">{{ props.parts }}</p>
    <div class="step-body">
      <slot />
    </div>
    <p v-if="props.gotcha" class="step-gotcha">{{ props.gotcha }}</p>
  </li>
</template>
