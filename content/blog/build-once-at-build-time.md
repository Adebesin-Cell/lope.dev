---
title: Build once, at build time
description: What Panda actually does at build time, step by step, and why doing the work there instead of in the browser matters.
date: 2026-10-16
---

### Most styling makes the browser pay the rent. Panda pays it up front.

![Build once, at build time, on a warm cream background with yellow and coral glows, surrounded by the Panda and Chakra logos, a css() sticker and a pill that reads 3.8 MB to 2 rules.](/images/blog/build-once-at-build-time/cover.svg){loading="eager" fetchpriority="high"}

*Panda internals, part 1.*

Earlier this year, before I worked on Panda, I tried to get Chakra to ship static CSS instead of running Emotion in the browser. My first attempt was a generator that wrote a CSS rule for every token, every utility and every condition, ahead of time. It produced 62,656 lines of CSS. 3.8 MB. Almost none of it would ever be used.

So, technically, build time. Just the dumb version of it. 😅

Panda does its work at build time too. The difference is where it starts. It reads your code first, and only generates what you actually wrote. This post walks through what that looks like, step by step.

## Why build time at all

Most styling solutions make your user's browser pay the rent for developer ergonomics. Runtime CSS-in-JS is the clearest case. You write styles next to your components, which feels great. Then on every render, in the browser, something has to turn those objects into CSS. Interpolate the strings, hash a class name, inject a `<style>` tag. Your users pay for your comfort, on their device, every time.

People have been moving away from that for a while. In 2022, Sam Magura, one of Emotion's maintainers, [wrote about breaking up with it](https://dev.to/srmagura/why-were-breaking-up-wiht-css-in-js-4g9b). Moving to Sass Modules cut their render time from 54.3ms to 27.7ms. Last month, GitHub [wrote up](https://github.blog/engineering/architecture-optimization/improving-site-performance-by-shipping-more-css/) moving Primer off styled-components and onto CSS Modules, and server rendering took 55% less time.

The cost was never writing styles in JS. It was *when* the work happened.

My Chakra experiment had numbers on this too, and they weren't all wins. Same demo, built with Emotion and with static CSS. The render timer went *up*, from about 1ms to 2.5ms, because the browser now parses a stylesheet up front. But Total Blocking Time went from 160ms to 10ms. You trade a little CSS parsing for no style work during render.

Panda makes that trade for you. Here's what happens when it runs.

## 1. Scan

Panda starts with the files you point it at. That's `include` in your config:

```ts
export default defineConfig({
  include: ['./src/**/*.{ts,tsx}'],
})
```

Anything outside that list, Panda never reads.

## 2. Parse

Each file is parsed once into a syntax tree. In v2 the parser is [Oxc](https://oxc.rs), written in Rust. Every step after this reads that same tree, so a file is never parsed twice.

Most files don't use Panda at all, so the first thing Panda looks at is the imports. If a file doesn't import anything from your `styled-system`, Panda stops there and moves on to the next one.

## 3. Find

For files that do, Panda checks what you imported. `css` from `styled-system/css`, `cva`, patterns like `stack`, your recipes, and JSX like `styled.div` or `<Box>`. Then it finds every place you call them.

It also checks scope. If you declare your own `css` that shadows the import, Panda knows that one isn't Panda's and leaves it alone.

## 4. Evaluate, without running anything

Now Panda has your calls, but it needs the values inside them. `css({ color: 'red.300' })` is easy. Real code isn't always that literal:

```ts
import { brand } from './tokens'

const size = 'lg'

css({
  color: brand,
  padding: size === 'lg' ? '8' : '4',
})
```

Panda never runs your code. It works the values out from the syntax alone:

- `size` is a `const` with a literal value, so Panda knows it's `'lg'`.
- `brand` comes from another file, so Panda follows the import and reads it there, as long as it's static too.
- `size === 'lg'` can now be decided, so the ternary resolves to `'8'`.
- If a ternary *can't* be decided, Panda keeps both branches and generates CSS for each.
- Template literals, simple math and TypeScript casts like `as const` get worked out too.

What it can't work out:

- A `let` that gets reassigned somewhere.
- A function parameter.
- Anything that only exists at runtime. Props, state, an API response.

Those get skipped. Panda would rather generate nothing than guess.

v1 did this by running a JavaScript evaluator over your code. v2 works the expressions out directly in Rust, with no interpreter involved.

## 5. Encode and write the CSS

Every style object Panda found gets broken down into atoms. One property, one value, one condition. Each atom is kept once, sorted into a fixed order, and written out as CSS.

So this:

```tsx
<div className={css({ color: 'red.300', padding: '4' })} />
```

becomes this in your stylesheet:

```css
.c_red\.300 { color: var(--colors-red-300) }
.p_4 { padding: var(--spacing-4) }
```

Two classes, because you used two styles. Not 62,656 lines. How atoms work is big enough for its own post, so that's part 2.

## 6. Codegen

Panda also writes a folder into your project, `styled-system`. Run `panda codegen` and you get the functions you import from it: `css`, `cva`, patterns, recipes, the JSX helpers, and types for every token in your config. That's where your autocomplete comes from.

These functions are small. `css()` in the browser doesn't create any CSS. It takes your object and returns class names, the same ones the build already wrote into the stylesheet.

## 7. Source transforms

In v2, even that last step can go. Turn on source transforms with `transform: true` on the Vite, webpack, Rollup or Bun plugin, and the bundler swaps the call for the string Panda already worked out:

```tsx
<div className="c_red.300 p_4" />
```

No `css()` call left to run. It's opt-in, it doesn't work with Turbopack yet, and any call Panda couldn't resolve at build time stays as a normal runtime call.

## What build time can't see

All of this only works on what's in your source. When Sage [wrote about Panda](https://www.adebayosegun.com/blog/chakra-panda-and-ark-whats-the-plan) back in 2023, it was described as "constrained to styles that can be statically analyzed." That's the deal.

When you do need a value that only exists at runtime, you've got a few options:

- **CSS variables.** Set the variable at runtime, reference it in your styles:

  ```tsx
  <div
    className={css({ color: 'var(--accent)' })}
    style={{ '--accent': accent }}
  />
  ```

- **`staticCss`.** Tell Panda in your config which styles to generate anyway, like every variant of a recipe.
- **Tokens.** If a value can be a token, make it one. A finite set of tokens means a finite stylesheet, and that's what keeps the output small and predictable.

## In short

At build time, Panda reads the files you gave it, parses each one once, finds your Panda calls, works out their values without running anything, turns them into atoms, and writes the CSS.

By the time your code reaches the browser, the styling work is already done.
