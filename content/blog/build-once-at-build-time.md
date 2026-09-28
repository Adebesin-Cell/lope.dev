---
title: Build once, at build time
description: We set out to prototype Chakra v4 and ended up somewhere better. Panda CSS v2 is here, and this is what it looks like from the trenches of actually shipping it.
date: 2026-09-28
draft: true
---

![The Panda CSS mark beside many repeated style declarations collapsing into a single built rule.](/images/blog/build-once-at-build-time/cover.svg)

Around April and March, we were thinking about [Chakra](https://chakra-ui.com) v4, though many times before that we'd had the conversation subtly. Let's start preparing for v4. I started making some chicken code on how v4 would look for Chakra. I had so much fun building it out and kept improving it, alongside [Segun Adebayo](https://github.com/segunadebayo). And during the course of it we decided to move it to [Panda](https://v2.pandacss.com) for all the extraction, generation and working. Which led to so many experiments. Learning Rust, and making the best use of the new layer to make Panda CSS faster. And tbh, the speed is amazing. Here, check it out for yourself.

Same config, a 100-file project, setup time aside:

- Cold parse of all 100 files: legacy 177ms, v2 7.6ms. Roughly 23x faster.
- Warm re-parse of a single file, the watch-mode hot path: legacy 652µs, v2 1.8µs. Roughly 360x faster.

That warm number is the one you feel. It's the gap between saving a file and seeing the style, and it's small enough now to disappear. On real projects the story holds: a Next.js pages sandbox went from 762ms to 31ms, a Qwik one from 376ms to 37ms. Across the board, extraction lands somewhere between 15x and 37x faster. `staticCss` builds went from 25.7s to 0.3s on a 29,000-rule config. And your editor feels it too. Type instantiations dropped by about 99%, and type-checking takes 40 to 60% less time.

This post however isn't about Chakra v4. We'd find time to talk about that. I'm here to share with you Panda CSS v2. It's out this week.

## The Rust engine

The old compiler parsed your source with `ts-morph`. It worked, but it sat right on the hot path. Every keystroke in watch mode meant re-parsing a file the slow way. The [v2](https://v2.pandacss.com) compiler is written in Rust, sitting on the [Oxc](https://oxc.rs) engine. That's where the numbers above come from.

The fun part isn't Rust for its own sake. It's that the speed comes from small decisions made against benchmark data instead of instinct, and some of them look wrong on paper. My favorite: when Panda builds a style object, it does insert-or-overwrite with a plain linear scan over a `Vec`. That's O(n²). A HashMap would be the "correct" answer, except it only starts winning past around 128 keys, and real style objects almost never clear 50. At that size the dumb scan beats the smart map on cache locality and zero allocation. The whole engine is full of calls like that.

## Why build time beats runtime

Most CSS-in-JS does its job in the browser. Your component renders, the library serializes your style object into a class, injects a `<style>` tag, and does it again on the next render. That's [styled-components](https://styled-components.com), [Emotion](https://emotion.sh), most of what you've reached for before. It ships in your bundle, runs on your user's device, and scales with how much your app renders.

Panda does none of that. It reads your code at build time, finds every style you wrote, and generates the CSS into a static file. By the time your app runs, the work is already done. No engine in the browser emitting styles. No serialization on render.

```ts
import { css } from '../styled-system/css'

const heading = css({
  fontSize: '2xl',
  fontWeight: 'bold',
  color: 'accent.text',
})
```

At runtime, `heading` is just a string of class names. The rule behind it was written to disk during the build. Your bundle stays clean, and it stays clean whether you write ten styles or ten thousand, because the styles don't live in the bundle at all.

## What is Panda CSS?

Panda CSS is a CSS-in-JS engine to build your CSS. It generates all CSS at build time, making sure code never has to emit CSS during runtime.

The part I keep coming back to is how it thinks about your styles. Every style you write gets broken down into atoms, one small rule per property and value. Write `margin-bottom: 2` in a hundred components and it's still one rule in the output, because the engine deduplicates. So the CSS doesn't grow with your app the way a bundle does. It grows with how many distinct styles you actually use, and then it stops.

Everything else builds on that. Your tokens, recipes and conditions are typed against your own design system, so the editor knows what `accent.text` is before you do. You can read the rest in the [docs](https://v2.pandacss.com).

## Even the runtime got faster

Build time does the heavy lifting, but `css()` still runs when your app does. A couple of those calls used to be slow. Now there's a cache, so `css({ color: 'red' })` called all over your app only gets looked up once, because the extraction already happened. Runtime `css()` is up to 4x faster. Big difference from how it used to work.

## It's here

Same API you already know. A completely different engine underneath. There's a lot more in the release than I've covered here. Publishable design systems with `panda lib`, `viewTransition()` and `positionTry()` factories, an official ESLint plugin, `panda doctor`. The [release post](https://v2.pandacss.com/blog/panda-css-v2) has all of it, breaking changes included. Heads up, it's ESM-only now and needs Node 22+.

```bash
npm install @pandacss/dev
```

We've been using it in production while it was still being built. Now it's your turn.
