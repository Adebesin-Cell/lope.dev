---
title: New engine, new origin
description: How a Chakra v4 conversation turned into Panda CSS v2. The questions, the POC, the feedback we asked for, the JS work we threw away, and the day we said "Rust it".
date: 2026-09-29
readingTime: 11min
draft: true
---

### This started as a Chakra v4 question and ended with us rewriting Panda in Rust.

![New engine, new origin. The Panda CSS mark between Rust and Chakra UI chips, with the install size dropping from 111 MB to 37 MB.](/images/blog/new-engine-new-origin/cover.svg){loading="eager" fetchpriority="high"}

In January to March, after I was done with the codemod for Chakra v3, Sage (Segun Adebayo) and I started talking about Chakra v4. We wanted v4 to be smooth, so we had a lot of conversations about it.

During those conversations, the idea came up of moving Chakra to [Panda CSS](https://panda-css.com) and swapping out the Emotion layer. We couldn't do that yet though, because of some limits in how Chakra works today and how Panda worked at the time.

This is the story of how that turned into Panda v2, which shipped today.

## A lot of questions

Before writing any code, I wanted to understand what we were actually building. So I read up on how other libraries handle zero-runtime styling (Panda, Vanilla Extract, Linaria, Kuma UI) and came back to Sage with a long list of questions. Should style props like `<Box p={4} bg="red.500" />` still work? Would they compile statically, or would some runtime stay? How much of Chakra's theme maps to Panda tokens? Do multi-part components move to slot recipes?

Sage answered every single one, and at the end said they loved the questions.

Those answers set the direction for everything after. Style props stay, but they only work for CSS that already exists. So for this to work:

```tsx
<Box p="4" bg="red.500" />
```

we need `.p_4` and `.bg_red.500` generated ahead of time. Chakra's theming API already matches Panda about 80 to 90% of the time, because that was a big focus of v3. Multi-part components move to slot recipes (`sva`). And there'd be no arbitrary values at the start, so if you really need one, you use the `style` attribute or turn on static extraction.

The goal was zero runtime CSS first, then ease of migration, because static CSS can't be the reason we break the ecosystem.

Sage laid out two ways to get there. The first was using the Panda compiler fully, which works but is a drastic change that might irritate the community, since everyone would need a `panda.config.ts`. The second, and the one Sage recommended, was using Panda's internal packages plus a Chakra CLI to pregenerate the utility and recipe CSS ahead of time. Kinda like Mantine, where you import a CSS file per component, or Vanilla Extract, which pregenerates sprinkles and the types that match them.

## The POC

So I built a small one, a generator that reads theme tokens and writes a `utilities.css` with CSS variables and atomic classes, plus a tiny runtime that maps style props to those classes:

```tsx
<Box p="4" bg="red.500" rounded="md">Hello</Box>
// becomes
<div class="p_4 bg_red_500 rounded_md">Hello</div>
```

There was no style computation in the browser at all. But the test theme had about 396 tokens, and generating every utility for them came out to about 62k rules, roughly 3.8MB of raw CSS. 😅

I invited Sage to the repo, then disappeared for a week, because I was still in final year and had exams.

Sage's first comment was to drop my custom script and use the Panda package directly, so users could choose what gets pregenerated with `staticCss`. The CSS is too big to ship all of it, and that's exactly the kind of control Panda already has.

The POC grew into two packages, `panda-preset` (tokens, recipes, the design system bits) and `react-next` (components plus the Panda runtime), with four components working: accordion, badge, carousel and dialog. No pre-built CSS ships. You install it, add our preset to your `panda.config.ts`, run codegen, import the CSS, and customize with `theme.extend`.

Then Sage raised the question that ended up mattering most. If the styled-system moves into its own `@chakra-ui/styled-system` package, and the user runs codegen, how does their output override ours? My answer was tsconfig paths, mapping `@chakra-ui/styled-system/*` to the user's local `./styled-system/*`, set up for you by a `chakra init` command, like `tailwind init` or `panda init`.

That worked for a POC, but it was a workaround for something Panda didn't really support: shipping a design system that other apps build on.

## Why not just do it in v3?

I also asked Sage a bit of a personal question: why static CSS now, and what delayed it until this point?

Sage explained that v3 already had a lot on its plate. Chakra's design system needed a redesign, it needed new components from Ark and Zag to be on par with Mantine, Ant Design and MUI, and the component props and APIs needed streamlining. Doing all of that and landing static CSS at the same time would have been a very big breaking change. So we went gradually, component parity and system alignment first, static CSS after.

So we said, let's work our way up the chain to prepare for Chakra v4. That meant major releases underneath Chakra first, and those are coming along pretty nicely ([Ark in v6](https://github.com/chakra-ui/ark/discussions/3997) with render props, [Zag in v2](https://v2.zagjs.com/) with a new machine API). And right at the bottom of that chain was Panda.

![Working up the chain: Panda v2 first, then Zag v2, then Ark v6, then Chakra UI v4. Each one builds on the one before it.](/images/blog/new-engine-new-origin/up-the-chain.svg)

## What Panda v1 couldn't carry

Now, Panda v1 was good, but it had real drawbacks when building large systems. The first was speed. Others were some limited APIs, some APIs that needed to go, and some packages that wouldn't make it into the next version.

On speed, v1 ran extraction and evaluation through `ts-morph` and `ts-evaluator` in Node, so a whole TypeScript program sat in the hot path. That was fine for one app, but on a big monorepo every build and every rebuild paid for it.

Some APIs just didn't go far enough. Writing one theme key without `extend` claimed far more than you meant, so overriding a single color took `spacing`, `fonts` and `radii` from your preset with it. And v1 reset 34 CSS variables (`--translate-x`, `--blur` and friends) on every element, whether you used those utilities or not. There were smaller ones too, like `createStyleContext` doing double duty for both recipe kinds.

Then there were the things that had to go, like the template literal syntax, `defineParts`, `panda ship`, CommonJS, a handful of config options, and most of the internal packages, which were really just the old pipeline in pieces. The [upgrade guide](https://panda-css.com/docs/get-started/upgrading-to-v2) has the full list.

The one we felt the most was distribution. How do you ship a design system built with Panda to other apps? The honest answer in v1 was: carefully. An app using your design system had to line up four config fields by hand:

```ts
import { acmePreset } from '@acme/lib/preset'

export default defineConfig({
  presets: ['@pandacss/dev/presets', acmePreset],
  importMap: '@acme/styled-system',
  outdir: '@acme/styled-system',
  include: [
    './src/**/*.{ts,tsx}',
    './node_modules/@acme/lib/dist/panda.buildinfo.json',
  ],
})
```

The library side wasn't better. Authors ran three commands (`panda codegen && panda ship && panda emit-pkg`) and still hand-wrote a manifest on top, and if one design system extended another, it had to import its parent's preset straight out of `node_modules`. The same problem I'd hit in the Chakra POC, other teams had been living with for a while.

So before we started building, we asked the ecosystem what they wanted from v2.

## Asking first

The requests came in on Discord and [in a GitHub discussion](https://github.com/chakra-ui/panda/discussions/3522), from teams running Panda on anything from one app to hundreds of repos. Here's what people asked for:

- A faster engine. Big apps were hitting 30s+ builds and rebuilds in watch mode, and one codebase with about 3,300 files in the Panda include took around 64 seconds and 4GB of memory per build.
- A real way to share a design system. The workaround was shipping `dist` files that import `@/styled-system` and asking every app to alias it in their bundler config. It worked, but it was fragile, and really hard to explain to a team.
- Tree-shaking design system CSS, so an app that uses 10 of 100 components doesn't ship the CSS for all 100.
- Smaller CSS output, by removing unused CSS variables.
- A JSON map of the tokens that actually made it into the CSS.
- Public and private tokens, so consumers only see the semantic layer.
- A `strictTokens` that isn't too strict, so `inherit`, `none`, `margin: auto` or `fit-content` don't need the `[]` escape hatch.
- `panda debug` that explains why a class got dropped.
- A linter that fails on invalid CSS, ideally running on oxlint too.
- Fewer required dependencies, since Panda was the only thing still pulling esbuild into some projects.
- Smaller `.d.ts` files, so `isolatedDeclarations` works.
- Official AI skills, because agents will copy an anti-pattern very happily if it gets the job done.
- Help with micro-frontends and design system versions colliding across apps.
- `light-dark()` token output, responsive variants in regular recipes, and an easier way to target child components.

We tried our best to work on every single request.

## JS first, then Rust

Our early work was building those features in JS.

In April, I opened a PR adding `createRecipeContext` and `createSlotRecipeContext` to the JSX output, the helpers Chakra's static components would sit on. It never merged. It went straight into the Rust port instead, and in v2 those two helpers replace `createStyleContext`.

Then in May I started on design system support: one `designSystem` field for apps, one `panda lib` command for authors, and a manifest that records the chain, so a library never reaches into its parent's `node_modules`. It grew to over 42k lines across 588 files and 100 commits, with sandboxes that stacked design systems seven levels deep to see what broke.

It worked, but it was all sitting on the v1 pipeline.

So we had to take a pause, because we could see we'd be hacking if we kept going that route. Every feature on the list was getting bolted onto an engine that was already the slow part. Around the same time the community gave us a few motivations too ([pnpm moving to Rust](https://pnpm.io/blog/releases/12.0) and [Bun rewriting itself in Rust](https://github.com/oven-sh/bun/pull/30412)).

So we decided to tear down what we knew of Panda v1, and said:

"Rust it."

![Panda v1 ran on Node with a JavaScript runtime, Panda 2.0 runs on Rust and compiles anywhere](/images/blog/new-engine-new-origin/node-to-rust.svg)

I closed my design system PR. 🙂‍↔️

Honestly, closing it was okay with me, since I'd be the one building the new design on the new engine anyway.

Sage started the base work on the Rust foundation while I kept working on the design system features. On May 15 the first Rust workspace landed on the `v2` branch, and from there it was a lot of commits: an Oxc-based extractor, bindings for Node and WASM, codegen, the stylesheet engine. By June the old v1 Node pipeline was gone completely, over 226k lines deleted in one PR.

My side was the question from the POC, answered properly this time. I rebuilt the design system work on the new engine, the same idea from the closed PR, this time without v1 underneath it. In v2, a design system package runs `panda lib`, and an app points at it with one field:

```ts
export default defineConfig({
  designSystem: '@acme/ds',
})
```

The app loads a small manifest the package publishes instead of re-extracting its source, so there are no tsconfig paths and no bundler aliases. Design systems can build on other design systems, and the app still gets the `css()` and `cva()` helpers to build its own components on the same tokens. That's exactly what Chakra v4 needs.

![Design system flow: the author runs panda lib to ship a manifest, preset and build info; the consumer sets designSystem and reuses the pre-extracted styles](/images/blog/new-engine-new-origin/design-system.svg)

## What shipped

Going back to that list, here's what made it:

- The Rust/Oxc compiler, replacing the ts-morph pipeline.
- `designSystem` and `panda lib` for publishing and consuming design systems, with nested design systems and version-skew checks.
- `optimize.treeshakeDesignSystem`, plus bundler plugins for Vite, webpack, Rollup and Bun.
- `optimize.removeUnusedTokens` and `removeUnusedKeyframes`.
- A design system spec, `design-system.json`, with every token, recipe and pattern.
- `@pandacss/eslint-plugin` with an oxlint entry, including a `no-primitive-token` rule for the public vs private token question.
- Native CSS keywords under `strictTokens` for categories you haven't defined tokens for.
- `panda debug`, with a `--zip` flag for single-archive bug reports.
- No more esbuild or lightningcss. Vue, Svelte and Astro support is built in, `@pandacss/mcp` is its own package, and PostCSS is an optional peer.
- A guide for small `.d.ts` files with isolated declarations.
- Official Panda agent skills, and a micro-frontends guide.

## And a lot more

That was just the list people sent us. Once the new engine was in, a lot more came with it.

The part I like most is watch mode. When you save a file, Panda now re-parses it with Oxc in under 2 microseconds, where v1 took about 650, so roughly 360× faster. `staticCss` got the same kind of jump, a 29,000-rule config went from 25.7 seconds to about 0.3.

![In v1 the build, playground, and editor each parsed your files separately and drifted apart; in v2 one Oxc parse feeds all three.](/images/blog/new-engine-new-origin/one-parse.svg)

And it's one engine everywhere. It ships as a native binding for the CLI and bundlers, and as a ~490 KB WebAssembly build for the browser, so the playground and your build produce the same CSS.

![How much faster is Panda 2.0: extraction 15 to 37 times faster, watch-mode re-parsing about 360 times faster, staticCss about 85 times faster, 99 percent fewer TypeScript type instantiations, runtime css() up to 4 times faster](/images/blog/new-engine-new-origin/speed-snapshot.svg)

There's a lot more than I can fit here (new factories like `viewTransition()` and `firstThatWorks()`, a typography preset, source transforms, editor completions, a better CLI), and the [2.0 release post](https://panda-css.com/blog/panda-css-v2) goes through all of it.

## The beta

We opened [a feedback thread](https://github.com/chakra-ui/panda/discussions/3599) in June when the first beta went out. It shaped v2 more than anything else.

People installed betas, compared output against v1 line by line, and sent minimal repros and debug dumps, covering nested selectors, Astro frontmatter, `textStyles` in `globalCss`, `strictTokens` types, shadow tokens and the design system migration path. Each report was a problem we got to fix before release instead of after.

And then the numbers started coming in. On that 3,300-file codebase:

| | v1 (1.11.x, ts-morph) | v2 beta (Rust/Oxc) |
|---|---|---|
| Wall time | ~64 s | ~3.8 s |
| CPU time | ~76 s | ~1.5 s |
| Peak memory | ~4 GB | 157 MB |
| Output | 579 KB CSS | 558 KB CSS |

About 17× faster, with slightly *smaller* CSS. Another monorepo saw around 25% off its whole build pipeline, and Storybook booted quicker.

It wasn't all wins. On one monorepo with about 3.4k files, `codegen` got about 9× faster, but `cssgen` was actually *slower* than v1 at that size. Cross-file resolution was scaling badly with file count. We got a profile and a debug dump, and fixed it before release. I'm glad it was found in a beta and not in someone's production build.

## Smaller, too

One thing I didn't expect to enjoy this much is the install size.

`@pandacss/dev@1.11.5` was 111.1 MB with 228 dependencies. `2.0.0` is 37.2 MB with 41. That's about a third of the size.

![The @pandacss/dev install size on npmx, flat at around 90 to 110 MB for every v1 release, then dropping to 37 MB at 2.0.0.](/images/blog/new-engine-new-origin/install-size.png)

![npmx timeline for @pandacss/dev 2.0.0: install size 37.2 MB, 41 dependencies, down 61% (58 MB) from 1.12.1 with 100 dependencies removed and the module type changed to ESM.](/images/blog/new-engine-new-origin/install-size-2-0-0.png)

## What didn't make it

Not everything on the list made it. There's no built-in `light-dark()` token output yet, no hashing that dedupes the same design system version across micro-frontends, and no nicer way to target child components. They're still good ideas, they just need more people asking for them, so if you want them, say so in an issue.

## Step one

Panda v2 is out today, around 160 merged PRs and a lot more commits straight onto the branch.

Thank you to Sage, for the answers, the Rust foundation, and the patience. And thank you to everyone who tested the betas and sent repros and debug dumps.

But for me this was always step one. It started as a Chakra v4 question: how do we make Chakra static without breaking everyone? Panda v2 is the engine for that, [and now we get to build v4 on top of it](https://github.com/chakra-ui/chakra-ui/discussions/10959).

The job isn't done yet.

Try it with `npm i -D @pandacss/dev`, and if you have before and after numbers, share them and tag [@panda__css](https://x.com/panda__css). I'd really love to see them. ❤️
