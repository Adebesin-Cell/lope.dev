<script setup lang="ts">
defineOptions({ inheritAttrs: false })
withDefaults(defineProps<{ as?: string; poster?: boolean; dim?: boolean }>(), { as: 'div' })
</script>

<template>
  <div class="ama-frame" :class="{ dim }">
    <div class="ama-glow" aria-hidden="true" />
    <component :is="as" v-bind="$attrs" class="ama-card" :class="{ poster }">
      <slot />
    </component>
  </div>
</template>

<style>
.ama-frame {
  position: relative;
  isolation: isolate;
  width: 100%;
}

.ama-glow {
  position: absolute;
  z-index: -1;
  inset: 6% 0 6% 40%;
  border-radius: 24px;
  background: linear-gradient(180deg, #3ddc84, #e9d66b 22%, #ef6c4d 44%, #c04bd8 64%, #4f6bff 82%, #48d4f0);
  filter: blur(34px);
  opacity: 0.9;
  transition: opacity 0.5s ease;
}

.dim .ama-glow {
  opacity: 0.4;
}

.dim:focus-within .ama-glow {
  opacity: 0.9;
}

.ama-card {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 26px 26px 22px;
  border-radius: 18px;
  background: radial-gradient(120% 80% at 0% 0%, rgba(255, 255, 255, 0.05), transparent 60%), #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.07);
  box-shadow: 0 30px 80px -30px rgba(0, 0, 0, 0.6);
  color: #ededed;
}

.ama-card.poster {
  aspect-ratio: 4 / 5;
  padding: 34px 32px 30px;
}

.ama-card .ama-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  font:
    400 12.5px/1.45 'JetBrains Mono',
    ui-monospace,
    monospace;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #8f8f8f;
}

.ama-card .ama-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 38px;
  padding: 0 18px;
  border-radius: 999px;
  background: #ededed;
  color: #0a0a0a;
  font:
    500 14px/1 'Inter',
    system-ui,
    sans-serif;
  cursor: pointer;
  transition:
    background-color 0.15s,
    transform 0.15s;
}

.ama-card .ama-action:hover {
  background: #fff;
  transform: translateY(-1px);
}

.ama-card .ama-action:disabled {
  opacity: 0.6;
  cursor: progress;
  transform: none;
}

.ama-card .ama-action:focus-visible {
  outline: 2px solid #ededed;
  outline-offset: 3px;
}

@media (min-width: 640px) {
  .ama-glow {
    transform: translateX(18px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .ama-glow,
  .ama-card .ama-action {
    transition: none;
  }
}
</style>
