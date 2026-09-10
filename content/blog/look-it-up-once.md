---
title: Look it up once
description: Part two of the Panda CSS series. A short one, all under the hood. The runtime css() call used to redo its work on every render. Now it doesn't.
date: 2026-08-18
draft: true
---

![The Panda CSS mark with the Rust, Oxc and TypeScript logos floating around it.](/images/blog/look-it-up-once/cover.svg)

Last time was [build once, at build time](/blog/build-once-at-build-time). This one stays under the hood.

Panda extracts what it can ahead of time. But not everything is knowable at build time. The styles you compose from props, the ones that change with state, still run a `css()` in the browser, or on the server during SSR. That function takes your style objects, merges them, and hands back a class string. The rules themselves already exist. The runtime just works out which ones apply.

That merge was slower than it needed to be, and it was slow in the worst possible place: on every render.

This one started outside the repo. [Jan Nicklas](https://github.com/jantimon), who builds [next-yak](https://github.com/jantimon/next-yak), spent a week [benchmarking css-in-js engines](https://github.com/jantimon/css-in-js-bench) and kept sharing what he found. Panda's runtime kept coming out slower than it should have. He was right, and the repro made it easy to trace. Here's what was going on.

## The cache that wasn't caching

We already wrapped `css()`, style props, and recipes in a small `memo()` in the generated runtime. The idea was right. Call `css({ color: 'red' })` in a hundred places, do the merge once, hand back the cached class for the other ninety-nine.

The problem was the key. To decide whether it had seen these arguments before, `memo()` ran `JSON.stringify` over them. Every call. So the "fast path" serialized the whole style object before it could even tell you the answer was already sitting there. In a variant-heavy render, that stringify was the single biggest cost in the whole `css()` path.

The fix is boring in the best way. Flat style objects get a cheap hash instead of a full serialize. Only nested or responsive values fall back to `JSON.stringify`. Same cache, cheaper key. About 30 to 40 percent faster on the SSR benchmark, for free, on styles people write all day.

## The wrapper chain

Then there's the case that looks like it should cache and doesn't.

You forward styles down through components:

```tsx
const L1 = ({ css: cssProp }) => <L0 css={[l1, cssProp]} />
```

Each level rebuilds that array every render. So even when nothing changed, the memo saw a brand new array every time, missed, and re-merged the entire chain. The deeper you nested, the worse it got.

But look at what's actually inside the array. The style objects are the same instances. `l1` is the same `l1`. Only the wrapper around them is new. So we stopped keying on the serialized contents. These calls key on the identity of the objects themselves now, walked through a trie. The trie's nodes are WeakMaps, so a style object built for one render is held onto by nothing once that render is gone. No leak, no growing heap.

Roughly 4x faster for a three-level chain, 3x for six. And plain `css({ ... })` calls don't touch any of it.

There was one trap. Keying everything on identity punishes the opposite case. Styles written inline are a fresh object every render, so they'd miss the trie every single time and pay for the bookkeeping on top. So the trie only takes over once it has actually seen the same objects come back. Inline styles stay on the cheap path. Repeated compositions land in the cache within a few renders.

## The point

None of this changes what you write. `css({ color: 'red' })` is the same call it always was. It just stopped redoing work it had already done.

That's most of what performance work looks like once the big architecture is settled. Not a rewrite. A cache that was paying full price to ask if it had the answer, taught to ask cheaply.

Talk to you soon.
