---
title: Practice what you maintain
description: "Why my portfolio now runs on Panda CSS and Ark UI, the libraries I help maintain, and what else changed over one tired weekend."
seoTitle: "Why I moved my portfolio to Panda CSS and Ark UI"
date: 2026-10-26
readingTime: 4min
---

### Why my portfolio now runs on the libraries I help maintain, and what else changed over one tired weekend.

Last week [Zara Zhang](https://x.com/zarazhangrui) posted [one line](https://x.com/zarazhangrui/status/2113148949842534482), and it went everywhere:

> Your personal website is the new resume

I bookmarked it and told myself I'd redesign my site. Then I remembered how long the last redesign took.

## Years to decide

On January 1, 2023, I opened an issue on this repo called "Upgrade to v2". I closed it in June this year. Most of that time went into deciding what my site should even look like.

What finally settled it was [antfu.me](https://antfu.me). [Anthony Fu](https://github.com/antfu) is one of the people I look up to in open source, and this design is 100% inspired by his. Simple. I love it.

So I wasn't redesigning again. The look stays. What I could change was what it's built with.

## Practice what you preach

The site moved to Nuxt in June, mostly because I'd started liking Nuxt. The green also made sense with my avatar. Maybe that's why I love Zag too.

The styling was [UnoCSS](https://unocss.dev), which is also Anthony's work, and it served the site well. But I maintain Panda CSS and Ark UI, and I'm in the middle of a whole [series on Panda's internals](/blog/build-once-at-build-time). My own site should be using what I maintain. So over the weekend I moved it to Panda CSS v2, with Ark UI underneath the components.

Using it day to day is the point. It shows me where Panda can improve, and it teaches me better patterns I can take back to the Panda ecosystem. Turning on `strictTokens` already flagged every raw value I'd hardcoded, so those became design tokens. Panda's style lint now runs in CI on every pull request, next to formatting, linting and types.

## The rest of the weekend

I was tired. I was also fired up. Some of what landed:

- Blog, Talks and Releases tabs. The talks page has my first talk, and the releases tab pulls every PR I've merged across open source.
- A handwritten logo and favicon.
- An accessibility pass: contrast, heading order, alt text and menu focus.
- Self-hosted fonts.
- Share cards that show each post's description and where it sits in a series.

## Not going simpler yet

Over the weekend I also read Marina Aísa's [What is the point of a personal website anymore?](https://marinaaisa.com/blog/the-point-of-a-personal-website/). She moved her site from a Nuxt single-page app to a static Astro site. Her rule is that "every piece I add has to justify why it's there."

I'm not making that move. I like Nuxt, so I'm staying on it for now. Maybe later.

One more thing. It's official: I'm now a maintainer at [Zag](https://zagjs.com) 👼

If you want the inside of the library this site now runs on, [part 1 of the Panda series](/blog/build-once-at-build-time) is a good place to start.
