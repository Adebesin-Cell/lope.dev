<script setup lang="ts">
let seed = 7
function rand() {
  seed = (seed * 16807) % 2147483647
  return seed / 2147483647
}

const sizes = [0.8, 1.1, 1.5, 2]
const dust = Array.from({ length: 140 }, () => ({
  x: Math.round(40 + rand() * 1120),
  y: Math.round(30 + rand() * 570),
  r: sizes[Math.floor(rand() * sizes.length)],
  o: +(0.08 + rand() * 0.42).toFixed(2),
}))
</script>

<template>
  <svg class="magic-cover" viewBox="0 0 1200 630" role="img" aria-label="you're made of magic">
    <defs>
      <linearGradient id="magic-fade" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#1c1c1c" />
        <stop offset="1" stop-color="#3d3d3d" />
      </linearGradient>
      <radialGradient id="magic-light" cx="600" cy="-40" r="560" gradientUnits="userSpaceOnUse">
        <stop offset="0" stop-color="#fff" stop-opacity="0.22" />
        <stop offset="1" stop-color="#fff" stop-opacity="0" />
      </radialGradient>
      <filter id="magic-grain" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="3" stitchTiles="stitch" />
        <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.09 0" />
      </filter>
    </defs>

    <rect width="1200" height="630" fill="url(#magic-fade)" />
    <rect width="1200" height="630" fill="url(#magic-light)" />
    <g class="dust" fill="#fff">
      <circle v-for="(d, i) in dust" :key="i" :cx="d.x" :cy="d.y" :r="d.r" :opacity="d.o" />
    </g>
    <rect width="1200" height="630" filter="url(#magic-grain)" />

    <text class="title" x="600" y="345" text-anchor="middle" fill="#ece9e2">
      you’re made of <tspan font-style="italic">magic</tspan>
    </text>
    <text class="caption" x="600" y="560" text-anchor="middle" fill="#8a8a8a">FIVE YEARS · OF THE PAST AND THE FUTURE</text>
  </svg>
</template>

<style scoped>
.magic-cover {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 12px;
}
.title {
  font-family: 'Newsreader', Georgia, serif;
  font-size: 112px;
  font-weight: 400;
  letter-spacing: -0.01em;
}
.caption {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 18px;
  letter-spacing: 0.32em;
}
@media (prefers-reduced-motion: no-preference) {
  .dust {
    animation: drift 6s ease-in-out infinite;
  }
}
@keyframes drift {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}
</style>
