# lope.dev

My personal site — notes, projects, talks, and a feed of the open-source pull requests I ship. Content-first and dark by default, modeled on [antfu.me](https://antfu.me).

## Stack

- [Nuxt 4](https://nuxt.com) + [Nitro](https://nitro.build)
- [Panda CSS](https://panda-css.com) v2 for styling, with [UnoCSS](https://unocss.dev) kept only for icons
- [Nuxt Content](https://content.nuxt.com) for the blog
- [Ark UI](https://ark-ui.com) for primitives
- [bun](https://bun.sh) as the package manager

## Development

```bash
bun install
bun run dev        # http://localhost:3000
```

The `/releases` page lists my recent public merged PRs from GitHub. It's fetched once at build and prerendered — set a token to avoid search rate limits:

```bash
GITHUB_TOKEN="$(gh auth token)" bun run build
```

## Styling with Panda

Everything is styled with Panda CSS at build time. No styling runtime ships to the browser.

- **Config:** `panda.config.ts` is the whole design system: tokens, semantic tokens, text styles, recipes and global styles. `strictTokens` is on, so any value outside the scale has to be an explicit `[escape]`.
- **Colors:** base colors live under `colors.lope.*`. Components use semantic tokens on top of them: `ink`, `ink.muted`, `ink.faint`, `bg`, `bg.soft`. Each has a dark default and a `_light` value, switched by the `light` condition (`html.light &`), which `@nuxtjs/color-mode` toggles.
- **Recipes:** `chip` for inline brand pills, `button` (`ghost` or `solid`), `link` (`strong`, `muted`, `quiet` or `nav`) and `prose`. `prose` comes from `@pandacss/preset-typography`, extended with the site's code blocks, rules and tables.
- **Components:** Vue SFCs write styles as `css({ ... })` constants in `<script setup>` and bind them with `:class`. Repeated patterns become recipes instead of shared class strings.
- **Source transforms:** the Vite plugin runs with `transform: true`, so each `css()` and recipe call is rewritten to a plain class string at build time.
- **Layers:** `app/assets/css/panda.css` declares the cascade layers. UnoCSS icons sit in an `icons` layer below Panda's utilities, so utilities always win.
- **OG images:** Takumi renders inline styles, not stylesheets, so the OG templates read raw values through `token()` from `styled-system/tokens`.
- **Unused output:** `optimize.removeUnusedTokens` and `removeUnusedKeyframes` drop tokens and keyframes the site never uses.

`styled-system/` is generated (`nuxt prepare && panda codegen` runs on install) and git-ignored.

### Checks

```bash
bun run lint          # oxlint, with Panda rules for .ts files (via @pandacss/eslint-plugin/oxlint)
bun run lint:styles   # Panda's compiler over every source file, .vue included; fails on any diagnostic
```

## Structure

```
app/         # pages, components, composables
panda.config.ts  # design tokens, recipes and global styles
content/     # blog posts (markdown)
server/      # Nitro API routes (e.g. releases)
shared/      # data shared by app + server (projects, etc.)
public/      # static assets, brand logos
```

## Contributing

This is a personal site, but fixes and suggestions are welcome — see [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

[MIT](LICENSE) for the code. Blog posts © Adebesin Tolulope.
