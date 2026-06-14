# Contributing

Thanks for taking a look! This is my personal site, but fixes (typos, broken links, bugs, accessibility issues) and thoughtful suggestions are genuinely welcome.

## What to work on

See **[ROADMAP.md](./ROADMAP.md)** — it's the backlog and direction. Anything unchecked is fair game; the **AFK / Phase 1** items are good entry points (mostly data + existing components). Open an issue to claim something, or send a PR referencing the item.

## Getting started

Prerequisites: [Node.js](https://nodejs.org) (LTS) and [bun](https://bun.sh).

```bash
bun install
bun run dev        # http://localhost:3000
```

To build with the live `/releases` data, pass a GitHub token:

```bash
GITHUB_TOKEN="$(gh auth token)" bun run build
```

## Project structure

```
app/         # pages, components, composables
content/     # blog posts (markdown + frontmatter)
server/      # Nitro API routes (e.g. server/api/releases.get.ts)
shared/      # data shared by app + server (shared/data/projects.ts)
public/      # static assets and brand logos (public/brands/)
```

## Code style

- Vue components use `<script setup lang="ts">` and the Ark UI `ark.*` factory for structural elements (use raw `<img>` / `<canvas>` only when you need a real DOM ref).
- Components are PascalCase; pages are kebab-case; server routes are `name.method.ts`.
- Keep types honest — avoid `any`. Keep code self-documenting — avoid explanatory inline comments.
- **Colour:** theme-aware tokens only — `text-ink`, `text-ink-muted`, `text-ink-faint`, `bg-bg`, `bg-bg-soft`, and opacity variants like `bg-ink/5`, `border-ink/10`. These are RGB-channel CSS vars (`--ink`, `--bg`, …) in `app/assets/css/main.css`, so `/opacity` works and they invert in light mode. Never hardcode `#fff` / `rgba(255,255,255,…)`.
- **RTL-ready:** logical properties only — `start`/`end`, `ms`/`me`, `ps`/`pe`, `inset-*`. Never `left`/`right`/`ml`/`pl`.
- **Accessibility:** `aria-hidden` on decorative icons, `aria-label` on icon-only controls, honour `prefers-reduced-motion`, keep WCAG AA contrast, and test both themes.
- **Data-driven icons:** icon class strings in a `shared/data/*.ts` file aren't always picked up by the content scanner — add them to the safelist in `uno.config.ts` (see how `projects` is imported there).
- Match the surrounding style; there's no formatter gate, so don't reformat unrelated lines.

### Reusable building blocks

Check these before writing something new: `ProjectGroup.vue` (watermark heading + section shell — also the pattern for `/afk` sections), `TocNav.vue` (floating table of contents, auto-built from `[data-toc]` + `id`), the `slide-enter` / `slide-enter-content` classes (staggered entrance), `ImageZoom.vue` (click-to-zoom for content images), and the `chip` / `btn` / `btn-ghost` UnoCSS shortcuts.

## Submitting changes

1. Branch from `main`.
2. Make focused commits and confirm `bun run build` passes.
3. Open a PR — the title should follow [Conventional Commits](https://www.conventionalcommits.org) (e.g. `fix: correct release date formatting`).
4. Front-end changes: include before/after screenshots.

## Using AI

You're welcome to use AI tools, but write the PR and commit descriptions in your own words and make sure you understand any code you submit. Take ownership of your contribution.

## License

Code is [MIT](LICENSE). By contributing, you agree your contributions are licensed under it.
