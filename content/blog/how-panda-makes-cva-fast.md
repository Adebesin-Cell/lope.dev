---
title: How Panda makes cva fast
description: "What Panda CSS does to a cva() recipe at build time. Variant lookups instead of style merging, compound variants as plain checks, and a 256-slot table that remembers every answer."
seoTitle: "How Panda makes cva fast: compiling Panda CSS recipes into lookups"
date: 2026-11-12
series: Panda internals
part: 6
---

::subtitle
What a `cva` recipe turns into before it reaches the browser.
::

::post-cover
::

*Panda internals, part 6. Start with [Build once, at build time](/blog/build-once-at-build-time) if you're new here.*

[Part 5](/blog/the-ir-behind-your-ternary) ended on a promise: how Panda makes variants fast. Here's the recipe we'll follow:

```ts
import { cva } from 'styled-system/css'

export const button = cva({
  base: { color: 'white' },
  variants: {
    size: { sm: { fontSize: '12px' } },
    intent: { danger: { backgroundColor: 'red' } },
  },
  compoundVariants: [{ size: 'sm', intent: 'danger', css: { color: 'black' } }],
  defaultVariants: { size: 'sm', intent: 'danger' },
})
```

And a component calls it on every render:

```tsx
<button className={button({ size, intent })} />
```

The CSS for every variant is already in your stylesheet. That part happens at build time, like everything in [part 1](/blog/build-once-at-build-time). The question is how much work that `button()` call does in the browser.

*Just want the habits? Skip to [what this means for your code](#what-this-means-for-your-code).*

## What cva does at runtime

Without [source transforms](https://panda-css.com/docs/styling/source-transforms), `cva` is a function in your generated `styled-system`. Every call does the same steps:

1. Merge your props over `defaultVariants`.
2. Start a list with `base`.
3. For each variant, look up the style object for the selected value and push it.
4. Check every compound variant against the selection and merge the ones that match.
5. Deep-merge all of those style objects into one.
6. Call `css()` on the result to get class names.

All of that is wrapped in the same `memo()` from [part 3](/blog/look-it-up-once), so a repeated call is a cache hit. But a new combination goes through every step, and steps 5 and 6 work on style objects, not strings. Panda merges objects in the browser so it can turn them into class names it already knew at build time.

## What the transform writes instead

With source transforms on, Panda compiles the recipe. Every variant's classes are known at build time, so the merging can happen at build time too. The recipe above ships as this (formatted, with the config argument trimmed):

```js
import { cx as __pcx, attachRecipe as __pr } from '@pandacss-internal/css'

export const button = __pr((p = {}) => {
  p ??= {}
  const _p0 = p["size"], v0 = _p0 === void 0 ? 'sm' : _p0
  const _p1 = p["intent"], v1 = _p1 === void 0 ? 'danger' : _p1
  return __pcx(
    'color_white',
    { sm: "fs_12px" }[v0],
    { danger: "background-color_red" }[v1],
    v0 === 'sm' && v1 === 'danger' && "color_black",
  )
}, /* config */, ["size", "intent"], { size: ["sm"], intent: ["danger"] })
```

Line by line:

- **Defaults** become a check for `undefined`. Only `undefined` takes the default, so passing `null` doesn't.
- **Each variant** becomes a small object that maps an option to its class string. Picking a variant is one property lookup. An option with no classes is left out of the object.
- **Each compound variant** becomes a plain `&&` check. An array condition like `size: ['sm', 'md']` becomes `v0 === 'sm' || v0 === 'md'`.
- **`__pcx`** joins the pieces. When two pieces set the same property under the same conditions, the later one wins. Compounds come last, so a compound beats a variant, the same order the runtime `cva` merges them in.

No style objects and no `css()` call. The function only picks strings.

Boolean variants work the same way. A `disabled: { true: {...} }` variant becomes `{ true: "opacity_0.5" }[v1]`, because the property lookup turns `true` into the key `"true"`.

## Remembering the answer

The compiled function is already cheap, but Panda still caches it, because a component re-renders with the same props far more often than with new ones. It doesn't reuse the general `memo()` from part 3, though. A recipe knows something `css()` doesn't: the full list of values each prop can take.

So Panda gives each prop a small number:

- `0` for `undefined`
- `1`, `2`, ... for each declared option
- up to three more for `true`, `false` and `null`, when they aren't already options

Then it combines those numbers into one index, the same way digits combine into a number. For a recipe with `size: sm | md` and `visual: solid | outline`, each prop has 6 possible states, so there are 6 × 6 = 36 combinations. `{ size: 'md', visual: 'solid' }` lands in one exact slot of a 36-slot array. No string keys, no hashing. A cache hit is a few multiplications and an array read.

That only works while the table stays small. Every new prop multiplies the size, so the table is capped at 256 slots. Past that, Panda switches to a short list of the last 16 prop combinations, compared value by value. That's a different 16 from the cap in [part 5](/blog/the-ir-behind-your-ternary). That one limits how many class strings Panda inlines at a call site. This one is a cache that lives in the browser.

Some calls skip the cache entirely:

- In the table, a string that isn't a declared option, like a typo, is resolved without caching. It has no slot to go in.
- Objects and functions are never cached.

## Why `true` and `'true'` get two slots

When a recipe has no compound variants, `true` and `'true'` share a slot. The lookup `{ true: "..." }[v]` treats them the same, so they always produce the same classes.

Compound variants break that. A compound compiled to `v1 === true` matches `true` but not `'true'`. Two props that look the same can now produce different class strings. So when a recipe has compounds, Panda switches the table to strict mode: `true`, `false` and `null` each get their own slot, and numbers aren't cached at all.

## sva: one string per slot

A slot recipe compiles the same way, with one selection shared by every slot. This one:

```ts
const tabs = sva({
  slots: ['root', 'trigger'],
  className: 'tabs',
  base: { root: { display: 'flex' }, trigger: { cursor: 'pointer' } },
  variants: {
    size: {
      sm: { root: { gap: '4px' } },
      lg: { root: { gap: '8px' }, trigger: { fontSize: '16px' } },
    },
  },
  defaultVariants: { size: 'sm' },
  compoundVariants: [{ size: 'lg', css: { trigger: { fontWeight: 'bold' } } }],
})
```

ships as this:

```js
const tabs = __pm((p = {}) => {
  p ??= {}
  const _p0 = p["size"], v0 = _p0 === void 0 ? 'sm' : _p0
  return {
    root: __pcx("d_flex", "tabs__root", { sm: "gap_4px", lg: "gap_8px" }[v0]),
    trigger: __pcx("cursor_pointer", "tabs__trigger", { lg: "fs_16px" }[v0], v0 === 'lg' && "font-weight_bold"),
  }
}, { size: ["sm", "lg"] }, 1)
```

Each slot gets only the variants and compounds that style it. Here the compound `font-weight_bold` only touches `trigger`, so `root` never checks for it.

The trailing `1` turns on strict mode, because this recipe has a compound.

## When the call itself disappears

Take a different button, in its own file:

```ts
// button.ts
export const button = cva({
  base: { color: 'red', padding: '2px' },
  variants: { size: { sm: { padding: '4px' }, lg: { padding: '8px' } } },
  compoundVariants: [{ size: 'lg', css: { fontSize: '20px' } }],
  defaultVariants: { size: 'sm' },
})
```

Now another file calls it with values Panda can read:

```js
// you write
import { button } from './button'
export const large = button({ size: 'lg' })
export const fallback = button()

// your bundle ships
import { button } from './button'
export const large = "color_red padding_8px fs_20px"
export const fallback = "color_red padding_4px"
```

The call is gone. Panda follows the import, reads the recipe config, and resolves the selection at build time. The default `sm` applies when nothing is passed, the `lg` compound adds `fs_20px`, and `padding_2px` from `base` is gone because the variant's padding replaced it. A call with a value Panda can't know, like `button({ size })`, stays a runtime call to the compiled function.

A call in the same file as the `cva` is different. It stays a call, even with static values. It still benefits from the compiled function and the table, but it isn't folded into a string. If you want the call itself to go away, keep recipes in their own files.

`.raw()` is the exception. A static `button.raw({ size: 'sm' })` folds to a plain style object in either case.

## Two kinds of recipe

Not every recipe needs the full `cva` surface. When a recipe is exported or passed around as a value, other code might call `.raw()`, `.merge()`, `getVariantProps()` or `splitVariantProps()` on it. Those recipes get wrapped in `attachRecipe` (`__pr` above), which adds those methods at runtime from the config.

When a recipe is only ever called in its own file, Panda knows nothing else will touch it. It gets the bare memoized function (`__pm`) and none of the extra methods. A recipe with no variants doesn't even get the memo, since there's nothing to choose between.

## When Panda keeps the runtime cva

Panda doesn't compile a recipe when:

- **The config isn't static.** If Panda can't read the whole recipe at build time, there's nothing to compile. [Part 4](/blog/panda-never-runs-your-code) covers what it can read.
- **A compound selects a prop that isn't a variant.** The cache table only knows declared variants, so a compound like `{ size: 'sm', loading: true }` with no `loading` variant would make the table give wrong answers.
- **Hashed class names are on.** Panda leaves recipes alone, and warns once per file for the ones it would have compiled.

In all of those cases you get the runtime `cva` from the start of this post. It still works. It does more work per new combination.

## What this means for your code

- **Turn on source transforms.** Everything in this post needs it.
- **Keep recipe configs static.** Build them from literals and imports Panda can follow, not from functions that run at runtime.
- **Declare every prop a compound uses as a variant.** Otherwise the whole recipe stays at runtime.
- **Put recipes in their own files.** Static calls from other files fold to plain strings.
- **Pass booleans for boolean variants.** `true`, not `'true'`. With compounds, they aren't the same thing.
- **Fewer, wider variants beat many booleans.** Every variant multiplies the table. One `tone` with four values grows it less than four boolean flags.

## Strings all the way down

At build time, Panda already knows every class your recipe can produce. With source transforms on, the browser's only job is to pick the right strings.

*Next in the series: cold vs warm, and how Panda's watch mode got fast. If you missed the earlier parts: [Build once, at build time](/blog/build-once-at-build-time), [Every style is an atom](/blog/every-style-is-an-atom), [Look it up once](/blog/look-it-up-once), [Panda never runs your code](/blog/panda-never-runs-your-code), [What runtime means in Panda](/blog/what-runtime-means-in-panda), [The IR behind your ternary](/blog/the-ir-behind-your-ternary).*
