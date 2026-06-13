# lope.dev

My personal site — notes, projects, talks, and a feed of the open-source pull requests I ship. Content-first and dark by default, modeled on [antfu.me](https://antfu.me).

## Stack

- [Nuxt 4](https://nuxt.com) + [Nitro](https://nitro.build)
- [UnoCSS](https://unocss.dev) for styling
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

## Structure

```
app/         # pages, components, composables
content/     # blog posts (markdown)
server/      # Nitro API routes (e.g. releases)
shared/      # data shared by app + server (projects, etc.)
public/      # static assets, brand logos
```

## Contributing

This is a personal site, but fixes and suggestions are welcome — see [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

[MIT](LICENSE) for the code. Blog posts © Adebesin Tolulope.
