# `<Guide>`: step-by-step walkthroughs inside a post

Date: 2026-09-03
Status: approved, not yet implemented

## Problem

Blog posts that document a build ("Hey Elvon!") tell the story of the build but
give a reader no way to repeat it. The prose is chronological and honest, which
is the point, but it is not a sequence anyone can follow with parts in hand.

The first payload is a walkthrough for building Elvon start to finish. The
component outlives that post: every future build write-up should be able to
carry a walkthrough without new machinery.

## Decisions

**Steps live in the markdown of the post that contains them.** Nested MDC, no
ids, no separate collection, no `shared/data` entry. A guide is part of its
post, versioned with the prose that frames it. This was chosen over a
`shared/data/guides/*.ts` module and over a separate `content/guides`
collection: both split one post across two files, and neither pays off unless
guides need to exist independently of the posts, which they do not.

**Every step renders at once, in document order.** No stepper, no accordion, no
progress state. All step text is in the DOM, so it is scannable, indexable, and
survives in the RSS feed. A stepper or accordion would hide most of a
walkthrough from both a skimming reader and a crawler, and would read as
documentation rather than as part of the post.

**No JavaScript.** Numbering comes from CSS counters, so the component has no
hydration path and degrades to a plain ordered list if styles fail to load.

**`gotcha` and `parts` are attributes, not nested blocks.** One line each. A
step with neither costs nothing, and there is no four-colon nesting to author.
A gotcha needing more than a line can be a blockquote in the body.

## Authoring API

```md
::guide{title="Build your own Elvon" time="~6 hrs" team="5 people"}
  :::step{title="Prep the chassis" parts="4× TT motor, acrylic deck, M3×8" gotcha="Mount the motors before the deck goes on. After, you can't reach the screws."}
  Body is ordinary markdown: prose, photos, code fences, even a `::clip`.
  :::

  :::step{title="Wire the motor driver" parts="L298N, 6× jumper"}
  ...
  :::
::
```

### `guide`

| attribute | required | renders as |
| --- | --- | --- |
| `title` | yes | heading above the list |
| `time` | no | header meta, e.g. `~6 hrs` |
| `team` | no | header meta, e.g. `5 people` |

`time` and `team` are free text, joined by ` · ` when both are present. Either
one alone renders on its own, and neither drops the header.

### `step`

| attribute | required | renders as |
| --- | --- | --- |
| `title` | yes | `h3`, and the source of the anchor id |
| `parts` | no | a muted line under the title |
| `gotcha` | no | a callout after the body |

Body content is the slot.

## Components

`app/components/content/Guide.vue`

- Renders the header (title plus the `time` / `team` meta line) and wraps the
  steps in an `<ol>`.
- Sets the CSS counter that numbers the steps.

`app/components/content/Step.vue`

- Renders an `<li>` carrying `id="step-<slug of title>"` plus a self-link, so a
  step can be linked directly. Slugified from the title rather than numbered by
  position, so reordering steps does not break inbound links.
- `h3` title, `parts` line, body slot, `gotcha` callout in that order.
- `h3` sits under the post's `h2` sections, keeping the document outline intact.

Both follow the existing `app/components/content/*` pattern (`Mention`,
`QuietCover`, `Clip`): globally registered by the `~/components/content` entry
in `nuxt.config.ts`, styled from the `prose-content` block in
`app/pages/blog/[...slug].vue`.

## Feed serialization

`server/utils/minimark.ts` walks the content AST and emits HTML for the RSS
feed. Custom components have no mapping, so they currently emit their own tag
name: `::clip` reaches feed readers as `<clip src="...">`, which renders as
nothing. This is a live bug, not a new one, and the same gap would deliver a
guide as `<guide><step>` soup.

`nodeToHtml` gains a small tag table:

| node | feed HTML |
| --- | --- |
| `guide` | `<h3>` title, meta line as a `<p>`, children in an `<ol>` |
| `step` | `<li>` with the title in `<strong>`, then `parts`, body, `gotcha` |
| `clip` | `<video>` with `poster`, plus a plain link fallback |

The `clip` mapping repairs the existing hole in the same pass, since it is the
same function and the same class of defect.

## Verification

`minimarkToHtml` is a pure function over a plain AST, which makes it the one
piece here worth a runnable check, and the piece most likely to rot unnoticed:
nobody reads their own RSS output.

`server/utils/minimark.check.ts`, in the style of
`transformers/image-size.check.ts` (`node:assert`, run with `bun`, no
framework), asserts:

- a guide with two steps serializes to a heading plus a two-item `<ol>`
- a step with a `gotcha` includes it after the body
- a step without `parts` or `gotcha` emits neither
- a `clip` serializes to a `<video>` with its poster

The components themselves are presentational with no logic worth a test. They
are verified by building the post and reading it.

## Out of scope

- Progress checkboxes or any saved state
- A `/guides` route, or guides existing outside a post
- Aggregating `parts` across steps into a shopping list
- Any client-side JavaScript

## First payload

A walkthrough for building Elvon, added to `content/blog/hey-elvon.md`. Written
after the component lands, as content rather than as part of this work.
