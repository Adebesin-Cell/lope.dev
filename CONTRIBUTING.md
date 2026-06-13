# Contributing

Thanks for taking a look! This is my personal site, but fixes (typos, broken links, bugs, accessibility issues) and thoughtful suggestions are genuinely welcome.

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

- Vue components use `<script setup lang="ts">` and the Ark UI `ark.*` factory for structural elements.
- Components are PascalCase; pages are kebab-case; server routes are `name.method.ts`.
- Keep types honest — avoid `any`.
- Match the surrounding style; there's no formatter gate, so don't reformat unrelated lines.

## Submitting changes

1. Branch from `main`.
2. Make focused commits and confirm `bun run build` passes.
3. Open a PR — the title should follow [Conventional Commits](https://www.conventionalcommits.org) (e.g. `fix: correct release date formatting`).
4. Front-end changes: include before/after screenshots.

## Using AI

You're welcome to use AI tools, but write the PR and commit descriptions in your own words and make sure you understand any code you submit. Take ownership of your contribution.

## License

Code is [MIT](LICENSE). By contributing, you agree your contributions are licensed under it.
