---
title: Know what your CSS actually uses
description: "How panda analyze finds the tokens, recipes, utilities and keyframes your Panda CSS app uses, and the ones nobody does. What counts as a use, and what it can't see."
seoTitle: "Know what your CSS actually uses: how panda analyze reports Panda CSS usage"
date: 2026-11-12
series: Panda internals
part: 7
---

::subtitle
How Panda finds what your app uses, and what nobody does.
::

::post-cover
::

*Panda internals, part 7. Start with [Build once, at build time](/blog/build-once-at-build-time) if you're new here.*

Delete a token your app still uses and the build won't fail. Panda writes the reference as a literal value, and the page quietly loses its color.

So before you remove anything from a theme, you want to know who uses it. That's what `panda analyze` answers.

Here's a small app. One file with a heading, a paragraph and two buttons:

```tsx
export function App() {
  return (
    <Stack gap="4" p="6">
      <h1 className={css({ color: 'brand.500', fontSize: 'xl' })}>Welcome</h1>
      <p className={css({ color: '#6366f1', padding: '16px' })}>Get started</p>
      <Button size="md" tone="solid">Go</Button>
      <Button size="md" tone="ghost">Later</Button>
      <span className={css({ animation: 'spin' })} />
    </Stack>
  )
}
```

A second file turns the `button` recipe into a component:

```tsx
export const Button = styled('button', button)
```

And the recipe lives in the config, with `size: sm | md | lg` and `tone: solid | ghost`.

## Same reader as the build

[Part 1](/blog/build-once-at-build-time) walked through how Panda reads your files: find the Panda calls, work out their values without running anything, and turn them into styles. `panda analyze` uses the same reader. It scans the files your config `include`s and asks the compiler what each one uses.

It doesn't generate any CSS or write `styled-system`. It only reads and counts.

That means the rules from [part 4](/blog/panda-never-runs-your-code) apply here too. If Panda can see a value at build time, analyze counts it. If it can't, analyze doesn't either.

## What it prints

```bash
panda analyze --limit 5
```

```txt
analyze: scanned 2 files
Summary
tokens         10 uses, 8 unique
recipes        3 uses, 1 unique
utilities      15 uses, 11 unique
patterns       1 uses, 1 unique
keyframes      1 uses, 1 unique
compositions   0 uses, 0 unique
```

Then one section for each. Tokens are grouped by category (trimmed to four rows):

```txt
Category     Used            Top tokens                                     Raw values   Files
colors       3/292 (1.03%)   brand.500 (2), gray.900 (1), transparent (1)   1            1
spacing      2/36 (5.56%)    4 (2), 6 (1)                                   1            1
animations   1/4 (25.00%)    spin (1)                                       0            1
fontSizes    1/14 (7.14%)    xl (1)                                         0            1
```

Recipes show which variant values get used:

```txt
Recipe   Variants       Top variants                                  Used in   Used as
button   3/5 (60.00%)   size.md (2), tone.ghost (1), tone.solid (1)   2 files   jsx 67%, fn 33%
```

`size.sm` and `size.lg` never show up. Every button in the app is `md`. "Used as" splits the two files: the `<Button>` tags count as JSX, and the `styled('button', button)` line counts as a function call.

Utilities, patterns, keyframes and compositions (text styles, layer styles, animation styles) each get a table too, and each ends with the list you act on:

```txt
Keyframes   1/5 used (20.00%)
Keyframe   Uses   Used in
spin       1      via animations.spin
Unused (4): bounce, ping, pulse, spinSlow
```

## Your config counts too

Look at `gray.900` in the colors row. No file in the app uses it. It's used by `globalCss`:

```ts
globalCss: { body: { color: 'gray.900' } }
```

A use is anywhere a name is written: a source file, or a place in your config. `globalCss` and `staticCss` count, and so do the bodies of recipes your app uses. A recipe that's only defined, never used, doesn't count. The "Used in" column lists them next to the files, like `1 file, globalCss, recipes.button`.

Some names are only used through something else. The app never wrote `spin` as a keyframe. It wrote `animation: 'spin'`, which is the `spin` animation token, and that token points at the `spin` keyframe. So the keyframe reads `via animations.spin`. If it didn't, you could delete the keyframe and break the token without any warning.

A few more rules decide what counts as one name:

- **Shorthands count as their longhand.** `p` and `padding` are one row.
- **Properties a utility writes for you aren't uses.** `truncate` sets `textOverflow`, but that doesn't count as you using `textOverflow`.
- **Tokens Panda derives count as their source.** Using `colorPalette.500` or negative spacing like `-4` counts as using the token they came from.

## Raw values

The paragraph in the example has two values that aren't tokens: `#6366f1` and `16px`. That's the `Raw values` column. With `--json` you can see what Panda found:

```bash
panda analyze --json | jq -c '.views.tokens.categories[].rawValues[]'
```

```txt
{"prop":"color","value":"#6366f1","uses":1,"files":1,"suggestions":[{"token":"brand.500","semantic":false,"conditional":false}]}
{"prop":"padding","value":"16px","uses":1,"files":1,"suggestions":[{"token":"4","semantic":false,"conditional":false}]}
```

Panda compares each raw value with your tokens. `#6366f1` is exactly `brand.500`, and `16px` is spacing `4`. Those are two places where someone wrote a value the theme already had a name for.

A raw value only makes the list when Panda finds a matching token. A one-off `13px` with no matching token isn't flagged.

## Unused, in what you scanned

"Unused" means no scanned file and no part of your config uses the name. That's narrower than "nobody uses it", in three ways:

- **Other apps.** If three apps share one design system, each app sees only its own code. Run it in every app before you remove something.
- **Files outside `include`.** Analyze reads what your config tells it to read.
- **Values Panda can't see.** `button({ size })`, where `size` comes from a prop, uses some size. Panda can't know which one, so none of them count.

For the same reason, run it in the app, not the design-system package. The app is where the tokens get used.

When the counts say zero, the next step depends on how many apps you have. Zero uses everywhere: remove it. Any uses at all: [deprecate it](https://panda-css.com/docs/design-systems/deprecations) first, so apps get warned before it disappears.

## Lists you can act on

`--unused` skips the tables and prints only the names nobody uses, one per line, with no cap:

```bash
panda analyze --scope keyframes --unused
```

```txt
bounce
ping
pulse
spinSlow
```

That's the list for a deprecation PR, or something to diff between two runs.

For anything else, there's JSON:

- **`--outfile report.json`** writes it to a file and still prints the tables.
- **`--json`** prints it instead of the tables.

The JSON has the summary, the per-category tables, and a flat `usages` list with the file, line and column of every use in your source, so `jq` can answer "where is `brand.500` used?" Uses from your config, like `gray.900` in `globalCss`, sit on each name's entry in the tables instead.

## Seeing it

`panda analyze` used to ship its own HTML report and a local server. In v2 that moved out of the CLI and into [Panda Studio](https://panda-css.com/docs/theming/studio), on its Usage page. You can open it two ways:

- **`panda studio`** runs a local server that rescans as you save.
- **Studio's Usage page** can open a `report.json` you made with `--outfile`.

It shows token coverage per category, the most used tokens, and the raw values with their suggested tokens next to your code.

## What this means for your code

- **Run it in each app, not the design-system package.** That's where the uses are.
- **Read "unused" as "unused in what I scanned".** Check every app that consumes the theme.
- **Prefer values Panda can see.** Every value Panda can read at build time is also a value analyze can count. A variant passed through a variable counts as nothing.
- **Use the raw values list as a to-do list.** Each one has a token waiting for it.
- **Deprecate before you delete.** A zero in one app isn't a zero everywhere.

## The same reading, a different question

Panda already reads every file to build your CSS. Analyze reads them the same way and asks a different question: which parts of your theme does anything actually use?

*Next in the series: cold vs warm, and how Panda's watch mode got fast. If you missed the earlier parts: [Build once, at build time](/blog/build-once-at-build-time), [Every style is an atom](/blog/every-style-is-an-atom), [Look it up once](/blog/look-it-up-once), [Panda never runs your code](/blog/panda-never-runs-your-code), [What runtime means in Panda](/blog/what-runtime-means-in-panda), [The IR behind your ternary](/blog/the-ir-behind-your-ternary), [How Panda makes cva fast](/blog/how-panda-makes-cva-fast).*
