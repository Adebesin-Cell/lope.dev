<template>
  <svg
    class="quiet-cover"
    viewBox="0 0 1200 630"
    role="img"
    aria-label='family?.familyName resolving to a dash: no error, no log, just a dash'
  >
    <defs>
      <pattern id="quiet-dots" width="24" height="24" patternUnits="userSpaceOnUse">
        <circle class="dot" cx="1.5" cy="1.5" r="1.5" />
      </pattern>
    </defs>

    <rect class="bg" x="0" y="0" width="1200" height="630" />
    <rect x="0" y="0" width="1200" height="630" fill="url(#quiet-dots)" />

    <text class="kicker faint" x="80" y="120">OPTIONAL CHAINING</text>

    <text class="code" x="80" y="330">
      <tspan class="ink">family</tspan><tspan class="op">?.</tspan><tspan class="ink">familyName</tspan><tspan class="faint"> ?? </tspan><tspan class="op">"—"</tspan>
    </text>

    <text class="note faint" x="80" y="420">no error. no log. just a dash.</text>

    <text class="tagline muted" x="80" y="560">The bug you never see.</text>
  </svg>
</template>

<style scoped>
.quiet-cover {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 12px;
}
.bg { fill: var(--colors-bg); }
.dot { fill: color-mix(in srgb, var(--colors-ink) 5%, transparent); }
.ink { fill: var(--colors-ink); }
.muted { fill: var(--colors-ink-muted); }
.faint { fill: var(--colors-ink-faint); }
.op { fill: #e0a05e; }
.code {
  font-family: ui-monospace, 'SF Mono', Menlo, monospace;
  font-size: 62px;
  font-weight: 500;
}
.kicker {
  font-family: ui-monospace, 'SF Mono', Menlo, monospace;
  font-size: 22px;
  letter-spacing: 6px;
}
.note {
  font-family: ui-monospace, 'SF Mono', Menlo, monospace;
  font-size: 26px;
}
.tagline {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 40px;
  font-style: italic;
}
</style>
