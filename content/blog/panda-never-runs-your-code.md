---
title: Panda never runs your code
description: "Panda CSS reads your source at build time and never runs it. What its static evaluator can follow, where it stops, and how to write styles it can see."
seoTitle: "Panda never runs your code: how Panda CSS evaluates styles statically"
date: 2026-10-24
series: Panda internals
part: 4
---

### What Panda figures out before your app runs.

![Panda never runs your code, on a cream background with yellow and green glows, surrounded by the Panda logo and code stickers.](/images/blog/panda-never-runs-your-code/cover.svg){loading="eager" fetchpriority="high"}

*Panda internals, part 4. Start with [Build once, at build time](/blog/build-once-at-build-time) if you're new here.*

Here's a component where every color is written right there in the file:

```tsx
const colorByType = {
  primary: 'red.300',
  secondary: 'blue.300',
}

function Section() {
  const [type] = useState('primary')
  const cls = css({
    color: colorByType[type] ?? 'gray.100',
  })

  return <section className={cls} />
}
```

Panda only generates CSS for one of them, `gray.100`.

The reason is that Panda never runs your code. It reads it. At build time it works out each style value from the source alone, and it stops wherever a value depends on something only the running app knows. Here, that's `type`, which comes from `useState`. If `type` were a plain `const`, Panda could follow it and pick the right color.

So the useful question is what Panda can work out, and where it stops. In short, it follows:

1. Constants, destructuring and math.
2. Imports from other files.
3. Enums and `token()`.
4. Small helper functions.
5. Ternaries, as long as both sides are known.

Anything that depends on props, state or a network response is out of reach.

## Constants, destructuring and math

The simplest case is a value you could find by reading the file top to bottom:

```ts
const theme = {
  accent: 'red.300',
  space: 4,
} as const

const { accent } = theme

css({
  color: accent,
  padding: `${theme.space * 2}px`,
})
```

Panda follows `accent` back to `theme`, and works out the template to `8px`. Template literals, math and comparisons all work. So do TypeScript-only wrappers like `as const` and `satisfies`, which Panda simply looks through.

The rule for variables is that the value has to stay put. A `const` with a known value works. A `let` works too, unless something reassigns it later. Once a value can change, Panda can't know which version your code sees.

## Imports from other files

Most real styles live in more than one file. Say `tokens.ts` exports a color:

```ts
export const brand = 'red.300'
```

And a component imports it:

```ts
import { brand } from './tokens'

css({ color: brand })
```

Panda follows the import into `tokens.ts` and reads `brand` there. It resolves paths the same way your tooling does, including `tsconfig` path aliases and `package.json` exports. It also follows `export *` barrels. When `tokens.ts` changes, the files that import it get re-read too.

A few shapes it doesn't follow:

- **Default and namespace imports.** `import theme from './theme'` and `import * as theme` aren't followed. Use named imports.
- **Ambiguous barrels.** If two `export *` lines both export a `brand`, Panda can't tell which one you mean, so it leaves it.
- **Values that aren't static over there either.** Following an import doesn't help if the other file builds the value at runtime.

## Enums and `token()`

TypeScript enums work, as long as each member has an explicit value:

```ts
enum Size {
  Small = '8px',
  Large = '16px',
}

css({ padding: Size.Large })
```

An auto-numbered member, one with no `= value`, gets dropped.

`token()` is the same idea from the other direction. Instead of Panda following your value, Panda fills in its own:

```ts
import { token } from '../styled-system/tokens'

css({
  boxShadow:
    `0 0 0 1px ${token('colors.blue.500')}`,
})
```

At build time, `token('colors.blue.500')` is replaced with the token's actual value, and `token.var(...)` with its `var(--...)` reference. This only happens when `token` comes from your generated `styled-system`. A different function that happens to be called `token` is left alone.

## Small helper functions

Helpers have the most specific rules. This one works:

```ts
const ring = (color: string) => ({
  outlineWidth: '2px',
  outlineColor: color,
})

css(ring('blue.500'))
```

Panda isn't running `ring`. It reads the function's body, substitutes `'blue.500'` for `color`, and gets a plain object back.

That only works for a small set of shapes. A helper can be a single arrow expression, or a few `const` or `let` declarations followed by one `return`. It can destructure its parameters, use defaults, spread objects and call other helpers that follow the same rules.

It can't use `if`, loops, more than one `return`, `...rest` patterns, or built-ins like `.map` and `Object.fromEntries`. Those helpers are left unresolved, and their styles don't get generated. Most of the time the fix is a ternary:

```ts
function ring(color?: string) {
  if (!color) return {}
  return { outlineColor: color }
}
```

becomes:

```ts
const ring = (color?: string) =>
  color ? { outlineColor: color } : {}
```

Same behavior, and now it's a shape Panda can read.

In v1, a JavaScript evaluator did this work. In v2 there's no interpreter at all, which is why helpers have to fit these shapes.

## Ternaries, `&&` and `??`

Panda can't know which branch of a ternary runs, so it keeps both:

```ts
css({
  fontWeight: active ? 'bold' : 'normal',
})
```

Both `bold` and `normal` get CSS. If the condition is something Panda already knows, like `size === 'lg'` with a constant `size`, it picks the right branch instead.

There's one catch. Both sides have to be workable. If either branch depends on something unknown, Panda drops the whole ternary, not just the bad half.

`&&`, `||` and `??` behave differently. When Panda can't work out the left side, it uses the right side. So `isOpen && 'red.300'` gives you `red.300`.

That's the answer to the puzzle from the top:

```ts
colorByType[type] ?? 'gray.100'
```

`type` comes from the running app, so the left side is unknown, and `??` resolves to its right side. `gray.100` is the only value Panda ever sees.

## Two smaller rules

A default value counts. In `function Button({ size = 'md' })`, Panda generates CSS for `md`. Anything a caller passes in later is unknown.

A partly known object still counts. If an object mixes static values with runtime ones, Panda keeps the static ones and skips the rest. One unknown property doesn't throw away the whole object.

## MDX files too

Panda reads `.mdx` files in your `include` the same way. It picks up imports, `{expressions}` and the props on components:

```mdx
import { Box } from '../styled-system/jsx'

<Box color="red.300">Hello</Box>
```

It skips fenced code blocks, inline code, frontmatter and link URLs, so a code example in your docs never turns into real CSS. This landed in Panda 2.1.2. Before that, the Markdown around a component could stop its styles from being found.

## Fixing the puzzle

Since `type` is only known at runtime, the fix is to put every color somewhere Panda can see it. A `cva` recipe does that, because each variant is written out in full:

```ts
const section = cva({
  base: { color: 'gray.100' },
  variants: {
    type: {
      primary: { color: 'red.300' },
      secondary: { color: 'blue.300' },
    },
  },
})

section({ type })
```

Now every color is in the source, so every color gets CSS, and the runtime only has to pick a class.

That's the pattern behind everything in this post. Panda can work out a lot more than people expect: imports, enums, tokens, helpers, both sides of a ternary. When it can't, move the values into a shape it can read, like a recipe, or list them in [`staticCss`](https://panda-css.com/docs/styling/static) so Panda generates them anyway.

*Next in the series: how Panda rewrites those ternaries straight into your code. If you missed the earlier parts: [Build once, at build time](/blog/build-once-at-build-time), [Every style is an atom](/blog/every-style-is-an-atom), [Look it up once](/blog/look-it-up-once).*
