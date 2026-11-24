---
title: The dumb code that's faster
description: "Places where Panda CSS picked the simple option on purpose. A list instead of a hash map, a weaker hash, a string returned untouched, and a clever config loader that lost to the bundler it replaced."
seoTitle: "The dumb code that's faster: simple choices inside Panda CSS"
date: 2026-11-24
series: Panda internals
part: 8
---

::subtitle
Places where Panda picked the simple option, and the numbers that kept it there.
::

::post-cover
::

*Panda internals, part 8. Start with [Build once, at build time](/blog/build-once-at-build-time) if you're new here.*

I love the idea of [KISS](https://en.wikipedia.org/wiki/KISS_principle): keep it simple, stupid. It makes a whole lot of sense. The word, and maybe the whole bunch of it, haha. (Okay, don't get distracted!)

The phrase is credited to Kelly Johnson, an aircraft engineer at Lockheed. The idea was that a jet should be fixable by an average mechanic in the field, with the tools they actually have. Not by the people who designed it, in a lab.

Code has the same problem. The clever version is usually written for the best case: the benchmark it was built against, the input its author had in mind. The simple version has to hold up on whatever comes in. And a lot of the time, it's also the faster one.

Pretty much, Panda follows some of the KISS principles, and this part is about where.

Most of this series has been about clever things. A [cache](/blog/look-it-up-once) with three ways to build a key. A [table](/blog/how-panda-makes-cva-fast) that turns recipe props into an array index. [Imports](/blog/cold-vs-warm) that only retry when the file they need shows up.

This part is about the other side. Places where Panda does the plain thing, sometimes the thing that looks wrong in review, because it measured faster. And two places where the clever version shipped, lost, and was taken back out.

## A list instead of a map

When Panda reads a style object like this:

```ts
const base = { color: 'red', padding: '4' }
css({ ...base, color: 'blue' })
```

it builds a list of key and value pairs. For each new key, it walks the list from the start. If the key is already there, it replaces the value. If not, it adds the pair to the end.

```rust
pub fn upsert_object_entry(entries: &mut Vec<(String, Self)>, key: String, value: Self) {
    if let Some(entry) = entries.iter_mut().find(|(existing, _)| existing == &key) {
        entry.1 = value;
    } else {
        entries.push((key, value));
    }
}
```

Every insert can scan the whole list, so building an object of `n` keys is O(n²) in the worst case. That's the kind of line that gets flagged in review. A hash map makes each insert O(1).

But O(1) has a cost of its own. A hash map hashes every key, allocates its table and grows it as it fills up. A list of ten pairs is ten string compares in memory that sits next to each other.

I measured it on my machine (Apple M4), inserting `n` distinct keys like `fontSize` and `backgroundColor`, best of five runs:

| Keys | List | FxHashMap | std HashMap |
| ---: | ---: | ---: | ---: |
| 5 | 108 ns | 154 ns | 200 ns |
| 10 | 236 ns | 322 ns | 441 ns |
| 20 | 469 ns | 582 ns | 898 ns |
| 30 | 726 ns | 902 ns | 1,593 ns |
| 50 | 1,448 ns | 1,248 ns | 2,090 ns |
| 100 | 4,236 ns | 2,449 ns | 4,212 ns |
| 128 | 6,347 ns | 3,570 ns | 6,709 ns |
| 200 | 13,603 ns | 4,920 ns | 8,462 ns |

The list wins until somewhere between 30 and 50 keys against the fast hash map, and until roughly 100 to 128 against Rust's standard one. Writing every fourth key twice, like a spread followed by overrides, moves those lines a little earlier but tells the same story. A style object with 50 keys is rare. Most are far smaller.

The list also fits how Panda uses the object. Keys stay in the order you wrote them, and extraction walks them in that order without ever looking one up by name. A hash map would be paying for fast lookups nobody makes.

## A weaker hash

On its hot paths, Panda's hash maps don't use Rust's default hasher. The atom set, the resolver's caches and the import matchers use [FxHash](https://github.com/rust-lang/rustc-hash), the one the Rust compiler uses internally.

Rust's default hasher, SipHash, is built to resist attacks. If someone can choose the keys going into your map, like a web server reading request headers, they can pick keys that all land in the same bucket and slow the map to a crawl. SipHash makes that hard.

Panda's keys are CSS property names, token paths, symbol IDs from your own code. Nobody is attacking the compiler with crafted `fontSize` keys. So that protection is cost with nothing to protect, and FxHash skips it. In the table above, the same map with FxHash is about 1.3 to 1.9 times faster than with SipHash, depending on the size.

## Return the string untouched

With source transforms on, a component often ends up with code like this:

```js
cx('d_flex px_4', props.className)
```

`cx` joins class strings and settles conflicts between them. To do that, it splits each string into classes, works out which ones conflict and joins the result.

Most of the time, nobody passes a `className`. So `cx` gets one string and `undefined`. That's especially common for elements the transform folds past a spread. And that string came from Panda itself, which never produces two classes that conflict. There's nothing to settle.

So now, when `cx` gets exactly one string, it returns it as-is:

```js
if (parts.length === 1) {
  const only = parts[0]
  if (typeof only === 'string') return only
  if (!only) return ''
}
```

It's the cheapest kind of speedup: the work was never needed, so the code stops doing it. The trade-off is a hand-written `cx('px_2 px_4')` with nothing else: a single string you wrote with a conflict inside it is now returned as written. Panda's own output never looks like that.

## Do the same work twice

A slot recipe stores its styles in one list, with each entry tagged by slot:

```ts
sva({
  slots: ['root', 'trigger', 'content'],
  base: { root: {...}, trigger: {...}, content: {...} },
  variants: { size: { sm: { root: {...}, trigger: {...} } } },
})
```

To get the styles for one slot, Panda walks all of `base`, every variant and every compound variant, and keeps the entries for that slot. For three slots, it walks the whole thing three times. That's O(slots × styles).

The clever version groups everything by slot once, up front, into a map. Panda doesn't do that. The walk is lazy, so a caller that only needs one slot pays for one walk and nothing else. The grouped version would make that caller pay for every slot, every time.

If a profile ever shows the multi-slot callers dominating, grouping is a small change. Until then, the simple shape stays.

## One flat array

Panda writes a JSON file that describes your whole design system: every token, its value in each theme, and what it references. Panda Studio reads it to draw your tokens, and tooling reads it to answer questions like "what uses this color?"

Three shapes were measured before picking one, on generated systems from 500 to 115,000 tokens:

- **Group the values by token.** About 10% smaller. But at 115,000 tokens it was 1.8 times slower to parse and index, 311 ms against 169 ms. Lots of small arrays cost more in V8 than one big one.
- **Ship the lookup indexes in the file**, so readers don't build them. The file got 45% bigger after gzip, and parsing the extra data took exactly as long as building the indexes would have: 171 ms against 169 ms.
- **One flat array of values.** The smallest parse, and the lookup index is only built the first time something asks a question that needs it.

The flat array won. A viewer that only draws tokens never builds the index at all. On the real `preset-panda`, 516 tokens, parsing, indexing and drawing the colors takes 0.35 ms.

There's one thing they did bake in: the order tokens are shown in. It makes the file about 16% bigger, and makes the first paint about a third faster at every size, because the viewer never has to sort. So simple doesn't mean never precomputing. It means precomputing only what every reader uses.

## The cache that made HMR slower

This one is from v1, and it went the same way as the next one.

In 0.38.0, Panda put a size limit on its internal caches. Before, they were plain `Map`s that kept everything. The worry was memory: in a long-running dev server on a large project, a cache that never forgets keeps growing. So the hot caches became LRU caches, which drop the least recently used entry once they're full.

Then a [report](https://github.com/chakra-ui/panda/discussions/2608) came in from a component library running Storybook with Vite. On 0.37.2, transforming the CSS after a change took 200 to 300 ms. On 0.38.0, it got slower with every change, until a single update took over 4 seconds.

0.39.2 [removed](https://github.com/chakra-ui/panda/pull/2612) the limited caches and went back to plain `Map`s.

## The clever loader that lost

This one went the other way.

Panda has to load your `panda.config.ts` before it can do anything. It's TypeScript, so it can't just be imported. Panda used [Rolldown](https://rolldown.rs/) to bundle the config and everything it imports into one module, then ran that.

Loading the bundler took about 21 ms on a cold start. So 2.1.2 swapped it for something smarter on newer versions of Node: hook into Node's own module loader and turn each file into JavaScript as Node asks for it. No bundler. Some setups, like `tsconfig` paths and CommonJS, still went through the bundle.

Then someone [reported](https://github.com/chakra-ui/panda/issues/3976) that their config got slower. Their config imported colors from their design system package. A design system package exports the colors, and also every component. The bundler only ever saw one module. Node's loader went through the package file by file, and `@mantine/core` alone is 797 modules. Their numbers, the median of ten runs on their machine:

| Config | 2.1.1 (bundler) | 2.1.2 (per-file loader) |
| --- | ---: | ---: |
| No extra imports | 92 ms | 45 ms |
| Imports `@mantine/core` | 276 ms | 439 ms |
| Their real app | 639 ms | 1,208 ms |

The new path won on configs that import nothing, and lost on the configs real teams write. Renaming the config to `.cts` sent it back through the bundler and brought their app down to 602 ms. 2.2.0 reverted the change. Panda bundles the config again, now with tree-shaking, so a config that imports one export from a large package doesn't load the rest. Turning on Node's compile cache for the CLI wins back part of the startup cost.

The same batch of work had a smaller version of the same lesson. A cache kept the bundled config on disk between runs and reused it while the files it included hadn't changed. A cold load with the base preset dropped from about 33 ms to about 11 ms. But it checked the files, not how they resolved. Point a `tsconfig` path at a different file, and the cache kept serving the old config. It was taken out before it ever shipped. What shipped instead was simpler: installed ESM presets are imported straight through Node, so an unchanged preset loads once per process.

## When the dumb code was the slow code

KISS isn't "never cache". Sometimes the plain version is the slow one.

`staticCss` lets you generate CSS for styles you don't write in code, like every spacing value under every container size. Before v2 shipped, a large `staticCss` config took 12 to 14 seconds to build on the new Rust engine. Almost all of it was spent writing out the CSS.

The cause was a lookup that rebuilt itself on every call. For each condition on each rule, Panda rebuilt the map of container queries from your theme, then searched it from the top. With a bigger container scale, both got bigger, so the cost grew with rules × containers². The fix was to build that map once, when the theme is loaded.

I ran Panda's benchmark for this on my machine, on the commit before the fix and on today's code. It holds the rule count at about 9,300 and only grows the container scale. Within each run, the CSS output is the same size in every row, so the extra time buys nothing:

| Containers | Before the fix | After the fix |
| ---: | ---: | ---: |
| 4 | 239 ms | 18 ms |
| 8 | 672 ms | 19 ms |
| 14 | 1,726 ms | 20 ms |
| 32 | 8,601 ms | 21 ms |
| 64 | 32,325 ms | 23 ms |

Before the fix, going from 4 containers to 64 made the build 135 times slower. After it, about 1.3 times. `preset-panda` ships 14 container sizes, so a real project sat on the 1.7 second row for output that takes 20 ms. Panda's own notes put the full config from the original report at 12 to 14 seconds before the fix and about 0.3 seconds after.

So the plain thing isn't always the list or the string. Here it was "work it out once". The rule is the same either way: measure on the shape your users have.

## Every one of these is written down

In Panda's Rust code, choices like the list and the slot walk are marked next to the line that depends on them, with the reason. The rule that goes with them: don't flip one without benchmark data. A reviewer who wants a hash map there brings numbers first.

That rule cuts both ways. The per-file config loader was faster on the config it was tried on. It lost on the configs nobody had tried yet. So the benchmark has to be the shape your users actually have, not the one that's easy to set up.

Some of this already showed up earlier in the series:

- **`memo()` still uses `JSON.stringify`** for nested styles, because V8's native stringify beats walking the object in JavaScript. [Part 3](/blog/look-it-up-once#_3-everything-else-stringify) covers it.
- **The recipe cache falls back to a list of 16** recent prop combinations, compared value by value, once the table would get too big. [Part 6](/blog/how-panda-makes-cva-fast#remembering-the-answer) covers it.
- **Barrels point at the module that declares a name** instead of copying every export into the barrel. [Part 7](/blog/cold-vs-warm#when-the-file-you-saved-is-imported) covers it.

## What this means for your code

- **Import tokens from a small module in your config.** Bundling with tree-shaking helps, but a config that imports from your component library's entry point still pulls more in than one that imports from a `tokens` file.
- **Keep style objects the size they are.** There's no reason to split a big style object for speed. Panda's list is fast at the sizes people actually write.

## Simple until measured

None of these choices is simple because simple is a virtue on its own. Each one is simple because someone measured it on the inputs Panda actually gets, and the simple version won. When the inputs change, the measurement gets run again.

*Next, part 9: running the Rust compiler in the browser. If you missed the earlier parts: [Build once, at build time](/blog/build-once-at-build-time), [Every style is an atom](/blog/every-style-is-an-atom), [Look it up once](/blog/look-it-up-once), [Panda never runs your code](/blog/panda-never-runs-your-code), [What runtime means in Panda](/blog/what-runtime-means-in-panda), [The IR behind your ternary](/blog/the-ir-behind-your-ternary), [How Panda makes cva fast](/blog/how-panda-makes-cva-fast), [Cold vs warm](/blog/cold-vs-warm).*
