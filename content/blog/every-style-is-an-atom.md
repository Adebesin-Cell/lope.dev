---
title: Every style is an atom
description: "How Panda CSS breaks your styles into atomic CSS, keeps each atom exactly once, and where atoms stop."
seoTitle: "Every style is an atom: how Panda CSS generates atomic CSS"
date: 2026-10-17
series: Panda internals
part: 2
---

::subtitle
How Panda turns your styles into atoms, and keeps each one exactly once.
::

![Every style is an atom, on a cream background with yellow and teal glows, surrounded by the Panda logo and stickers reading (prop, value, cond), d_flex and hover:c_red.300.](/images/blog/every-style-is-an-atom/cover.svg){loading="eager" fetchpriority="high"}

*Panda internals, part 2. Part 1: [Build once, at build time](/blog/build-once-at-build-time).*

In part 1, I wrote about a generator I built that spat out 62,656 lines of CSS. It made a rule for every token, every utility, every condition. Every single one of those rules was an atom: one property, one value, one condition.

Panda works with the exact same unit. The difference is which atoms it keeps, and how many times it keeps them.

## Same declaration, many names

Say you have three components:

```ts
const card = css({ display: 'flex', padding: '4', color: 'gray.700' })
const header = css({ display: 'flex', padding: '4', _hover: { color: 'red.300' } })
const footer = css({ display: 'flex', padding: '4' })
```

With component-scoped CSS, each of these gets its own class. `display: flex` and `padding: 1rem` get written three times, under three different names. That's how component-scoped CSS is meant to work: one class per component, so the stylesheet grows with your components.

Panda counts something else. How many *different* declarations are in there?

- `display: flex`
- `padding: 4`
- `color: gray.700`
- `color: red.300`, on hover

Four. That's all the CSS this code needs.

## What an atom is

An atom is the smallest piece of a style that still means something. A property, a value, and the conditions it applies under.

In v2 it's a real type in the Rust engine. Simplified, it looks like this:

```rust
struct Atom {
    prop: Box<str>,
    value: AtomValue,
    conditions: SmallVec<[Box<str>; 2]>,
    important: bool,
}
```

If you don't read Rust, think of it as:

```ts
type Atom = {
  prop: string
  value: string
  conditions: string[]
  important: boolean
}
```

`conditions` is an ordered list, outside to inside. `{ md: { _hover: { color: 'red.300' } } }` becomes `['md', '_hover']`. A plain style with no condition gets an empty list.

## Into the set

When Panda reads a file, the encoder walks every style object it extracted and turns each leaf into an atom. Then it puts the atom into a hash set.

A set only keeps one copy of anything. So the three `display: flex` declarations from earlier become one atom. The second and third inserts just find it already there.

There are two of these sets. Each file has its own. Then the project keeps one combined set, and counts how many files use each atom. That count matters in watch mode. Delete a file, and the atoms only that file used go away. The ones other files still need stay.

This isn't new to v2. v1 did the same thing in JavaScript, with a `Set<string>`. The key was a string built by gluing the parts together:

```ts
'display]___[value:flex'
```

v2 keeps the same idea, but the key is a typed struct with its hash computed once and cached.

Ternaries work a little differently. Panda reads your code at build time, so it can't know which side of a ternary runs:

```ts
css({ color: isActive ? 'red.300' : 'gray.700' })
```

So it keeps both. Two atoms, `c_red.300` and `c_gray.700`.

## From atom to class

Each atom becomes one class name. By default they're readable:

- `display: flex` → `d_flex`
- `padding: 4` → `p_4`
- `color: gray.700` → `c_gray.700`
- `color: red.300` on hover → `hover:c_red.300`

Conditions go in front, the property gets shortened, the value stays as you wrote it. If you'd rather ship short hashed names, there's `hash: true` in your config. It's off by default.

Either way, the same atom gives the same class name. Every build, every machine.

So the three components from earlier come out as this:

```css
@layer utilities {
  .d_flex { display: flex }
  .p_4 { padding: var(--spacing-4) }
  .c_gray\.700 { color: var(--colors-gray-700) }
  .hover\:c_red\.300:is(:hover, [data-hover]) { color: var(--colors-red-300) }
}
```

Four rules for three components. Add a fiftieth component with `display: flex` and `padding: 4`, and you get zero new rules.

So your stylesheet grows with the number of distinct atoms you use, not the number of components you write. And since your tokens are a finite set, there are only so many atoms to make.

## Order, without import order

In plain CSS, when two rules have the same specificity, whichever one loaded last wins. Move an import, and your button changes color.

A set has no order. So before writing anything out, Panda sorts every rule by a fixed key:

1. Plain rules first, then rules with a selector, then rules inside at-rules.
2. At-rules in a fixed order: supports, media, container, print. Size queries sort by their size.
3. Selector priority, from a table of pseudo-classes, so `:hover` and `:focus` land in a predictable order.
4. Property priority. Shorthands go before longhands, so `padding-top` comes after `padding` and wins.

Ties fall back to the property name and the value. Nothing in that list depends on which file Panda read first, or what you imported where.

Class names and CSS order are two separate things. The class name is what your component gets. Where the rule sits in the file is decided by the sorter, and only the sorter.

## Where atoms stop

Two places work differently.

**Recipes.** Config recipes, the ones you define under `recipes` in your Panda config, aren't atomic. A button recipe gives you `.button` and `.button--size_md`, with the declarations grouped under those class names in `@layer recipes`. They go through the same encoder walk, but come out grouped, in the order you wrote them. Atomic recipes, `cva` and `sva`, are different. They do become atoms.

So "everything in Panda is atomic" isn't quite true. It also means recipe rules don't get the set's dedup for free. When the same recipe shows up from two places, say your app and a `designSystem` package, Panda has to dedupe those groups on its own.

**Last write wins.** In JavaScript, the later key wins:

```ts
const style = { ...base, ...override }
```

Atomic classes don't work like that. If two classes both set `color`, the browser picks whichever rule comes later *in the stylesheet*. Not by where it appears in your object or your `className` string.

Panda handles most of this for you. `css(base, override)` merges the objects first, then turns the result into atoms, so the override wins the way you'd expect. And with source transforms on, if Panda can't tell which value wins at build time, it doesn't guess. It leaves the call alone.

The thing to avoid is joining two class strings by hand and expecting the second one to win. Merge styles with `css()`, not with string concatenation.

## In short

So when you write `css({ ... })`, you're not adding a stylesheet. You're adding atoms to a set.

Often, they're already in it.

*Next in the series: [Look it up once](/blog/look-it-up-once), why calling `css()` on every render stays cheap.*
