<script setup lang="ts">
const props = defineProps<{
  handle: string
  name?: string
}>()

const label = computed(() => props.name ?? props.handle)
</script>

<template>
  <a
    :href="`https://github.com/${handle}`"
    target="_blank"
    rel="noopener"
    class="mention"
  >
    <img
      :src="`https://github.com/${handle}.png?size=48`"
      :alt="handle"
      loading="lazy"
      class="mention-avatar"
    >
    <span :class="{ 'uppercase': !name }">{{ label }}</span>
  </a>
</template>

<style scoped>
.mention {
  display: inline-flex;
  align-items: center;
  gap: 0.35em;
  vertical-align: middle;
  padding: 0 0.55em 0 0;
  margin: 0 0.1em;
  border-radius: 999px;
  font-size: 0.85em;
  line-height: 1;
  white-space: nowrap;
  text-decoration: none !important;
  background: rgb(var(--ink) / 0.1);
  color: rgb(var(--ink-muted)) !important;
  transition: background-color 0.2s, color 0.2s;
}
.mention:hover {
  background: rgb(var(--ink) / 0.16);
  color: rgb(var(--ink)) !important;
}
.mention-avatar {
  height: 1.5em;
  width: 1.5em;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 !important;
  display: inline-block;
  vertical-align: middle;
}
</style>
