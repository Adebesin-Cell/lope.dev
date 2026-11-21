---
title: New engine, new origin
description: How a Chakra v4 conversation turned into Panda CSS v2, and the day we said "Rust it".
date: 2026-09-29
readingTime: 3min
draft: true
---

::subtitle
This started as a Chakra v4 question and ended with us rewriting Panda in Rust.
::

![New engine, new origin. Panda CSS v2, with the install size down from 111 MB to 37 MB.](/images/blog/new-engine-new-origin/cover.svg){loading="eager" fetchpriority="high"}

Between January and March, after I finished [the codemod for Chakra v3](/blog/a-year-a-verse-and-an-ecosystem), Sage (Segun Adebayo) and I started talking about Chakra v4. The idea came up of moving Chakra to [Panda CSS](https://panda-css.com) and swapping out the Emotion layer.

I came back to Sage with a long list of questions, and Sage answered every single one. Then I built a small POC that turned style props into static classes. It worked, but the test theme alone came out to roughly 3.8MB of CSS 😅, and it raised the question that mattered most: how do you ship a design system built with Panda that other apps can build on? Panda didn't really support that yet.

So we decided to work our way up the chain to Chakra v4, and right at the bottom of that chain was Panda.

## "Rust it"

We [asked people what they wanted from v2](https://github.com/chakra-ui/panda/discussions/3522) and started building it in JS. My design system PR grew to over 42k lines. It worked, but every feature was getting bolted onto an engine that was already the slow part.

So we decided to tear down what we knew of Panda v1, and said:

"Rust it."

I closed my design system PR. 🙂‍↔️ Sage started the Rust foundation, and I rebuilt the design system work on the new engine. In v2, an app points at a design system with one field:

```ts
export default defineConfig({
  designSystem: '@acme/ds',
})
```

That's exactly what Chakra v4 needs.

## The rest is in the talk

I talked through most of what changed in my SailsConf talk, [Rebuilding Panda's Engine](https://sailsconf.com/2026/talks/17347112-5f4c-4086-bd0d-013eb2d2ff77), and the [slides](/slides/rebuilding-pandas-engine.pdf) are up too. For the rest:

- The [Panda 2.0 release post](https://panda-css.com/blog/panda-css-v2) and the [upgrade guide](https://panda-css.com/docs/get-started/upgrading-to-v2) cover what shipped and what changed.
- Sage, Esther and I talked about v2 on a [livestream](https://www.youtube.com/live/5VcTX2I6Xk8).
- My [Panda internals](/blog/series/panda-internals) series goes into how the engine works, starting with [Build once, at build time](/blog/build-once-at-build-time).

Thank you to Sage, and to everyone who tested the betas and sent repros.

## Step one

For me this was always step one. Panda v2 is the engine, [and now we get to build Chakra v4 on top of it](https://github.com/chakra-ui/chakra-ui/discussions/10959).

The experiment lives on Chakra's [`v4` branch](https://github.com/chakra-ui/chakra-ui/tree/v4), with [design notes](https://github.com/chakra-ui/chakra-ui/tree/v4/design-notes) and a `panda-preset` sandbox you can run. Try it and tell us what you think.
