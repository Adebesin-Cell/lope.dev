<template>
  <svg
    class="hi-cover"
    viewBox="0 0 1200 600"
    role="img"
    aria-label='A chat box with a half-typed "Hi" and a blinking cursor, the send button just out of reach.'
  >
    <defs>
      <pattern id="hi-dots" width="26" height="26" patternUnits="userSpaceOnUse">
        <circle class="dot" cx="2" cy="2" r="2" />
      </pattern>
      <filter id="hi-soft" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="10" stdDeviation="24" flood-color="#000" flood-opacity="0.28" />
      </filter>
    </defs>

    <rect class="bg" x="0" y="0" width="1200" height="600" />
    <rect x="0" y="0" width="1200" height="600" fill="url(#hi-dots)" />

    <text class="kicker muted" x="222" y="238">the hardest two letters in open source</text>

    <rect class="card" x="220" y="258" width="760" height="104" rx="24" filter="url(#hi-soft)" />
    <text class="hi ink" x="266" y="326">Hi</text>
    <rect class="caret" x="330" y="286" width="3" height="48" rx="1.5" />

    <circle class="send" cx="922" cy="310" r="34" />
    <path class="arrow" d="M922 326 V294 M910 306 L922 294 L934 306" />
  </svg>
</template>

<style scoped>
.hi-cover {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 12px;
}
.bg { fill: rgb(var(--bg)); }
.ink { fill: rgb(var(--ink)); }
.muted { fill: rgb(var(--ink-muted)); }
.dot { fill: rgb(var(--ink) / 0.07); }
.card {
  fill: rgb(var(--bg-soft));
  stroke: rgb(var(--ink) / 0.12);
  stroke-width: 1.5;
}
.send {
  fill: rgb(var(--ink) / 0.05);
  stroke: rgb(var(--ink) / 0.12);
  stroke-width: 1.5;
}
.arrow {
  fill: none;
  stroke: rgb(var(--ink-muted));
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
}
.hi {
  font-family: Inter, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
  font-weight: 600;
  font-size: 46px;
}
.kicker {
  font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 22px;
  letter-spacing: 0.5px;
}
.caret {
  fill: rgb(var(--ink));
  animation: hi-blink 1.1s steps(1) infinite;
}
@keyframes hi-blink {
  50% { opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .caret { animation: none; }
}
</style>
