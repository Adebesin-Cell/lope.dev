---
name: panda-usage-cleanup
description: Use when cleaning up a Panda CSS v2 theme or codebase, removing or renaming tokens, recipe variants, keyframes, patterns or text styles, replacing hard-coded values with tokens, or checking whether a theme name is still used before changing it. Runs `panda analyze` and acts on its JSON.
---

# Panda usage cleanup

Panda doesn't fail the build when a theme name is removed or a value is hard-coded. A deleted token that's still referenced
is written as a literal value, and the page loses its style silently. Never remove or rename a theme name without checking
usage first.

## Get the report

Run in the app that consumes the theme, not in the design-system package:

```bash
npx panda analyze --json > panda-usage.json
```

If the Panda MCP server is connected, `get_usage_report` returns the same data.

Useful parts of the JSON:

- `views.tokens.categories[].rawValues[]`: hard-coded values, each with `suggestions[].token`
- `npx panda analyze --scope <section> --unused`: names nothing uses, one per line. Sections: `tokens`, `recipes`,
  `utilities`, `patterns`, `keyframes`, `compositions`
- `views.recipes`: which variant values are used
- `usages[]`: `{ kind, name, file, line, column }` for every use in source files

Config uses (`globalCss`, `staticCss`, used recipe bodies) count as uses but are not in `usages[]`. They show in each
name's "Used in" column and `config` field.

## Replace hard-coded values

For each entry in `rawValues` with a suggestion:

1. Open the file and line from `usages` or search for the value.
2. Replace the raw value with the suggested token, in the same property.
3. If there are several suggestions, prefer a semantic token over a primitive one.
4. Skip values with no suggestion. Don't invent a token for them; list them for the user.

## Remove or deprecate unused names

1. Treat "unused" as "unused in the scanned files". Usage in other apps, files outside `include`, and values computed at
   runtime are invisible.
2. If the theme is shared by more than one app, ask the user to run the report in each app, or deprecate instead of
   deleting: https://panda-css.com/docs/design-systems/deprecations
3. Check `via` before removing a keyframe or token. A keyframe used `via animations.spin` breaks the animation token if
   removed.
4. Remove in small commits, one section at a time, and rerun `npx panda analyze` after each.

## Before you finish

- Rerun the report. Nothing you removed should appear in `usages`, and no new raw values should appear.
- Run the project's lint (`@pandacss/eslint-plugin` catches invalid token paths and hard-coded values) and build.
- Report what you replaced, what you removed, and what you left alone and why.

## What you can't see

A value Panda can't read at build time, like `button({ size })` with `size` from a prop, counts as nothing. Don't treat
a variant as unused only because a dynamic call might select it. Ask the user.

Docs: https://panda-css.com/docs/design-systems/analyze
