---
title: Cold vs warm
description: "Why Panda CSS watch mode got fast. A long-lived compiler, a hash check before every parse, an atom union that updates one file at a time, and imports that only retry when the file they need shows up."
seoTitle: "Cold vs warm: how Panda CSS made watch mode fast"
date: 2026-11-26
series: Panda internals
part: 7
draft: true
---

::subtitle
What Panda does when you start it, and what it does when you hit save.
::

::post-cover
::

*Panda internals, part 7. Start with [Build once, at build time](/blog/build-once-at-build-time) if you're new here.*

This part was supposed to go out last week.

Last week I got the news that my friend, Asunlewon Babalola, had passed away. At the same time I was preparing for my final year convocation and induction. Between the two, and paying my respects to him, I couldn't function properly, so the post waited.

Olumide Dickson Sosanya wrote about him in [The point of life is not to die](https://dicksonsosanya.substack.com/p/the-point-of-life-is-not-to-die). If you want to know who he was, start there.

---

When I was experimenting with Chakra v4 on Panda v1, running it on the whole design system froze my PC. That was after the [3.8 MB generator](/blog/build-once-at-build-time) from part 1, when we moved the experiment onto Panda itself.

I covered the headline numbers in my SailsConf talk, [Rebuilding Panda's Engine](/talks). This is the part the talk didn't have time for.

Panda runs in two very different situations.

The first is a **cold** run. You type `panda` or start your dev server, and Panda has nothing yet. It reads every file in your `include`, finds the style calls and builds the stylesheet from scratch.

The second is a **warm** run. The dev server is already up, you change one file and save. Panda already knows about every other file. The only question is what that one save changes.

A cold run happens a few times a day. A warm run happens every time you save. This post is about both, and mostly about the second.

## What v1 kept in memory

Panda v1 was built on [ts-morph](https://ts-morph.com/), a wrapper around the TypeScript compiler. At startup it created a TypeScript `SourceFile` for every file in your `include`. When you saved, it called `reloadSourceFile()` to read that file from disk again and parsed it with the TypeScript compiler. When a style used a value from another file, it added that file to the same TypeScript project.

The watch mode in my Chakra v4 experiment ran on that same call.

So the whole program sat in memory, and every save went through the TypeScript parser. That works. It's also a lot of machinery for the question Panda actually asks: what value does this style call get?

## Cold: one parse, and skip what you can

Part 1 already walked through the [cold pipeline](/blog/build-once-at-build-time), from [reading your files](/blog/build-once-at-build-time#_1-read) to [turning them into CSS](/blog/build-once-at-build-time#_4-turn-it-into-css). Two things make it fast in v2.

First, each file is parsed once with [Oxc](https://oxc.rs/), and that one parse is used for imports, `css()` calls, JSX and resolving values.

Second, Panda reads the imports before anything else, the same import matching [part 4](/blog/panda-never-runs-your-code) starts from. If a file doesn't import from your `styled-system`, extraction stops there and Panda never looks for style calls in it. In a real project that's a lot of files: framework boilerplate, generated code, anything in `include` that doesn't style anything. One exception: when your config sets a JSX framework, Panda still checks every file for JSX.

On 100 generated files, extraction went from 184 ms on v1.11.3 to about 5 ms. Measured later against v1.12.0 on the same machine, v1 came in at 125 to 134 ms, which makes it about 21×. Either way, the cold run stopped being the slow part. The [Panda 2.0 release post](https://panda-css.com/blog/panda-css-v2) has the full set of benchmarks.

## Warm: a compiler that stays alive

The bigger change is in what happens after the cold run. In v2, `createCompiler(config)` returns a long-lived compiler, not a function you call once.

The expensive setup happens when it's created. Your config is compiled into the things extraction needs: import matchers, utilities, conditions, the token dictionary, recipes. That's done once. Every file after that reuses it.

Then a save goes through `refreshFile(path)`. A few things keep it cheap.

### A hash before the parse

Panda keeps a hash of each file's source. On a save it reads the file, hashes it and compares the result to the stored hash. If they match, it returns the last result without parsing.

Saving a file you didn't change costs a read and a hash. So does a watcher that fires twice for the same write. The check is skipped when Panda knows the file needs another pass, for example when a file it imports from changed (more on that below).

### Add on save, replace on build

Each file owns its own bucket of [atoms](/blog/every-style-is-an-atom) and recipes. What happens to that bucket depends on which run you're in.

Say you change this:

```ts
css({ color: 'red' })
```

to this:

```ts
css({ color: 'blue' })
```

In watch mode, Panda adds `color: blue` to the file's bucket and leaves `color: red` where it is. The dev stylesheet gains a class and loses nothing.

That's deliberate. During development, your stylesheet and your code don't update in the same instant. The CSS can be rebuilt while the browser is still running the old version of a component. And because files can fold values from each other ([more on that below](#when-the-file-you-saved-is-imported)), one save can refresh several files, one after another. If a save could take classes away, something still on screen could lose its styles halfway through an update. Only adding means a class never disappears while you work.

The cost is a dev stylesheet that grows a little over a session. Deleting a file still removes its classes, and a full parse, like `panda` or a fresh dev server start, drops each file's old bucket before the new one goes in. `color: red` is gone, and the build you ship has only what your code uses.

### A count for every atom

Two files can use the same atom. That's the point of [atomic CSS](/blog/every-style-is-an-atom#same-declaration-many-names): one class, shared by everyone who needs it. If one file stops using `color: red` and the other still uses it, the atom has to stay. So Panda keeps a count next to every atom in the project:

```rust
atoms_cache: FxHashSet<Atom>
atom_counts: FxHashMap<Atom, u32>
```

Adding a file's atoms increases their counts. Replacing or removing a file decreases them, and an atom leaves the project when its count reaches zero.

That keeps the bookkeeping for a file proportional to that file. Panda doesn't rebuild the project's atom set from every file to take one file in. The stylesheet itself is still sorted and written from the whole set each time CSS is generated.

On a single file, re-parsing went from about 650 microseconds on v1.11.3 to under 2. Against v1.12.0 on the same machine it's 330 microseconds to 1.4, about 235×.

## When the file you saved is imported

Part 4 showed that Panda [follows imports](/blog/panda-never-runs-your-code#imports-from-other-files) to fold values from other files:

```ts
// tokens.ts
export const brand = 'purple.500'

// button.tsx
import { brand } from './tokens'
const styles = css({ color: brand })
```

Now edit `tokens.ts`. Nothing in `button.tsx` changed, but its CSS did.

Every time Panda extracts a file, it records which files it read values from, and the hash of each one at that moment. The project turns that around into a map from each file to the files that import from it:

```
tokens.ts → button.tsx (folded with hash H)
```

When `tokens.ts` is parsed again with a new hash, Panda looks it up in that map. Any importer that folded a different hash is now out of date. Those importers come back from `affectedFiles()`, and the driver refreshes them. A refresh can make more files out of date, so it keeps asking until the list is empty.

The hash check also keeps cold runs from doing double work. During a cold run, `button.tsx` might be parsed first. It reads `tokens.ts` and folds its current hash. When `tokens.ts` is parsed later in the same run, the hash matches, nothing is out of date, and nothing is parsed twice.

Barrel files work the same way, with one more step. (Part 4 covers [which import shapes Panda follows](/blog/panda-never-runs-your-code#imports-from-other-files) at all.) An `export { brand } from './tokens'` line isn't folded into the barrel. Panda records where the name points, and a lookup goes straight to `tokens.ts`. So a barrel only depends on its own text. In a synthetic benchmark, transforming 1,000 files that import from a barrel of 1,000 re-exports took 14.7 seconds before that change. Now it takes 125 ms.

Two cases still don't fold: a name that two `export *` lines bring in from different modules, and `export *` from a package in `node_modules`.

## When the file doesn't exist yet

One case is easy to miss. You write the import first:

```ts
import { brand } from './tokens'
```

and only then create `tokens.ts`. Until it exists, the import fails. Panda keeps the failed import, so it can try again later.

The first version tried every failed import again whenever any file was added. One new file, every failed import checked. A thousand new files, every failed import checked a thousand times. The work grew with files × failed imports.

That shows up in places you wouldn't expect. The PostCSS plugin's first build adds every file this way. So do watch updates when new files appear. On a project where every file had one import that didn't resolve, adding 1,000 files took about 15 seconds.

The fix is to record **where the resolver looked**. When an import fails, the resolver ([oxc_resolver](https://github.com/oxc-project/oxc-resolver)) can report every path it tried and didn't find: the extension candidates like `tokens.ts` and `tokens.tsx`, `index` files, `tsconfig` path targets, missing `node_modules` folders. Panda stores the failed import under each of those paths.

When a file is added, Panda looks up its path, and then each of its parent folders, in that record. The parent folders are what make a new folder work: if you create `tokens/index.ts` and `tokens/` didn't exist before, the folder matches. Only the imports that match are tried again. Everything else is left alone.

Adding a file now costs a few lookups, no matter how many imports are unresolved. It's the same approach as webpack's `missingDependencies` and TypeScript's failed lookup locations.

On that same generated project, with every file holding an unresolved import:

- 1,000 files added in one batch (the PostCSS first build): 15,578 ms → 152 ms
- 1,000 files added one at a time (watch updates): 15,320 ms → 151 ms
- 4,000 files added one at a time: 929 ms

The CSS output was identical in every case. On 4,000 files, the old approach took over 152 seconds even with every update batched.

Refreshes are batched too. When several files change at once, affected importers are refreshed once at the end, not after every file.

## What warm doesn't cover yet

A few limits are worth knowing:

- **No cache between runs.** Every cold start parses your files again. `cacheDir` exists in the API, but nothing is stored on disk yet.
- **Dev CSS only grows.** Every save adds classes and none are removed until the next full parse. It doesn't change what you see, only what's in the dev stylesheet. To check what a full build actually ships, [`panda analyze`](/blog/know-what-your-css-actually-uses) is the tool.
- **New packages need a restart.** The watcher only sees project files. If you install a package into `node_modules` while Panda is running, an import from it won't resolve until you restart.
- **Files are parsed one after another.** Pattern, utility and [source transform](/blog/the-ir-behind-your-ternary) callbacks can call back into JavaScript, so `parseFiles()` stays ordered for now.

## What this means for your code

- **Leave the dev server running.** The warm path is where the work went. If the dev stylesheet feels bloated after a long session, a restart starts it clean.
- **Shared values can live in their own files.** Importing a token from `tokens.ts` costs a hash check on save, and only its importers refresh when it changes. Keep them [static enough for Panda to read](/blog/panda-never-runs-your-code).
- **Barrels are fine.** Re-exports point straight at the module that declares the name. Avoid two `export *` lines that bring in the same name.
- **Write the import before the file if you like.** Panda picks it up when the file appears, without slowing down everything else.
- **Restart after installing a package** you import styles from.

## Start once, save often

A cold run does the full job, once. Everything after that is about doing as little as the save needs: one hash, one file's atoms, and only the importers that read from what changed.

*Next, part 8: the dumb code that's faster. If you missed the earlier parts: [Build once, at build time](/blog/build-once-at-build-time), [Every style is an atom](/blog/every-style-is-an-atom), [Look it up once](/blog/look-it-up-once), [Panda never runs your code](/blog/panda-never-runs-your-code), [What runtime means in Panda](/blog/what-runtime-means-in-panda), [The IR behind your ternary](/blog/the-ir-behind-your-ternary), [How Panda makes cva fast](/blog/how-panda-makes-cva-fast).*
