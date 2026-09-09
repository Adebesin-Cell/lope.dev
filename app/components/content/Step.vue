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

<style>
.step {
  counter-increment: step;
  position: relative;
  margin: 0;
  padding: 1.4rem 0 0.2rem 2.7rem;
  line-height: 1.7;
}
.step:not(:last-child)::after {
  content: '';
  position: absolute;
  inset-inline-start: 0.85rem;
  top: 3.1rem;
  bottom: -0.2rem;
  width: 1px;
  background: rgb(var(--ink) / 0.12);
}
.step::before {
  content: counter(step);
  position: absolute;
  inset-inline-start: 0;
  top: 1.25rem;
  display: grid;
  place-items: center;
  width: 1.7rem;
  height: 1.7rem;
  border-radius: 50%;
  border: 1px solid rgb(var(--ink) / 0.18);
  background: rgb(var(--bg));
  font-size: 0.75rem;
  font-variant-numeric: tabular-nums;
  color: rgb(var(--ink) / 0.7);
}
.step-title {
  margin: 0;
  font-size: 1.02rem;
  font-weight: 600;
}
.step-title a {
  text-decoration: none;
}
.step-title a:hover {
  text-decoration: underline;
}
.step-parts {
  margin: 0.3rem 0 0;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.75rem;
  color: rgb(var(--ink) / 0.5);
}
.step-body > :first-child {
  margin-top: 0.6rem;
}
.step-body p {
  margin-block: 0.8rem;
  color: rgb(var(--ink) / 0.8);
}
.step-body pre {
  margin-block: 0.8rem;
  padding: 0.8rem 0.9rem;
  border-radius: 8px;
  border: 1px solid rgb(var(--ink) / 0.10);
  background: rgb(var(--ink) / 0.05);
  overflow-x: auto;
  font-size: 0.8rem;
}
.step-gotcha {
  margin: 0.9rem 0 0;
  padding: 0.6rem 0.8rem;
  border-inline-start: 2px solid rgb(var(--ink) / 0.3);
  background: rgb(var(--ink) / 0.04);
  font-size: 0.88rem;
  color: rgb(var(--ink) / 0.7);
}
</style>
