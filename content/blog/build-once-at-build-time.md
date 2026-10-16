---
title: Build once, at build time
description: Before I worked on Panda, I rebuilt it by accident. 3.8 MB of CSS later, I understood why it does the work before your code ever ships.
date: 2026-10-16
draft: true
---

### Most styling makes the browser pay the rent. Panda pays it up front.

![Build once, at build time, on a warm cream background with yellow and coral glows, surrounded by the Panda and Chakra logos, a css() sticker and a pill that reads 3.8 MB to 2 rules.](/images/blog/build-once-at-build-time/cover.svg){loading="eager" fetchpriority="high"}

Last week, :mention{handle="segunadebayo" name="Sage"}, :mention{handle="estheragbaje" name="Esther"} and I went [live](https://www.youtube.com/live/5VcTX2I6Xk8) to talk about [Panda v2](https://panda-css.com/blog/panda-css-v2). We walked through what changed, and a lot changed. Over the years, the thing people asked us for most was speed, so we spent a lot of time making Panda faster. A new engine. A smaller package. Faster everything.

Funny thing is, for you, almost nothing changed. We said it in the [release post](https://panda-css.com/blog/panda-css-v2) too: the way you write Panda hasn't really changed. The engine underneath did.

But one thing made a bigger difference than any of that, long before the new engine. It's the core of what Panda is. You build once, and you do it at build time.

## The rent

Most styling solutions make your user's browser pay the rent for developer ergonomics. Runtime CSS-in-JS is the clearest case. You write styles right next to your components, which feels great. Then on every render, in the browser, something has to turn those objects into CSS. Interpolate the strings, hash a class name, inject a `<style>` tag. Your users pay for your comfort, on their device, every time.

I know this one well, because Chakra pays it. Chakra v3 runs on Emotion, and every style prop on every component gets resolved at runtime.

## 3.8 MB

Back in March, we started talking about Chakra v4, and I wanted to answer one question for myself. Could Chakra drop Emotion and ship plain static CSS instead?

I started a private repo for it, and the README slowly turned into a diary. The first line under the hypothesis: "Worst case I learn why it's harder than it looks."

I learned. My first attempt was a generator I wrote from scratch. A token dictionary, 62 utility configs, breakpoints, pseudo-states. Then it generated a class for every combination of all of them, ahead of time, so nothing had to happen in the browser.

It worked. The playground rendered with zero runtime style computation. It also produced 62,656 lines of CSS. 3.8 MB. Every token, times every utility, times every condition. Almost none of it would ever be used by anybody.

So, technically, build time. Just the dumb version of it. 😅

## Panda already reads your code

I showed Sage. Sage pointed me at Panda. So I went and read the source.

Everything I'd built was already there. The token dictionary, the utilities, the conditions, the recipes. Better tested, and handling edge cases I hadn't even thought of. I deleted my 600 lines and replaced them with about 90 that call Panda directly. In my notes I wrote that the "I have to build this from scratch to understand it" instinct cost me a week. It did. But I don't think I'd understand Panda the way I do without that week.

The difference between my generator and Panda comes down to one word. Mine *enumerated*. Panda *reads*. It parses your source files at build time, finds what you actually wrote, and generates CSS for that and nothing else.

You write this:

```tsx
<div className={css({ color: 'red.300', padding: '4' })} />
```

Panda reads it before anything runs, and your stylesheet gets this:

```css
.c_red\.300 { color: var(--colors-red-300) }
.p_4 { padding: var(--spacing-4) }
```

Two classes, because you used two styles. Not 62,656 lines.

## Flipping the contract

So Panda flips the contract. You keep the nice part: styles in TypeScript, next to your components, with autocomplete on your tokens. But the work moves. It happens once, on your machine or in CI, instead of on every render on someone else's phone.

The people who left runtime CSS-in-JS weren't wrong to. In 2022, Sam Magura, one of Emotion's maintainers, [wrote about breaking up with it](https://dev.to/srmagura/why-were-breaking-up-wiht-css-in-js-4g9b). Moving to Sass Modules cut their render time from 54.3ms to 27.7ms. Last month, GitHub [wrote up](https://github.blog/engineering/architecture-optimization/improving-site-performance-by-shipping-more-css/) moving Primer off styled-components and onto CSS Modules, and server rendering took 55% less time. They left the runtime. Fair.

Where I'd push back is the conclusion that you have to stop writing styles in JS to get there. The cost was never the syntax. It was *when* the work happened.

My v4 experiment had numbers on this too, and they weren't all wins. I built the same demo in Chakra v3 and v4 and compared production builds. The render timer went *up*, from about 1ms to 2.5ms, because the browser now parses a stylesheet up front instead of getting styles drip-fed. But Total Blocking Time went from 160ms to 10ms. My note at the time: "The tradeoff is CSS parse time vs. runtime computation." I'd take that trade every time.

And v2 goes one step further. The CSS was always built ahead of time, but `css()` itself still ran in the browser to put the class names together. Now it doesn't have to. Turn on [source transforms](https://panda-css.com/docs/styling/source-transforms) and your bundler rewrites the call into the string Panda already computed:

```tsx
<div className="c_red.300 p_4" />
```

As Sage put it on the stream: "Panda is already zero runtime, but in terms of like the JavaScript that it ships... we introduced the Vite plugin to remove all of that." By the time your code hits the wire, the styling engine is already gone.

<!-- verify Sage's line against the stream, ~17:00 -->

## The constraint I'd already learned

There's a catch, and it's on purpose. Panda can only generate what it can see. Back in 2023, Sage [described Panda](https://www.adebayosegun.com/blog/chakra-panda-and-ark-whats-the-plan) as "constrained to styles that can be statically analyzed." A value that only exists at runtime, like a color you fetch from an API, can't be extracted. So for v4, Sage was clear: no arbitrary values.

I agreed straight away. I'd just generated 3.8 MB of CSS trying to cover every value someone *might* use. I knew exactly what "anything goes" costs. A finite set of tokens means a finite stylesheet. You can read it. You can predict it. So can your build.

It's the same thing I wrote about in [Predictable codebase](/blog/predictable-codebase). Constraints aren't the price of a good system. Most of the time, they are the system. And for the truly dynamic stuff, there's the `style` prop and CSS variables. Panda doesn't pretend otherwise.

## Two days later

The last push to my experiment was on April 26. On April 28, I opened my first PR to Panda.

That's the short version. The long version is seven months of v2, and that one deserves its own post. But one PR from that stretch still makes me smile. In June, I opened the one that removed v1's old pipeline entirely.

In March, I rebuilt Panda by accident. In June, I deleted the old one on purpose.

Build once, at build time. It's how Panda works. Turns out it's also how I learned it: the expensive way, once, so I'd never have to pay for it again.
