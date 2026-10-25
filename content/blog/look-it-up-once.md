---
title: Look it up once
description: "Why calling css() on every render stays cheap. The three ways Panda CSS's runtime memo builds a cache key, and why it waits before trusting an object."
seoTitle: "Look it up once: how Panda CSS memoizes css() at runtime"
date: 2026-10-20
series: Panda internals
part: 3
---

### Why calling `css()` on every render stays cheap.

![Look it up once, on a cream background with yellow and purple glows, surrounded by the Panda logo and stickers reading memo(css), WeakMap and hash, trie, string.](/images/blog/look-it-up-once/cover.svg){loading="eager" fetchpriority="high"}

*Panda internals, part 3. Part 1: [Build once, at build time](/blog/build-once-at-build-time). Part 2: [Every style is an atom](/blog/every-style-is-an-atom).*

In Panda, the CSS is already written at build time. What `css()` does in the browser is hand back class names. This call returns `'c_red.300 p_4'`:

```ts
css({ color: 'red.300', padding: '4' })
```

No CSS gets created there. But `css()` runs a lot. Every component, every render, and on the server for every request. So Panda wraps it in a small cache, `memo()`. The same goes for `cva`, `sva`, recipes and patterns in the generated `styled-system`.

A cache needs a key, and the key has to be cheap to build. Panda picks one of three, per call:

1. Flat styles get a hash of their values.
2. Composed styles get looked up by the objects inside them.
3. Everything else gets a string.

## Building the key was the slow part

The first version of this cache used `JSON.stringify`. Turn the arguments into a string, use the string as the key.

It's correct, but it runs on every call, hits and misses alike. To find out the answer was already sitting in the cache, `memo()` first had to serialize the whole style object. In a page full of variant buttons, that stringify was the single biggest cost in the whole `css()` path.

That's why the memo in v2 picks its key based on what the arguments look like.

There's also a check before any of the three. When `css()` gets a single style object, it first looks that exact object up in a `WeakMap`. Pass the same object again, like one defined once at module level, and that's the whole lookup. An object written inline is a new object on every render, though, so it misses and moves on.

## 1. Flat styles: hash the values

The call at the top of this post is the common case the hash is built for. One object, no nesting, plain strings and numbers as values.

For those, Panda skips the string entirely. It walks the object once and folds every key and value into a number:

```ts
let h = 5381
for (const key in style) {
  const text = key + String(style[key])
  for (const ch of text) {
    h = (h * 33) ^ ch.charCodeAt(0)
  }
}
```

That's simplified. If it hits a nested object halfway through, it gives up and returns `null`, and the call moves on to another path.

A hash can collide, so a match on the number isn't trusted on its own. Panda keeps a few entries per hash and compares the actual keys and values before returning anything. On a variant-heavy button benchmark, that alone gave [30 to 40 percent more SSR throughput](https://github.com/chakra-ui/panda/commit/6e3c1600dc197250ae61ccda76fb79cff6cba53f).

## 2. Composed styles: follow the objects

You build a component on top of a component, and forward styles down:

```tsx
const base = css.raw({ px: '4' })
const danger = css.raw({ bg: 'red.500' })

function Button({ css: extra = [] }) {
  const cls = css([base, ...extra])
  return <button className={cls} />
}

function DangerButton({ css: extra = [] }) {
  return <Button css={[danger, ...extra]} />
}
```

Every render builds new arrays, `[danger, ...extra]` and `[base, ...extra]`. But `base` and `danger` are the same objects every time, created once when the module loaded.

The hash can't help here, because the arguments contain arrays. And stringify serializes the whole composition again, every render, for every element.

So when the arguments contain an array, Panda keys the call on **object identity** instead of value. It walks a small tree, a trie, one step per item in the arguments:

```
root
└─ base
   └─ danger → 'px_4 bg_red.500'
```

The same objects in the same order always reach the same leaf.

Each step that holds an object is a `WeakMap`, so a style object that only lived for one render isn't kept alive by the cache.

On a three-level chain, that [took a composed call from 1.52ms to 0.85ms](https://github.com/chakra-ui/panda/commit/25137db545ce9129462662483390b49f82d85ba8). On a six-level chain, 2.11ms to 1.28ms.

### Only objects it has seen before

Keying on identity works for the chain above, but not for this:

```tsx
<Button css={[{ mt: '2' }]} />
```

That `{ mt: '2' }` is a fresh object on every render. Its identity never repeats, so the trie would never hit. Worse, every render would add new branches that nothing ever reads again. Keying every composed call on identity made this shape [about 7x slower](https://github.com/chakra-ui/panda/commit/172c52fb5326e84c3ab7e9aea2b718b1c0610ed2) than just serializing it.

So a call only gets a place in the trie once the objects in it have been seen before. Until then, it goes down the value path like any other call. Reading the trie allocates nothing, so a miss is cheap. And the "have I seen these objects?" bookkeeping only runs on every fourth miss, not every miss.

That's enough for a repeating chain to land in the trie within a few calls, while inline styles barely pay anything for being checked. The inline shape ended up faster than it was before identity keys existed.

## 3. Everything else: stringify

Responsive values, nested conditions, anything the hash bails on and that isn't a composed array:

```ts
css({ padding: { base: '2', md: '4' } })
```

These still use `JSON.stringify`. V8's stringify is native code, and it beats walking a nested object in JavaScript. For shapes that don't fit the first two paths, it's the fastest key available.

## How big the cache can get

Each part of the cache has a limit:

- The last call is checked first, because re-rendering with the same arguments is common.
- Each hash keeps up to eight entries. Older ones for the same hash drop off.
- Each cache keeps up to 500 entries. Past that, the oldest goes.
- Identity lookups use `WeakMap`s, so they don't hold on to objects your code has let go of.

Put together, on dense server-rendered pages, the [v2 benchmarks](https://panda-css.com/blog/panda-css-v2) have repeated inline styles about 3x faster than the unmemoized path, a three-level wrapper chain about 4x, a six-level chain about 3x, and repeated flat objects 30 to 40 percent faster.

## Calls that never run

Part 1 covered source transforms. With `transform: true`, the bundler replaces calls Panda can fully work out at build time with the plain class string. Those never reach the memo at all, because they never run.

What's left at runtime is what couldn't be resolved ahead of time, like styles built from props or state. Those are the calls the memo is for.

*Next in the series: [Panda never runs your code](/blog/panda-never-runs-your-code), how Panda works out your style values without ever running your code. If you're new here, start with [Build once, at build time](/blog/build-once-at-build-time) and [Every style is an atom](/blog/every-style-is-an-atom).*
