---
title: Predictable codebase
description: The first codebase I ever set up myself, the IQ.wiki rewrite that taught me what I wanted it to look like, the weeks of harsh reviews it took, and why the same rules now let Claude ship pages that look like I wrote them.
date: 2026-09-26
draft: true
---

### Why constraints scale code. For the humans on the team, and for the agents.

When we started building [BethelFlow](https://www.bethelflow.com/), I had a lot of opinions about how I wanted the codebase to look. What I didn't have was any experience setting one up.

Up to that point I'd been a feature person. Someone else had already picked the linter, wired the formatter, decided where things lived and what a component was allowed to be. I'd show up, read the room, and ship inside it. That's a real skill, but it's a different one. On BethelFlow there was no room to read. The frontend was mine to set up, from the first `package.json` down, and every decision I didn't make on purpose was going to get made by accident.

## Where I learned what good looked like

The lesson came from somewhere else first. At [IQ.wiki](https://iq.wiki) we did a full revamp: a new look, and a move off Chakra UI v2 onto Tailwind. It would have been easy to treat it as a reskin. We didn't. We started with the most structural thing we could do, which was making sure the new codebase was future proof, easy to read, and strongly typed from day one.

A few things from that rewrite stuck with me for good.

**Types you don't write by hand.** We used [gql.tada](https://gql-tada.0no.co/), which infers the TypeScript type of a GraphQL query straight from the schema. You write the query, and the result already has its shape. No hand-maintained interface drifting away from what the API actually returns. Where data came from somewhere GraphQL couldn't vouch for, [Zod](https://zod.dev) did the same job at runtime. We spent our effort getting more types *inferred* instead of *written*, and I loved how clean that felt. If you want the idea behind it in one essay, it's Alexis King's [Parse, don't validate](https://lexi-lambda.github.io/blog/2019/11/05/parse-don-t-validate/).

**A component does one thing.** Small files. Not many lines. If a component was fetching, formatting, deciding, and rendering all at once, it got split. The old name for this is [separation of concerns](https://en.wikipedia.org/wiki/Separation_of_concerns), and it's less a rule than a habit of asking "what is this file actually for?"

**Composition over one big component.** No single component juggling `isLoading`, `isError`, and the happy path in a tangle of ternaries. The error state rendered its own thing. The loading state rendered its own thing. The data rendered its own thing. React already gives you the pieces for this: [composing components](https://react.dev/learn/thinking-in-react), [`<Suspense>`](https://react.dev/reference/react/Suspense) for loading, and in Next.js, [error boundaries](https://nextjs.org/docs/app/api-reference/file-conventions/error) for failure. Very clean principle.

None of it was clever. That was the point. It was simple, and simple stayed simple as the codebase grew.

## Bringing it home

So I made BethelFlow the same. And it wasn't easy to start.

The tooling part was the quick bit. [Biome](https://biomejs.dev) for linting and formatting. A [husky](https://typicode.github.io/husky/) pre-commit hook running [lint-staged](https://github.com/lint-staged/lint-staged), so nothing unformatted gets committed in the first place. A pre-push hook that runs a full build. CI that runs `biome ci`, lints our i18n keys, and runs [knip](https://knip.dev) to fail the build on unused files. TypeScript in `strict` mode. Boring, and exactly what I wanted.

The people part took longer. Getting everyone to follow the same rules meant long days of review. 🙃 Sending a PR back because a component did three things. Because a type was declared twice. Because a fetch was typed by hand when the schema was sitting right there. It felt very harsh back then. I could have let it slide. It worked, after all.

But every time I thought about overlooking it, I pictured myself a year later, opening a file I couldn't read, not knowing what was going on, in a codebase I was supposed to own. Short-term strictness felt expensive. Long-term unmaintainability was going to be more expensive, and it doesn't send an invoice. It just slows everything down until one day you notice.

So I made the choice: make it predictable enough that *I* could always understand it. There was no AI in the codebase then. This wasn't about agents. I just wanted type safety and good principles. Segregation of concerns. Declare a type once, and let every function call infer from it.

## What that looks like in practice

Every feature in the dashboard has the same shape. Take prayer requests:

```
prayer-request/
├── page.tsx
├── _schema.ts
├── _actions.ts
├── _hooks/
└── _components/
    ├── prayer-requests-view.tsx
    ├── prayer-requests-table.tsx
    ├── update-status-modal.tsx
    └── ...
```

Open any other feature, services, departments, records, and you'll find the same files in the same places. You don't learn the codebase feature by feature. You learn it once.

The types live in `_schema.ts`, and they're declared exactly once, as Zod schemas. The TypeScript types fall out of them:

```ts
export const prayerRequestSchema = z.object({ /* ... */ })

export type PrayerRequest = z.infer<typeof prayerRequestSchema>
```

The server actions parse what the API sends back with the same schema, with `safeParse`, so a surprise shape from the backend gets stopped at the edge instead of leaking into a component three files away. Nothing downstream ever has to wonder what it was handed. Mutations go through [next-safe-action](https://next-safe-action.dev), with an auth client every action builds on, which I wrote about in [Stop yapping, Lock in](/blog/stop-yapping-lock-in). Even the URL is typed, with [nuqs](/blog/nuqs-because-urls-should-do-more) parsers living in that same `_schema.ts`.

Here's the part I'm most fond of. Once a function returns typed data, nobody downstream declares that type again. They ask the function for it. The table that renders prayer requests never imports a `PrayerRequest[]` interface. It borrows the shape straight from the thing that fetched the data:

```ts
type PrayerRequestRows = NonNullable<
  Awaited<ReturnType<typeof usePrayerRequests>>['prayerRequests']
>
```

Read it inside out. [`ReturnType`](https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype) gets what the function returns. It's async, so that's a promise, and [`Awaited`](https://www.typescriptlang.org/docs/handbook/utility-types.html#awaitedtype) unwraps it. Index into `prayerRequests`, strip the `null` with `NonNullable`, and you have the exact rows the table is going to receive. Change the schema, and the action, the hook, the table, the column headers and the bulk-update modal all update with it. Or they stop compiling and tell you where to look. That line shows up more than 140 times across the codebase. Declare the type once, and let every call site infer it.

And the components compose. The view is tiny. It owns the layout, hands the loading state to `<Suspense>`, and lets the list worry about data:

```tsx
export async function PrayerRequestsView() {
  const { page, query, status } = prayerRequestSearchParamsCache.all()

  return (
    <div className="bg-card rounded-2xl p-4 sm:p-6 shadow-sm">
      <PrayerRequestTableActions />
      <Suspense
        key={`${page}-${query}-${status}`}
        fallback={<DashboardTableSkeleton />}
      >
        <PrayerRequestsList />
      </Suspense>
    </div>
  )
}
```

The skeleton renders the skeleton. The table renders the table. Nobody checks `isLoading`.

The same idea goes one level deeper. Every dashboard table is the same shared `DashboardTable`, and it knows nothing about prayer requests, members or services. A feature doesn't fork the table to add a bulk action. It hands the table a description of the action, with a [render prop](https://react.dev/reference/react/Children#calling-a-render-prop-to-customize-rendering) for the modal:

```tsx
{
  id: 'bulk-status-update',
  label: t('updateStatus'),
  icon: <RotateCcw className="h-4 w-4" />,
  renderModal: (selectedPrayerRequests: PrayerRequestRows, onClose: () => void) => (
    <BulkStatusUpdateModal
      selectedPrayerRequests={selectedPrayerRequests}
      isOpen
      onClose={onClose}
    />
  ),
}
```

The table owns selection, the sticky action bar and when the modal opens. The feature owns what the modal is. `TableAction<PrayerRequestRows[number]>` is generic over the row, so `selectedPrayerRequests` comes in already typed with that inferred shape from above. One table, lots of features, and none of them reach inside it.

Across the dashboard there are close to five hundred component and page files now. The median one is about a hundred lines. That number is the whole philosophy, measured.

It's one of the best things I did for the BethelFlow codebase, btw. 😅

## Then Claude joined the team

Now we have Claude contributing, working the way I work. And the payoff is almost funny to watch.

Give it a new page to build and it doesn't invent anything. It reads a neighbouring feature, sees `_schema.ts`, `_actions.ts`, `_components/`, and produces the same shape. Schemas first, types inferred, a view that composes, a skeleton for the loading state. It uses the design system the same way, because there's only one way to use it.

This isn't magic, and it isn't really about the model. An LLM is a very good pattern-matcher, and it will match whatever patterns you have. A codebase with five ways to fetch data gets a sixth. A codebase with one way gets that one way, again. Strict types give it a compiler that says no before I have to. Consistent structure gives it an example to copy. DRY code means there's one place to change and one place to learn from. The guardrails I put up for humans turned out to be the exact same guardrails an agent needs. I wrote more about that overlap in [Context is everything](/blog/context-is-everything): briefing an agent well and briefing a person well are mostly the same job.

The design system went through the same cleanup. We used to have hardcoded colour values scattered around, and at some point I'd had enough of that. They moved into tokens. Today it's [Tailwind CSS](https://tailwindcss.com) with [shadcn/ui](https://ui.shadcn.com), and every colour is a CSS variable behind a semantic name like `bg-card` or `text-muted-foreground`. That change helped people, but it helped Claude even more. There is no hex code to guess. There's a name, and the name is right.

## What's next

The foundation holds, so now it's about building on it. Keeping up with the latest Next.js releases for speed, which is a lot less scary when the type checker and the build both have your back. And eventually a move to [Panda CSS](https://panda-css.com), once I have the time to do the switch properly. Given everything above, I expect most of that migration to be mechanical. Which is exactly how a migration should feel.

But mostly I'm just proud of how this codebase has grown. Humans and agents can both walk into it and contribute without asking where things go, because the code already tells them. That was the whole goal. Not clever. Predictable.
