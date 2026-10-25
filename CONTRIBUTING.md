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
- **Styling:** Panda CSS. Write styles as `css({ ... })` constants in `<script setup>` and bind them with `:class`. Use a recipe from `styled-system/recipes` (`chip`, `button`, `link`, `prose`) before writing a one-off. `strictTokens` is on, so values come from tokens; an escape like `'[1.1em]'` is for the rare value with no token. See the README for the full system.
- **Colour:** semantic tokens only: `ink`, `ink.muted`, `ink.faint`, `bg`, `bg.soft`, and opacity variants like `ink/5` or `ink/10`. They switch in light mode on their own. Never hardcode `#fff` or `rgba(255,255,255,…)`.
- **RTL-ready:** logical properties only: `insetStart`/`insetEnd`, `ms`/`me`, `ps`/`pe`. Never `left`/`right`/`ml`/`pl`.
- **Accessibility:** `aria-hidden` on decorative icons, `aria-label` on icon-only controls, honour `prefers-reduced-motion`, keep WCAG AA contrast, and test both themes.
- **Icons:** UnoCSS icon classes (`i-lucide-*`, `i-simple-icons-*`). Icon strings in a `shared/data/*.ts` file may not be picked up by the scanner, so add them to the safelist in `uno.config.ts`.
- Formatting is enforced with oxfmt. Run `bun run format` before you commit.

### Reusable building blocks

Check these before writing something new: `ProjectGroup.vue` (watermark heading + section shell — also the pattern for `/afk` sections), `TocNav.vue` (floating table of contents, auto-built from `[data-toc]` + `id`), the `slide-enter` / `slide-enter-content` classes (staggered entrance), `ImageZoom.vue` (click-to-zoom for content images), and the `chip`, `button`, `link` and `prose` recipes in `panda.config.ts`.

## Submitting changes

1. Branch from `main`.
2. Make focused commits. CI runs these on every PR, so run them first:
   ```bash
   bun run format:check   # oxfmt
   bun run lint           # oxlint, with Panda rules for .ts files
   bun run lint:styles    # Panda's compiler over every file, .vue included
   bun run typecheck      # vue-tsc, including strictTokens
   bun run build
   ```
3. Open a PR — the title should follow [Conventional Commits](https://www.conventionalcommits.org) (e.g. `fix: correct release date formatting`).
4. Front-end changes: include before/after screenshots.

## Using AI

You're welcome to use AI tools, but write the PR and commit descriptions in your own words and make sure you understand any code you submit. Take ownership of your contribution.

## License

Code is [MIT](LICENSE). By contributing, you agree your contributions are licensed under it.
