---
title: Build once, at build time
description: What Panda actually does with your css() call at build time, step by step, and why doing that work before the browser matters.
date: 2026-10-16
---

### What Panda does with your `css()` call before the browser ever sees it.

![Build once, at build time, on a warm cream background with yellow and coral glows, surrounded by the Panda and Chakra logos, a css() sticker and a pill that reads 3.8 MB to 2 rules.](/images/blog/build-once-at-build-time/cover.svg){loading="eager" fetchpriority="high"}

*Panda internals, part 1.*

Earlier this year, before I worked on Panda, I tried to get Chakra to ship static CSS instead of running Emotion in the browser. My first attempt was a generator that wrote a CSS rule for every token, every utility and every condition, ahead of time. It produced 62,656 lines of CSS. 3.8 MB. Almost none of it would ever be used.

So, technically, build time. Just the dumb version of it. 😅

Panda does its work at build time too, but it starts somewhere else. It reads your code first, and only generates what you actually wrote. It reads your files, finds your Panda calls, works out their values without running anything, turns them into CSS, and leaves the browser almost nothing to do.

We'll follow one component through all of it. A token in `tokens.ts`:

```ts
export const brand = 'red.300'
```

And a badge in `badge.tsx` that uses it:

```tsx
import { css } from '../styled-system/css'
import { brand } from './tokens'

const size = 'lg'

export function Badge({ active }: { active: boolean }) {
  return (
    <span
      className={css({
        color: brand,
        padding: size === 'lg' ? '3' : '2',
        fontWeight: active ? 'bold' : 'normal',
      })}
    />
  )
}
```

## Why not just do it in the browser

Runtime CSS-in-JS makes your user's browser pay the rent. On every render, something has to turn style objects into CSS, hash a class name and inject a `<style>` tag, on the user's device.

That cost is well measured by now. Sam Magura, one of Emotion's maintainers, [cut render time from 54.3ms to 27.7ms](https://dev.to/srmagura/why-were-breaking-up-wiht-css-in-js-4g9b) by moving off it. Last month, GitHub [wrote up](https://github.blog/engineering/architecture-optimization/improving-site-performance-by-shipping-more-css/) moving Primer onto CSS Modules, and server rendering took 55% less time. It also doesn't fit React Server Components, which can't inject styles at render time. A plain CSS file has no such problem.

My Chakra experiment showed the trade honestly. The render timer went *up*, from about 1ms to 2.5ms, because the browser now parses a stylesheet up front. But Total Blocking Time went from 160ms to 10ms. A little CSS parsing, in exchange for no style work during render.

## Before any of this: `styled-system`

That `import { css } from '../styled-system/css'` has to come from somewhere. When you run `panda codegen`, Panda writes a `styled-system` folder into your project, generated from your config. It holds `css`, `cva`, patterns, recipes, the JSX helpers, and types for every token you defined. That's where your autocomplete comes from.

Keep that in mind. The `css` you import is a small generated function, and it never creates CSS in the browser.

## 1. Read

Panda only looks at the files you point it at, through `include` in your config:

```ts
export default defineConfig({
  include: ['./src/**/*.{ts,tsx}'],
})
```

Each of those files is parsed once into a syntax tree. In v2 the parser is [Oxc](https://oxc.rs), written in Rust, and it's fast. In the [v2 release](https://panda-css.com/blog/panda-css-v2), extracting 100 files went from 187ms to 7.5ms, and re-parsing a single file in watch mode dropped from about 652µs to under 2µs.

In most setups, Panda also looks at a file's imports before doing anything else. No Panda imports, and it can usually move on.

`badge.tsx` imports `css` from `styled-system/css`, so Panda keeps going.

## 2. Find

Panda checks what you imported and from where: `css`, `cva`, patterns like `stack`, your recipes, and JSX like `styled.div` or `<Box>`. Then it finds every place you call them.

It also checks scope. If you declare your own `css` that shadows the import, Panda knows that one isn't Panda's and leaves it alone.

In `badge.tsx`, it finds one `css()` call with three properties in it.

## 3. Work out the values

This is the interesting part. Panda has the call, but `color: brand` and `padding: size === 'lg' ? '3' : '2'` aren't values yet. They're expressions.

Panda never runs your code. It works the values out from the syntax alone. That's a real difference from tools like Linaria, which fall back to running your code in Node when they can't work a value out.

Here's what happens to our three properties:

- **`color: brand`.** `brand` is imported from `tokens.ts`, so Panda follows the import, sees `'red.300'`, and uses that.
- **`padding`.** `size` is a `const` with a literal value, so Panda knows it's `'lg'`. Now `size === 'lg'` can be decided, and the ternary resolves to `'3'`.
- **`fontWeight`.** `active` is a prop. Panda can't know it at build time. But both branches are plain values, so it keeps both: `'bold'` and `'normal'`.

That last rule has a catch. Both branches have to be workable. If either side can't be worked out, the whole ternary is dropped, not half of it.

Template literals, simple math and TypeScript casts like `as const` get worked out too. What doesn't:

- A `let` that gets reassigned somewhere.
- A function parameter, unless its type spells out the literal values.
- Anything that only exists at runtime. Props, state, an API response.

Those get skipped. Panda would rather generate nothing than guess. The Panda docs have a good example of how that can catch you out:

```tsx
const colorByType = {
  primary: 'red.300',
  secondary: 'blue.300',
}

css({ color: colorByType[type] ?? 'gray.100' })
```

`colorByType` is static, but `type` isn't. So the only thing Panda can extract here is the fallback, `gray.100`. The other colors never make it into the CSS.

v1 did all of this with a JavaScript evaluator. v2 works the expressions out directly in Rust, with no interpreter involved.

## 4. Turn it into CSS

Now Panda has plain values. Each property, value and condition becomes an atom, each atom is kept once, and they're sorted into a fixed order and written out:

```css
@layer utilities {
  .c_red\.300 { color: var(--colors-red-300) }
  .p_3 { padding: var(--spacing-3) }
  .fw_bold { font-weight: var(--font-weights-bold) }
  .fw_normal { font-weight: var(--font-weights-normal) }
}
```

Four rules. Both font weights are there, because Panda doesn't know which one you'll need. Nothing else is, which is the whole difference from my 62,656 lines.

## 5. What's left for the browser

Remember the generated `css` function? In the browser, it takes your object and returns class names. The same names the build already wrote into the stylesheet:

```ts
'c_red.300 p_3 fw_bold'
```

No CSS created, no `<style>` tag injected. Just a string.

In v2, even that can go. Turn on source transforms with `transform: true` on the Vite, webpack, Rollup or Bun plugin, and the bundler replaces the call with the strings Panda already worked out. The `active` check stays, because that's still a runtime decision. It's opt-in, it doesn't work with Turbopack yet, and any call Panda couldn't resolve stays as a normal runtime call.

## What build time can't see

All of this only works on what's in your source. When Sage [wrote about Panda](https://www.adebayosegun.com/blog/chakra-panda-and-ark-whats-the-plan) back in 2023, it was described as "constrained to styles that can be statically analyzed." That's the deal.

When a value really does depend on runtime, you've got a few options:

- **Recipes.** This is the one the Panda docs push hardest. For the `colorByType` case above, a `cva` recipe with a `type` variant puts every color in the source, so all of them get extracted.
- **CSS variables.** Set the variable at runtime, reference it in your styles:

  ```tsx
  <div
    className={css({ color: 'var(--accent)' })}
    style={{ '--accent': accent }}
  />
  ```

- **`staticCss`.** Tell Panda in your config which styles to generate anyway.
- **Tokens.** If a value can be a token, make it one. A finite set of tokens means a finite stylesheet.

## The whole trip

So here's what happened to that one `css()` call.

It started as an object full of expressions in `badge.tsx`. Panda read the file, found the call, followed `brand` into another file, decided `size === 'lg'`, kept both sides of `active`, and wrote four CSS rules. In the browser, all that's left is a function that hands back a string. With source transforms, not even that.

The browser gets a stylesheet that's already done.

Step 4 skipped over how atoms actually work: how Panda decides what counts as one, keeps each exactly once, and puts them in order. That's part 2.
