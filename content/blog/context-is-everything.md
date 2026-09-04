---
title: Context is everything
description: What years of building AI agents taught me about context engineering, and how much of it turned out to be the same thing as briefing another human well.
date: 2026-07-18
---

![A conversation panel you've walked into halfway: the top lines cut off, the middle clear, the last line only half typed.](/images/blog/context/cover.svg){loading="eager" fetchpriority="high"}

There's a specific kind of lost you feel walking into a conversation halfway through. People are laughing at something. Someone says "yeah, but that's exactly what *he* did," and you nod along like you know who *he* is. You don't. You've got the words but none of the wiring underneath them, and if you're not careful you'll repeat the half you caught as if it were the whole thing. That's the dangerous part. Not knowing nothing. Knowing *half*.

We spend our whole lives quietly topping each other up. You mention a person and I already have years of them loaded. You say "the usual" and the waiter knows. Almost none of what makes a conversation work is *in* the conversation; it's the shared state both of you dragged in with you.

A language model has none of that. Every single call is a stranger walking in halfway through, and your entire job is to catch it up, in just the right number of words, before it says something confident and wrong.

For a good while I lived close to AI agents, a lot of it around a crypto Q&A agent called [AIDEN](https://iq.wiki). I haven't been in the thick of it for a bit now, but the lesson it drilled into me hasn't left. I've watched a model answer a question with total confidence and be completely, embarrassingly wrong, for one reason: it had been handed half the picture, with no way of knowing the other half existed. That's the part that stuck. The model isn't the hard part. Deciding what it gets to see is.

## The art of deciding what *not* to say

The early years of that codebase read like a diary of a fight against a tiny window. The model underneath had a context budget of about **4,000 tokens**. Four thousand. And the questions people asked were things like "what are the biggest gainers today," which means a crypto API payload with hundreds of coins and thousands of fields, enum lists containing every token id that has ever existed. None of it fit. Not close.

So what got built, long before big context windows made any of it look quaint, was an elaborate machine whose entire purpose was deciding what **not** to send the model:

- There were ~30 API endpoints, too many to describe to a 4k model, so the endpoint *descriptions* got embedded and vector-searched to pull the top 10 candidates.
- Ten was still too much. There's a loop, still in the codebase today, that encodes the candidate function definitions and just pops them off the end one at a time until they fit:

```ts
while (encode(functionsString).length > maxTokens && reducedEntries.length > 1) {
  reducedEntries.pop()
  functionsString = JSON.stringify(Object.fromEntries(reducedEntries))
}
```

- Parameters like `coin_ids` have thousands of valid values, so those couldn't be inlined either: a second vector table *of enum values*, searched against the query to return ~20 likely ones.
- When an API response came back too big, it got filtered by *another model call*, asking one to write a `jq` expression that projected the giant blob down to only the fields the question needed, then retrying by feeding it its own error.
- Documents got chopped into 150-token chunks; keep the top 5, glue them together.
- Conversation history got truncated by hand: chop any assistant reply past 150 characters, counted by character, with the comment *"prevent information saturation."*

The commit history is full of the desperation. `MAX_TOKENS` changed **five times in a single day**: 4000, then 3500, then 4000, then 8000, then back to 4000. There's a one-liner that just *"increases max tokens to 3 times if it's not english,"* because Korean and Chinese tokenize worse and there was no better idea at the time. There's a commit called **"avoid caching sorry answers,"** because the system had been caching its own *failures*. The README describes one of these subsystems and then admits, out loud, *"This is a big system as well 😅."* Twice.

When I got close to all of it, it was humbling to sit with. It felt less like engineering intelligence and more like being a very anxious travel agent for a genius who forgets everything the second you stop talking. But every one of those hacks is the same move underneath: *don't dump, decide.* Nobody had a name for it yet. It just felt like janitorial work you did so the smart part could work at all.

<!-- 💬 OPTIONAL: one specific memory here would make this unmistakably yours. A real moment the wall hit you (a query that kept failing, a confidently-wrong answer you had to chase down, a context-length error at exactly the wrong time). One scene is worth ten explanations. -->


## Then we gave it a team

The rebuilds came as the models got bigger and smarter. You'd think that would make the whole problem evaporate.

It didn't. It just changed shape. In one of the newer versions the very first real crisis, only weeks in, was adding a token counter and model-based data filtering in the same week, because the fresh, powerful model was *still* drowning in raw API payloads. Same bottleneck. New house.

But the answer this time wasn't a bigger pile of filters. It was decomposition. One overloaded API agent got split into five specialists (CoinGecko, DeBank, DeFiLlama, Etherscan, IQAI) with a top-level **router** that stopped answering anything itself and just classified each question and handed it to exactly one specialist. Single hop. Its instruction literally says *"Do NOT provide your own answer after transferring."*

The point of that is context. A CoinGecko question now travels with *only* CoinGecko instructions and *only* CoinGecko tools. It never has to carry DeBank's entire world in its head. Each agent gets a narrow, purpose-built slice of reality instead of one prompt straining to be everything at once.

And we got ruthless about history. There's a step that, before every model call on a specialist, throws the thread away and hands it *only the current question*. The default number of past turns kept? **One.** A tiny separate model rewrites your follow-up ("what about *its* price?") into a standalone question first, so the specialist never needs the backstory; it gets a question that already resolved "it."

We even stopped dumping tool menus. Instead of loading dozens of endpoint schemas, an agent *searches* for the tool it needs, then writes code to call it. And the newest rebuilds lean into that hard: give a specialist a single tool, let the model write a little function that runs in a sandbox, do the fetch-filter-sort-slice *inside* that call, and hand back only the ten rows it asked for. The 250-row array it worked through never touches the model's context. There's a line in there I love:

> Too large to hand back safely, return a truncated string so it can't overflow the consuming model's context window.

Years earlier the move was popping function definitions off a list until they fit. This is the grown-up version of the exact same instinct, and somewhere in the middle of watching all of it, I stopped seeing this as janitorial work and realized it *was* the job. The whole job.

## It has a name now

Somewhere around the middle of 2025, while I was buried in this stuff, watching agents keep choking on context they'd been handed badly, the rest of the field named the thing.

In June 2025, Shopify's Tobi Lütke put it like this:

![Tobi Lütke: “I really like the term ‘context engineering’ over prompt engineering… the art of providing all the context for the task to be plausibly solvable by the LLM.”](/images/blog/context/tobi-context-engineering.png)
*Tobi Lütke, June 19, 2025.*

Days later, Andrej Karpathy amplified it into the definition everyone now quotes:

![Andrej Karpathy: “context engineering is the delicate art and science of filling the context window with just the right information for the next step.”](/images/blog/context/karpathy-context-engineering.png)
*Andrej Karpathy, June 25, 2025. The line that renamed the discipline.*

> context engineering is the delicate art and science of filling the context window with just the right information for the next step. [...] Too little or of the wrong form and the LLM doesn't have the right context for optimal performance. Too much or too irrelevant and the LLM costs might go up and performance might come down.

That last sentence is the part nobody warns you about. I used to think the whole problem was *scarcity*, not enough room. So when the windows finally got huge, I assumed we'd won. The token budget in that codebase tells the real story: it went from around 4,000 to a full million, and then someone quietly dialed it back to 500,000, for performance. We'd been handed almost infinite room and *chose* to use less. Because more context isn't free context. Anthropic frames it as an **attention budget**: like us, a model has limited working memory, and the more you cram in, the *worse* its recall gets. They call it "context rot," where the answer is technically in the window but buried in the middle where nothing looks. The [ai-engineer.me essay that shares this post's title](https://www.ai-engineer.me/context-is-everything/) puts it best: *"bottlenecks can't be eliminated, they can only be moved around."* Bigger windows didn't kill the bottleneck. They moved it from *"will it fit"* to *"of everything that now fits, what actually deserves to be there."*

When I read [LangChain's four moves](https://www.langchain.com/blog/context-engineering-for-agents), I laughed, because they're a tidy map of everything I'd watched us stumble into by feel. **Write** context out to somewhere durable, that's saving what an agent found so a later step can use it. **Select** the right pieces back in, that's the vector search. **Compress** what you keep, that's the `jq` filter and "return a small summary." **Isolate** it across agents, that's the scoped specialists. There are now whole companies, like [supermemory](https://supermemory.ai/), which bills itself as "the memory layer for AI agents, a context engineering platform," selling the pillar we'd been hand-rolling since it was a 150-token chunk in a database table.

Karpathy ended his post with a line I think about a lot: *the term "ChatGPT wrapper" is tired and really, really wrong.* He's right. The model is one component. The thick, unglamorous layer around it, deciding what it sees, when, and in what shape, is most of the actual software. It's most of the actual *work.*

## Back to the humans

Here's the thing that keeps getting me, though. We are *terrible* context engineers with each other, and we've had a lot longer to practise.

Think about how we brief people. We fire off the Slack message with none of the backstory and wonder why the reply misses. We say "you know what I mean" to someone who probably does not. We walk a new teammate up to a two-year-old system and drop them at the door. We do to each other exactly what a bad prompt does to a model: too little context, or the wrong shape, and then we're surprised by the confident wrong answer that comes back.

The uncomfortable mirror is that everything I learned bolting context onto a forgetful model is just... good communication, formalized. Rewrite the follow-up so it stands alone: that's not making someone reconstruct the whole thread from memory. Return a summary, not the raw arrays: that's respecting someone's attention budget instead of forwarding the 200-email chain. Give each specialist only their slice: that's not CC'ing forty people on something two of them own. Write it down somewhere durable: that's the doc that outlives the one person who remembers.

We get away with being sloppy because humans are absurdly good at filling gaps. You lob half a sentence and repeated patterns, shared history, a lifted eyebrow do the rest. The model has none of that grace. It exposes, ruthlessly, how much of what we call "communicating" was actually just *the other person quietly doing the context engineering for us.*

## The refactor

Context is expensive. Assembling it, curating it, keeping it fresh, that's real cost, in tokens and in effort. But missing context is more expensive. It's the confident wrong answer, the rework, the argument that was really just two people running on different halves of the same conversation.

For years I thought I was solving a machine problem: squeeze the data through the tiny hole, then rank it once the hole got big. I was really learning the oldest problem there is: how do you get what's in your head *plausibly, correctly* into someone else's, using only the words you can afford to spend.

The essay I keep quoting opens with a line that turned out to be the whole point: *"With LLMs, as with people, context is everything."*

Every conversation with a model is a stranger walking in halfway through. Turns out most of my conversations with people are too. The real, defining skill, whether the other side is a language model or a person who deserves better than half the story, is catching them up before they nod along to something they only half understand.

So: say more than "Hi." Say enough.
