---
title: Look it up once
description: Why calling css() on every render stays cheap. The three ways Panda's runtime memo builds a cache key, and why it waits before trusting an object.
date: 2026-10-17
draft: true
---

### Why calling `css()` on every render stays cheap.

![Look it up once, on a cream background with yellow and purple glows, surrounded by the Panda logo and stickers reading memo(css), WeakMap and hash, trie, string.](/images/blog/look-it-up-once/cover.svg){loading="eager" fetchpriority="high"}

*Panda internals, part 3. Part 1: [Build once, at build time](/blog/build-once-at-build-time). Part 2: [Every style is an atom](/blog/every-style-is-an-atom).*

Part 1 ended in the browser. The CSS was already written at build time, and all `css()` had left to do was hand back class names. This call returns `'c_red.300 p_4'`:

```ts
css({ color: 'red.300', padding: '4' })
```

No CSS gets created there. But that string still has to be worked out, and `css()` runs a lot. Every component, every render, and on the server for every request. So Panda wraps it in a small cache, `memo()`. The same goes for `cva`, `sva`, recipes and patterns in the generated `styled-system`.

The idea of a cache is simple. Seen these arguments before? Return the answer you saved. The interesting part is the first half of that sentence. How do you decide, cheaply, that you've seen these arguments before?

## The key used to be the cost

The first version of this cache used `JSON.stringify`. Turn the arguments into a string, use the string as the key.

That works, and it's correct. It's also slow, because it runs on every call, hits and misses alike. To find out the answer was already sitting in the cache, `memo()` first had to serialize the whole style object. In a page full of variant buttons, that stringify was the single biggest cost in the whole `css()` path.

So the memo in v2 doesn't build its key one way. It picks one of three, per call, based on what the arguments look like.

## 1. Flat styles get a hash

Most `css()` calls look like the one above. One object, no nesting, strings and numbers as values.

For those, Panda skips the string entirely. It walks the object once and folds every key and value into a number:

```ts
let h = 5381
for (const key in style) {
  for (const char of key) h = (h * 33) ^ char.charCodeAt(0)
  for (const char of String(style[key])) h = (h * 33) ^ char.charCodeAt(0)
}
```

That's a simplified version, but it's the shape of it. If it hits a nested object halfway through, it gives up and returns `null`, and the call moves on to another path.

A hash can collide, so a match on the number isn't trusted on its own. Panda keeps a few entries per hash and compares the actual keys and values before returning anything. Same answer as before, without building a string first. On a variant-heavy button benchmark, that alone gave 30 to 40 percent more SSR throughput.

## 2. Wrapper chains get identity

Composed styles are where the hash runs out.

You build a component on top of a component, and forward styles down:

```tsx
const base = css.raw({ px: '4', rounded: 'md' })
const danger = css.raw({ bg: 'red.500', color: 'white' })

function Button({ css: extra = [] }) {
  return <button className={css([base, ...extra])} />
}

function DangerButton({ css: extra = [] }) {
  return <Button css={[danger, ...extra]} />
}
```

Every render builds brand new arrays. `[danger, ...extra]` is a new array. `[base, ...extra]` is a new array. But `base` and `danger` are the exact same objects every time. They were created once, when the module loaded.

The hash can't help here, because the arguments contain arrays. And stringify serializes the whole composition again, every render, for every element. The arrays are new. The objects inside them aren't.

So when the arguments contain an array, Panda keys the call on **object identity** instead of value. It walks a small tree, a trie, one step per object:

```
root
└─ base
   └─ danger  → 'px_4 bdr_md bg_red.500 c_white'
```

Same objects, in the same order, land on the same leaf. No string, no hash. Just "have I been here with these exact objects?"

Each step that holds an object is a `WeakMap`, so if a style object only lived for one render, the cache doesn't keep it alive. Once your code lets go of it, so does the trie.

On a three-level chain, that took a composed call from 1.52ms to 0.85ms. On a six-level chain, 2.11ms to 1.28ms.

## Why it waits before trusting an object

Keying on identity is right for the chain above. It's wrong for this:

```tsx
<Button css={[{ mt: '2' }]} />
```

That `{ mt: '2' }` is a fresh object on every render. Its identity never repeats, so the trie would never hit. Worse, every render would add new branches that nothing ever reads again. Keying every composed call on identity made this shape about **7x slower** than just serializing it.

So the trie doesn't take everything. A call only gets a place in it once the objects in it have been seen before. Until then, it goes down the value path like any other call. Reading the trie allocates nothing, so a miss is cheap. And the "have I seen these objects?" bookkeeping only runs on every fourth miss, not every miss.

That's enough for a repeating chain to land in the trie within a few renders, while inline styles barely pay anything for being checked. The inline shape ended up faster than it was before identity keys existed.

## 3. Everything else gets a string

Responsive values, nested conditions, anything the hash bails on and that isn't a composed array:

```ts
css({ padding: { base: '2', md: '4' } })
```

These still use `JSON.stringify`. V8's stringify is native code, and it beats walking a nested object in JavaScript. For shapes that don't fit the first two paths, it's the fastest key available.

## Keeping it small

A cache that only grows is just a slow memory leak. So every part of it has a ceiling:

- **The last call is checked first.** Re-rendering with the same arguments is so common that it gets its own shortcut before any lookup.
- **Eight entries per hash.** Enough to survive collisions, not enough to matter.
- **500 entries per cache.** Past that, the oldest goes.
- **Identity nodes are `WeakMap`s.** They hold nothing your code has let go of.

Put together, on dense server-rendered pages, the v2 benchmarks have repeated inline styles about 3x faster than the unmemoized path, a three-level wrapper chain about 4x, a six-level chain about 3x, and repeated flat objects 30 to 40 percent faster.

## The calls that stay

There's one more way to make a `css()` call cheap. Don't make it.

Part 1 covered source transforms. With `transform: true`, the bundler replaces calls Panda can fully work out at build time with the plain class string. Those never reach the memo at all, because they never run.

What's left at runtime is what couldn't be known ahead of time. Composed styles, props, anything that depends on state. That's exactly what the memo is built for. Look it up once, and every render after that is a lookup.
