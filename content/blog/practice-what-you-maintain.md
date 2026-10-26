---
title: Practice what you maintain
description: "Why my portfolio now runs on Panda CSS and Ark UI, the libraries I help maintain, and what else changed over one tired weekend."
seoTitle: "Why I moved my portfolio to Panda CSS and Ark UI"
date: 2026-10-26
readingTime: 4min
---

### Why my portfolio now runs on the libraries I help maintain, and what else changed over one tired weekend.

Last week [Zara Zhang](https://x.com/zarazhangrui) posted [this](https://x.com/zarazhangrui/status/2113148949842534482) and it blew up:

> Your personal website is the new resume

I bookmarked it and told myself I'd redesign my site. Then I remembered how long the last redesign took me.

## It took me years

On January 1, 2023, I opened an issue on this repo called "Upgrade to v2". I closed it in June this year. Most of that time I just couldn't decide what my site should look like.

In the end I went with something like [antfu.me](https://antfu.me). [Anthony Fu](https://github.com/antfu) is one of the people I look up to in open source, and I love his taste in design. A lot of this site borrows from his, even the handwritten logo. What's mine is the green, what's on the pages, and what it's built with.

So I didn't want to redesign again. I kept the look and changed what it's built with.

## Practice what you preach

The site moved to Nuxt in June, mostly because I'd started liking Nuxt. Also, the green matched my avatar. Maybe that's why I love Zag too 😅

The styling was [UnoCSS](https://unocss.dev), which is also Anthony's work, and it served the site well. But I maintain Panda CSS and Ark UI, and I'm in the middle of a whole [series on Panda's internals](/blog/build-once-at-build-time). It made sense for my own site to use what I maintain. So over the weekend I moved it to Panda CSS v2, with Ark UI underneath the components.

Using it on my own site shows me where Panda can improve, and I learn better patterns I can take back to the Panda ecosystem. For example, turning on `strictTokens` flagged every value I'd hardcoded, so I swapped them for design tokens. Panda's style lint now runs in CI on every pull request, next to formatting, linting and types.

## The rest of the weekend

I was tired, but I was fired up too. Here's what else I shipped:

- Blog, Talks and Releases tabs. My first talk is on the talks page, and the releases tab lists every PR I've merged across open source.
- A handwritten logo and favicon.
- An accessibility pass: contrast, heading order, alt text and menu focus.
- Self-hosted fonts.
- Better share cards that show each post's description and its part in a series.

## Staying on Nuxt for now

I also read Marina Aísa's [What is the point of a personal website anymore?](https://marinaaisa.com/blog/the-point-of-a-personal-website/). She moved her site from a Nuxt single-page app to a static Astro site. Her rule: "every piece I add has to justify why it's there."

I'm not doing that yet. I like Nuxt, so I'm sticking with it for now. Maybe later.

Oh, and it's official now. I'm a maintainer at [Zag](https://zagjs.com) 👼

If you want to see how Panda works under the hood, start with [part 1 of the series](/blog/build-once-at-build-time).
