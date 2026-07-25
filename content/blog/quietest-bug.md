---
title: The quietest kind of bug
description: Optional chaining hides the failure you most need to see. A user found a bug in BethelFlow before I did because of it. My honest take, and the rule I keep.
date: 2026-07-16
readingTime: 6min
---

### Why optional chaining hides the failure you most need to see, and the rule I keep for it.

::quiet-cover
::

You know the little light on your dashboard. The orange one.

It flicks on one morning and you tell yourself you'll deal with it later. The car still drives. Nothing feels different. So you keep going, day after day, the light glowing quietly in the corner of your eye until you stop seeing it at all. Then one evening, on the highway, late for something that actually matters, the engine gives out. The light had been trying to tell you for weeks. You'd just trained yourself not to listen.

We do this everywhere, don't we? The strange noise in the house you slowly tune out. The "we should talk" text you leave on read. The friend who says "I'm fine" so smoothly that you let yourself believe them. None of it is loud. All of it is waiting. The problem never actually left when the signal went quiet. It just picked its moment.

Code has an operator for exactly this. For years, it was my favourite one.

## The code that never speaks up

Optional chaining. `?.`. You reach into an object, and if something along the way is missing, it politely returns `undefined` instead of throwing. No crash. No noise. It just keeps going.

That sounds like a gift until it costs you. Here is what it cost me.

On the church records page in [BethelFlow](https://www.bethelflow.com/), the names went blank. Not everywhere, and not all at once, but rows that should have read "The Adebayo family, Ushering department" were quietly showing a dash. `—`. As if the record had no family and no department at all. No error. Nothing in the console. The data was sitting right there in the API response the whole time. The screen just refused to show it.

A user found it before I did. That part still stings.

Here is the line that did it, and I'll be honest with you: I wrote it on autopilot.

```tsx
value={r.familyId ? (family?.familyName ?? "—") : null}
```

Read it slower than I did. `family` is a lookup object I fetched separately on the client. When it hadn't loaded yet, or the lookup simply missed, `family` was `undefined`. So `family?.familyName` short-circuited to `undefined`, `?? "—"` caught it, and the row cheerfully rendered a dash. Optional chaining did exactly what it promised. It did not throw. It also never once mentioned that the whole premise of the line, "I have this family object," was false.

And here's the part I have to own. I didn't reach for `?.` because I'd thought carefully about what should happen when a family is missing. I reached for it because the red squiggle went away. It felt like handling the case. It was the "yeah, all good" of code. It was silence wearing the costume of safety.

That's the take, and I'll say it plainly: **optional chaining is a bug-swallowing machine.** It takes a loud, early failure and turns it into a quiet `undefined` that either sits on the screen as a blank, or travels three functions downstream and finally explodes as "cannot read x of undefined" somewhere that has nothing to do with where it actually broke.

## Guarding harder just moves the silence

When the names went blank, my first instinct was the wrong one. Guard harder. Sprinkle a few more `?.` upstream so nothing could possibly throw.

But think about what that actually does. It doesn't fix the bug. It moves the silence. Every `?.` you add is one more place that will show nothing instead of telling you something broke. You can optional-chain an entire file and never once be told what's missing. That isn't a safe codebase. It's a codebase that has quietly agreed never to alarm you. 😅

That isn't a fix. It's a strip of tape over the warning light, so now the dashboard looks calm too. It's the friend who only learned to say "I'm fine" more convincingly.

## Am I saying never use it? No

I use optional chaining every single day. For data that is *genuinely* optional, reaching one level in is exactly what the operator is for:

```ts
const avatar = user.profile?.avatarUrl ?? fallback
```

That's honest code. `profile` is allowed to be absent, and I decided right here, in one glance, what happens when it is. The absence is *expected*, and it's *handled*. That is the whole test.

My rule is a length limit. **Three links is the ceiling.** `a?.b?.c` and I can still hold in my head which of those can be null and why. `a?.b?.c?.d?.e` and I have stopped reasoning entirely. That chain isn't safety, it's a nervous tic, a quiet confession that I don't know the shape of my own data and I'd like the language to paper over it for me.

Granted, three is a heuristic, not a law. Some days it's two. The number matters less than the honesty it forces: if the chain is long enough that you can't say out loud which link is allowed to be missing, the answer is almost never one more `?.`. It's that you're reaching into the wrong object.

That was the real story in BethelFlow. The fix wasn't to guard the lookup harder. It was to stop chaining into a maybe-missing client lookup and put the name on the record itself, where it belonged:

```tsx
value={r.familyId ? (r.familyName ?? "—") : null}
```

No lookup. No chain. Nothing left to go quietly missing.

## Early returns say the quiet part out loud

Before I reach for optional chaining now, I reach for a guard clause. I decide what the absence *means*, at the point where it happens, while I still have the context to decide it well.

So instead of threading a maybe-null value through a whole function and hoping:

```ts
function greeting(user) {
  return `Hi, ${user?.profile?.contact?.firstName ?? "there"}`
}
```

I handle it at the door:

```ts
function greeting(user) {
  if (!user.profile) return null
  return `Hi, ${user.profile.contact.firstName}`
}
```

Yes, it's more typing. That's the honest cost, and I'll pay it every time, because of what it buys. The null case becomes a decision I actually made instead of a default I fell into. The rest of the function runs on known-good data, so the happy path stays flat and easy to read. And the next person, who is usually a tired future version of me, can read the top of the function and know exactly what it needs to work.

That last one is the real prize. A guard clause is how a function says its preconditions out loud, and that shared understanding is what lets code compose without everyone holding the whole call graph in their head. Optional chaining hides the precondition. An early return speaks it.

## The rule I keep

Reach for `?.` when the absence is expected and you've handled it, and keep the chain to about three. Reach for a guard when the absence would mean something is wrong, and handle it right there, while you still know why.

Because the kindest thing a piece of code can do is the same thing that little orange light was trying to do all along. When something is wrong, say so early, say it out loud, and say it close to where it happened, while listening is still cheap. Silence is not safety. Ask the user who spent a week staring at a dash where their family's name should have been.
