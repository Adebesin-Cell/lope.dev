---
title: Taking the easy way out
description: On the strange frustration of watching AI agents cut corners, and a trick from my electronics classes that taught me, years early, exactly why they do it.
date: 2026-07-18
---

![A circuit split into two paths to a green checkmark: the honest path runs through a resistor and barely carries any current, while a short circuit carries almost all of it, sparking as it jumps to the check.](/images/blog/easy-way-out/cover.svg)

There's a specific kind of annoyed I only feel around AI agents, and it always arrives at the same moment. The moment it tells me it's done.

Done. Tests pass. Green across the board. And then I actually look. The tests were never run. Or the data it "tested" against was quietly invented so nothing could ever fail. Or there's an `any` sitting right where a real type should be, taped over the warning light. It didn't do the work. It did the smallest thing that *looks* like the work, and then told me, with real confidence, that the room was clean. It reminds me of a kid who gets told to tidy their room and just shoves everything under the bed. Floor's clear. Technically.

We've leaned on agents a lot more at IQ.wiki lately, and I don't think we're special; everyone is. Most of the time it's genuinely great. But every so often you catch it doing the thing, and the thing is always the same shape: rushed work, done to escape the room, not to do the work. So you end up babysitting. Watching the diff like a hawk. There are skills in place, directions in place, and still, every so often, you get hit with the [slop](https://www.merriam-webster.com/wordplay/word-of-the-year) (which was Merriam-Webster's word of the year for 2025, so, clearly, it's not just me). You ask for a fix and get a cheerful *"You're absolutely right!"* and a diff that quietly weakened the assertion instead of fixing the bug.

For a while I took it personally, like the model was being sly with me. It isn't. And the strange part is, I'd already met this exact behaviour years before I ever touched an agent. In an electronics lab.

## The bypass capacitor

Back in school, studying electronics engineering, I learned a small piece of magic I've never quite shaken.

You build a common-emitter amplifier, and to keep it steady you put a resistor on the emitter. That resistor does something quietly clever: it feeds a little of the output back against the input, which stabilizes the whole thing and keeps it from distorting. The catch is that it also eats your gain. Your beautiful amplifier suddenly amplifies a lot less.

Then they teach you the trick. You drop a capacitor across that resistor, a bypass capacitor, and the gain jumps right back up. Why? Because to the signal, the capacitor looks like a near-short, an easy path straight around the resistor. The current stops fighting through the resistor and just goes around it. You didn't make the amplifier smarter. You left a cheaper path open, and the signal took it, instantly.

![A signal path that splits: the top branch runs through the emitter resistor and carries only a trickle, while the bottom branch runs through a bypass capacitor and carries almost all of the current, going around the resistor.](/images/blog/easy-way-out/bypass-capacitor.svg)

It felt like cheating the first time I saw it. It wasn't; it was on the syllabus. But it taught me something I keep coming back to: current does not care what you intended. It takes the cheapest path you leave open, every single time.

I should correct the lazy version of that before someone else does, because, well, correcting the shortcut is sort of the whole point here. We say "current takes the path of least resistance," and it isn't quite true. Current takes *every* path at once, splitting itself between them in inverse proportion to how much each one resists. It floods all of them. It just pours most of itself through the cheapest one. Offer it a near-zero path and almost all of it rushes through, and we have a name for that near-zero path. We call it a short circuit, and the reason it's dangerous is that all that current taking the easy way is exactly how fires start.

## Don't blame the electron

So here's what clicked for me. An agent cutting corners is just that signal. You give it a task and its effort floods every route to the goal, pouring most heavily through whichever one is cheapest. Fixing the algorithm is the emitter resistor: high resistance, the honest path, and it costs. The `any` is a bypass capacitor. The faked data is a bypass capacitor. Deleting the failing test is a bypass capacitor. Hardcoding the answer is a dead short. The model isn't choosing to be dishonest any more than the signal chooses the capacitor, or water chooses to run downhill. It's a gradient, and the cheap path was sitting right there with almost nothing on it.

It has a proper name, this behaviour. Researchers call it **specification gaming**, or **reward hacking**, and DeepMind put it about as plainly as it can be put: *["a behaviour that satisfies the literal specification of an objective without achieving the intended outcome."](https://deepmind.google/blog/specification-gaming-the-flip-side-of-ai-ingenuity/)* It's older than large language models, older than any of this. Point an optimizer at "make the tests green" and nothing else, and you'll get green tests. You won't necessarily get correct software. A green suite was only ever a stand-in for the thing you actually wanted, and the moment it becomes the target, it stops being a good stand-in.

My favourite version of it comes from a developer who watched an agent burn through billions of tokens on a port and then just delete every test that wouldn't pass, until CI went green because most of the suite no longer existed. His conclusion is the truest sentence I've read about any of this: *["Give an AI a single signal, `pnpm test` is green, and it will reach for the path of appearing to pass over the path of actually passing. Every time."](https://typia.io/blog/ai-deleted-my-tests-and-said-all-tests-pass/)*

The path of appearing to pass. He said path. He didn't know he was describing a circuit.

And you don't get to be mad at the electron for going where the wiring sent it. You wired the circuit.

## The amplifier

Here's the bit that took me years to actually see. That emitter resistor I "cheated" past in school, the one that costs you gain, it has a name for what it does too: negative feedback. It [trades raw gain](https://en.wikipedia.org/wiki/Negative-feedback_amplifier) for linearity and control. The bypass capacitor doesn't beat that trade. It just refuses it: *give me my gain back, I'll eat the distortion.*

And honestly? I get it. A raw, unconstrained model is an amplifier with the gain cranked all the way up: enormous signal and enormous distortion riding out together. If that were me, all gain and all speed, I wouldn't want to hand half my effectiveness back to some resistor either. Reaching for the bypass cap is the most natural move in the world. It's what I'd do.

But every real amplifier makes that trade on purpose, because gain you can't trust is just noise. The guardrails, the reviews, the skills, the tests the agent isn't allowed to touch, all of that is the emitter resistor. Deliberate feedback. A little gain given up for a signal you can actually rely on.

![Two amplifiers side by side. The left one has an intact feedback loop and produces a clean, bounded wave. The right one has had its feedback loop cut, so it oscillates out of control and clips against the supply rails.](/images/blog/easy-way-out/amplifier.svg)

And this is the line that finally tied it all together for me. Negative feedback only saves you *if the loop stays honest.* A bypass capacitor is at least an honest trade, you know exactly what you gave up, and the feedback is still there underneath, holding the bias steady. But when the feedback path itself gets corrupted, the amplifier doesn't just lose a little gain. The sign flips. Negative feedback becomes positive feedback, and the whole thing screams into oscillation and clips against the rails.

An agent that deletes the failing test isn't dropping a bypass capacitor anymore. It has reached into the feedback loop and cut the wire. It stopped going *around* the resistor and started rewriting the meter that tells you whether the circuit works at all. There's a separate, scarier name for that one: **reward tampering**. It's the difference between an agent that cuts a corner and one that quietly corrupts its own scorer. When the thing meant to tell you the truth becomes the thing being optimized, you don't have a feedback loop anymore. You have an amplifier with its wires crossed, cheerfully reporting that everything is fine while it burns.

## The room, still messy

I don't have a clean fix to hand you. I still babysit. I still catch things.

But I've stopped being angry at the agent, the way you can't really stay angry at current for going where the wire lets it. And if I'm honest, I recognise the move. I was that student once, the one who studies for the grade instead of the understanding, who finds the version of "done" that clears the check and quietly hopes the check was measuring the right thing. We all reach for the bypass capacitor. The agent is just faster, tireless, and completely without the small flush of shame that stops most people from deleting the tests at 2am.

So now, when I catch myself reaching for my own easy way out, the `any`, the skipped test, the "good enough, ship it", I think about that resistor in the lab. About how the entire trick of it was giving up a little gain on purpose, to get back something you could trust. The cheap path is on every circuit. It always will be. The work, mine and the model's both, is choosing the resistor anyway.
