<script setup lang="ts">
const colorMode = useColorMode()

function setPreference() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}

function toggle(event: MouseEvent) {
  const supportsTransition = typeof document !== 'undefined'
    && 'startViewTransition' in document
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!supportsTransition) {
    setPreference()
    return
  }

  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  )
  const toDark = colorMode.value !== 'dark'

  const transition = document.startViewTransition(async () => {
    setPreference()
    await nextTick()
  })

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ]
    document.documentElement.animate(
      { clipPath: toDark ? [...clipPath].reverse() : clipPath },
      {
        duration: 400,
        easing: 'ease-out',
        fill: 'forwards',
        pseudoElement: toDark
          ? '::view-transition-old(root)'
          : '::view-transition-new(root)',
      },
    )
  })
}
</script>

<template>
  <button
    type="button"
    aria-label="Toggle theme"
    class="nav-link"
    @click="toggle"
  >
    <ClientOnly>
      <span :class="colorMode.value === 'dark' ? 'i-lucide-moon' : 'i-lucide-sun'" aria-hidden="true" />
      <template #fallback>
        <span class="i-lucide-moon" aria-hidden="true" />
      </template>
    </ClientOnly>
  </button>
</template>
