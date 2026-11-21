---
title: New engine, new origin
description: How a Chakra v4 conversation turned into Panda CSS v2. The questions, the POC, the JS work we threw away, and the day we said "Rust it".
date: 2026-09-29
readingTime: 6min
draft: true
---

::subtitle
This started as a Chakra v4 question and ended with us rewriting Panda in Rust.
::

![New engine, new origin. Panda CSS v2, with the install size down from 111 MB to 37 MB.](/images/blog/new-engine-new-origin/cover.svg){loading="eager" fetchpriority="high"}

Between January and March, after I finished [the codemod for Chakra v3](/blog/a-year-a-verse-and-an-ecosystem), Sage (Segun Adebayo) and I started talking about Chakra v4. We wanted v4 to be smooth, so we had a lot of conversations about it.

During those conversations, the idea came up of moving Chakra to [Panda CSS](https://panda-css.com) and swapping out the Emotion layer. We couldn't do it yet, though. Chakra worked in ways that got in the way, and so did Panda at the time.

This is the origin story. What changed in v2, and how fast it got, is already told elsewhere, so I'll point you there instead of repeating it.

## A lot of questions

Before writing any code, I wanted to understand what we were actually building. So I read up on how other libraries handle zero-runtime styling (Panda, Vanilla Extract, Linaria, Kuma UI) and came back to Sage with a long list of questions. Should style props like `<Box p={4} bg="red.500" />` still work? Would they compile statically, or would some runtime stay? How much of Chakra's theme maps to Panda tokens?

Sage answered every single one, and at the end said they loved the questions.

The answers set the direction. Style props stay, but they only work for CSS that already exists. Multi-part components move to slot recipes. And the goal was zero runtime CSS first, then ease of migration, because static CSS can't be the reason we break the ecosystem.

## The POC

So I built a small one: a generator that reads theme tokens and writes atomic classes, plus a tiny runtime that maps style props to them.

```tsx
<Box p="4" bg="red.500" rounded="md">Hello</Box>
// becomes
<div class="p_4 bg_red_500 rounded_md">Hello</div>
```

There was no style computation in the browser at all. But the test theme had 396 tokens, and generating every utility came out to roughly 3.8MB of raw CSS. 😅

I invited Sage to the repo, then disappeared for a week, because I was still in final year and had exams. Sage's first comment was to drop my custom script and use the Panda package directly, so users could choose what gets generated.

Then Sage raised the question that ended up mattering most: if Chakra ships its own styled-system and the user runs codegen, how does their output override ours? My answer was tsconfig paths. That worked for a POC, but it was a workaround for something Panda didn't really support: shipping a design system that other apps build on.

## Panda first

v3 already had a lot on its plate, so we went gradually. We decided to work our way up the chain to prepare for Chakra v4: major releases underneath Chakra first ([Ark v6](https://github.com/chakra-ui/ark/discussions/3997), [Zag v2](https://v2.zagjs.com/)). Right at the bottom of that chain was Panda.

![Working up the chain: Panda v2 first, then Zag v2, then Ark v6, then Chakra UI v4. Each one builds on the one before it.](/images/blog/new-engine-new-origin/up-the-chain.svg)

Panda v1 was good, but it had real drawbacks for large systems. It was slow on big codebases, some APIs didn't go far enough, and sharing a design system meant lining up config fields by hand. Other teams had been living for a while with the same problem I hit in the Chakra POC. So before we started building, we asked people what they wanted from v2, [in a GitHub discussion](https://github.com/chakra-ui/panda/discussions/3522) and on Discord. The answers were a long list, and speed and design system sharing were at the top.

## JS first, then Rust

Our early work was building those features in JS.

In April, I opened a PR adding `createRecipeContext` and `createSlotRecipeContext`, the helpers Chakra's static components would sit on. It never merged. It went straight into the Rust port instead.

Then in May I started on design system support: one `designSystem` field for apps, one `panda lib` command for authors. It grew to over 42k lines across 588 files and 100 commits, with sandboxes that stacked design systems seven levels deep to see what broke.

It worked, but it was all sitting on the v1 pipeline. So we paused. If we kept going that way, we'd just be hacking around the engine. Every feature on the list was getting bolted onto an engine that was already the slow part.

So we decided to tear down what we knew of Panda v1, and said:

"Rust it."

![Panda v1 ran on Node with a JavaScript runtime, Panda 2.0 runs on Rust and compiles anywhere](/images/blog/new-engine-new-origin/node-to-rust.svg)

I closed my design system PR. 🙂‍↔️

Honestly, I was okay with closing it, since I'd be the one rebuilding that work on the new engine anyway.

Sage started the Rust foundation while I kept working on the design system features. On May 15 the first Rust workspace landed on the `v2` branch. By June the old v1 Node pipeline was gone completely, over 226k lines deleted in one PR.

Then I rebuilt the design system work on the new engine. In v2, a design system package runs `panda lib`, and an app points at it with one field:

```ts
export default defineConfig({
  designSystem: '@acme/ds',
})
```

No tsconfig paths, no bundler aliases. That's exactly what Chakra v4 needs.

![Design system flow: the author runs panda lib to ship a manifest, preset and build info; the consumer sets designSystem and reuses the pre-extracted styles](/images/blog/new-engine-new-origin/design-system.svg)

## What came out of it

I won't list everything here, because it's already written up:

- The [Panda 2.0 release post](https://panda-css.com/blog/panda-css-v2) goes through what shipped.
- The [upgrade guide](https://panda-css.com/docs/get-started/upgrading-to-v2) covers what changed and what was removed.
- My SailsConf talk, [Rebuilding Panda's Engine](https://sailsconf.com/2026/talks/17347112-5f4c-4086-bd0d-013eb2d2ff77), walks through the engine and the numbers, and the [slides](/slides/rebuilding-pandas-engine.pdf) are up too.
- Sage, Esther and I also talked about v2 on a [livestream](https://www.youtube.com/live/5VcTX2I6Xk8).
- And if you want to know how the engine works inside, I've been writing the [Panda internals](/blog/series/panda-internals) series, starting with [what Panda does with your `css()` call at build time](/blog/build-once-at-build-time).

The [beta feedback thread](https://github.com/chakra-ui/panda/discussions/3599) shaped v2 more than anything else. People compared output against v1 line by line and sent repros and debug dumps, and each report was a problem we got to fix before release instead of after. Thank you.

## Step one

Thank you to Sage, for the answers, the Rust foundation, and the patience.

But for me this was always step one. It started as a Chakra v4 question: how do we make Chakra static without breaking everyone? Panda v2 is the engine for that, [and now we get to build v4 on top of it](https://github.com/chakra-ui/chakra-ui/discussions/10959).

If you want to see where that's going, the experiment lives on Chakra's [`v4` branch](https://github.com/chakra-ui/chakra-ui/tree/v4). The [design notes](https://github.com/chakra-ui/chakra-ui/tree/v4/design-notes) explain the styling engine, the opt-in Emotion layer and the Panda v2 gaps we found along the way, and the `panda-preset` package has a sandbox you can run. Try it and tell us what you think in the discussion.

The job isn't done yet.
