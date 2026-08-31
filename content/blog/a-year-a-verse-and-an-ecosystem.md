---
title: A year, a verse and an ecosystem
description: A year inside the chakraverse. The components, the codemod, the pro system work I wasn't proud of, and what a year of building for other developers taught me.
date: 2026-08-31
---

### A year in the chakraverse. What I built, what I threw away, and where we're headed.

![A year, a verse and an ecosystem. The Panda, Chakra UI, Zag and Ark marks floating around the title on a warm cream background.](/images/blog/a-year-a-verse-and-an-ecosystem/cover.svg)

A year ago, I was working as an IT student at a polytechnic networking department. Reasonably a very serene environment, I was able to meet every quota of work, my day job at [IQ.wiki](https://iq.wiki), and my IT as well.

During one of those days, I got a random email from [Segun Adebayo](https://adebayosegun.com), popularly known as Sage, asking for a collaboration on [Chakra UI](https://chakra-ui.com) and [zag](https://zagjs.com).

![An email from Oluwasegun Adebayo, dated Mon, Aug 25 2025 at 4:05 PM. It reads: Hey Tolulope, I came across your portfolio and I found it quite impressive. Saw that you use Chakra UI at IQ.Wiki which is great! I'm looking to grow the team of contributors to Chakra UI and thought you might be a good fit. Is this something you're open to? We provide: great onboarding and guidance so you don't feel lost, contribute in your free time (minimum ~5 hours every week), decent compensation for contributors depending on impact. Regards, Sage, Creator of Chakra UI.](/images/blog/a-year-a-verse-and-an-ecosystem/sage-email.png)

Prior to that time my open source arc had been an on and off topic, but I genuinely still wanted to contribute meaningfully to the community. I had been looking for a dedicated project to keep extending, something to add to the body of open source. Relatively new, I had no idea what being a contributor actually was. It quite differs from what I'd known about.

And I should be honest about the first few weeks, because "I had no idea" is doing a lot of quiet work in that sentence. The first time I properly opened zag and chakra, I felt completely out of my depth. Machines calling machines, files pointing at files, and me sitting there trying to find where a single component even begins. I kept waiting for someone to notice I didn't really know what I was doing yet.

The thing that took me a while to see is that everybody is figuring it out as they go. The people I was intimidated by are also reading code they didn't write, also guessing, also wrong sometimes. They've just been doing it for longer, and they've stopped treating being lost as a sign they don't belong.

There's one idea I kept bumping into all year, and I only found the words for it much later, when I was writing a talk. Decide once, use everywhere. It sounds like a design system thing, and it is, but it turned out to be the thing underneath almost everything I worked on this year. So that's really what this is about.

Before I move on though, I'd like to tell a short story.

I had this colleague about 3-4 years ago at IQ.wiki, name is :mention{handle="anubra266" name="Abraham Aremu"}. I really respect him, and going through older conversations in the IQ.wiki team, he was everywhere (in a good and amazing way lol). He previously had been working on Chakra UI and the entire ecosystem, and he'd share his findings on our then WhatsApp group about [chakra](https://chakra-ui.com), [zag](https://zagjs.com), [panda](https://pandacss.com), [ark](https://ark-ui.com), [choc ui](https://choc-ui.com) (I recall I wanted to contribute to it but got overwhelmed).

Nonetheless, I think I found it interesting someone close to home was contributing to a widely used UI framework across the dev community. So by the time that email landed, I already had some picture in my head of what the inside of this thing looked like.

He's still at it, by the way. An Ark port for Ripple, a Panda ecosystem site. Which I find a bit funny now, that the person who made me think any of this was possible is building on the things I help maintain.

## The machine broke

It started pretty calm. I couldn't get started properly, my machine broke almost the same week I started setting up for chakra work 😄.

But I couldn't let that stop me. I had to gather out every ounce of money on me and got a new machine, a MacBook M4. And I think the work became smoother from then on. It started pretty slowly, being unsure of what to do or even how some things work.

But Sage was very kind, teaching every single step he applies to making decisions about building components. So my very work was mostly on Chakra UI.

## Anatomy, and the components

If you go by what shipped, this part of the year was components. That's the surface though. A design system isn't a folder of components, the components are just the part you can see. The interesting bit is always the layer under them, and that's where most of the work actually went.

My very first contribution after was a [component explorer](https://chakra-ui.com/docs/components/accordion#explorer) to show how anatomy makes up different components. Chakra components are built from parts, a root, a trigger, a positioner, a content, an item, and all of that used to live in a table in the docs. Now you can click a part and watch it light up in a live preview, with the slot recipe generated underneath, so you can see what you're styling before you style it.

Then I was able to work on a [TagsInput](https://chakra-ui.com/docs/components/tags-input) next.

A bit more components came around after. [Carousel](https://chakra-ui.com/docs/components/carousel), [Splitter](https://chakra-ui.com/docs/components/splitter), [RTE](https://chakra-ui.com/docs/components/rich-text-editor) based on [Tiptap](https://tiptap.dev).

I enjoyed working on RTE cos we started out as making it a dedicated package on its own but changed it since perhaps it could just be a composition than a package 😄.

If you've not come across one before, a composition is what our docs call a [closed component](https://chakra-ui.com/docs/components/avatar#closed-component). Chakra components are open by default, every part is yours to place, which is lovely for flexibility, but it also means a [Tooltip](https://chakra-ui.com/docs/components/tooltip) looks like this every single time you want one:

```tsx
<Tooltip.Root>
  <Tooltip.Trigger asChild>
    <Button>Hover me</Button>
  </Tooltip.Trigger>
  <Portal>
    <Tooltip.Positioner>
      <Tooltip.Content>
        <Tooltip.Arrow />
        Delete this item
      </Tooltip.Content>
    </Tooltip.Positioner>
  </Portal>
</Tooltip.Root>
```

And you'd be writing that again and again. So we close it up. One component, the parts wired inside, and the two things you'd actually change left as props:

```tsx
<Tooltip content="Delete this item">
  <Button>Hover me</Button>
</Tooltip>
```

You add it with [`npx @chakra-ui/cli snippet add tooltip`](https://chakra-ui.com/docs/get-started/cli) and it drops into your own `components/ui` folder as plain source, so if you want the arrow gone, or a longer delay, or some variant nobody else asked for, you just open the file and change it. It's not an import from us. It's yours.

Which is the other half of decide once, use everywhere, and the half I didn't understand at first. Some decisions should be made once and shared, that's your tokens. But some of them aren't ours to make at all, and the honest thing is to hand you the source and get out of the way.

Which is why the RTE ended up there too. As a package we'd own that editor forever, and carry Tiptap's whole extension matrix along with it, and every "can I add one more toolbar button" would turn into a prop, then an API, then something we can't change later. As a composition you just run it and it's in your repo:

```bash
npx @chakra-ui/cli snippet add rich-text-editor
```

## The codemod

Few things after was to build a codemod for people coming from v2 to v3.

It was quite the experience. I took mostly inspiration from the Next.js codemod, and eventually we were able to make it work, tested it across several v2 projects till we were fully satisfied it was working. And it is working today.

Same idea again, if you squint. Decide how a v2 Modal becomes a v3 one exactly once, write that decision down as code, and then it runs everywhere instead of living in somebody's head for four hundred files.

Doing a major upgrade by hand is tiring. You rename the props, you convert a Modal to its compound form, you fix the theme, then you do it again everywhere, and somewhere along the line you start missing things. So it's one command instead, and you can look at what it wants to do before you let it:

```bash
npx @chakra-ui/codemod upgrade --dry
```

The [migration guide](https://chakra-ui.com/docs/get-started/migration) has the rest of it.

## The part I wasn't proud of

Moving on, it was to attend to a few features in the pro system. I didn't have much fun there 🫠.

Maybe I did, but I felt majority of the work I did there weren't really pretty and I was really hard on myself after 😔.

But nonetheless, we got people the ability to invite to teams licensing.

## Chakra v4, and the turn to Panda

Around this time chakra v4 started becoming a conversation, and a tour component.

For chakra v4, we had so many different ideas, of which I did do some little experiments (wonder if to share them here), but it was a baseline start, and the direction we're heading towards lives here. Many have been asking us the same question for a while: *"When will chakra become build time?"* Sage had already written about where this was going in [The future of Chakra UI](https://adebayosegun.com/blog/the-future-of-chakra-ui), and one line in there has basically been our to-do list.

After more thoughts, Sage decided let's move that up. Let's make [Panda CSS](https://v2.pandacss.com) v2.

Now v2 was to bring a lot of grace to v1 (really awesome job on there). v2 was mostly inspired to improve the very said nuance v1 faced. One was speed, and a couple of ecosystem requested features.

During the iterations, I unceremoniously got invited to be a maintainer at Panda v2 (I did make myself a confetti 🎉).

I think v2 has progressed so much and I'm very excited about the upcoming release. The team has been working so hard in making it very much smooth, especially in building a design system.

And Panda is where decide once, use everywhere stops being a nice phrase and becomes an actual config field. You build your tokens and recipes in one package, point an app at it with a single key, and the app stops regenerating a system it only wanted to use.

The speed reveals on large projects. On a 100-file project, a cold parse of every file went from 177ms to 7.6ms. The warm re-parse of a single file, the watch-mode hot path, went from 652µs to 1.8µs (Hey, don't be a nerd!). That second one is the gap between saving a file and seeing the style, and it's small enough now to disappear.

Personally, I'd say we're here already. PandaCSS v2 is here and here to stay. And you can try it out yourself today.

![Two bars comparing a cold parse of 100 files. The v1 ts-morph pipeline fills the whole track at 177ms. The v2 Rust compiler is a small dot at 7.6ms.](/images/blog/a-year-a-verse-and-an-ecosystem/speed.svg)
*Same config, same 100 files. The numbers come straight out of the bench report in the repo, so you can rerun them yourself.*

## Late nights

I'd say the late nights are mostly making sure we have lesser APIs, and thinking about how users would feel using it.

That's deciding if we want the user to be the one making this styling decision, and not being opinionated about designs. Deciding once is only good when it's the right decision to be making on someone's behalf, and a lot of the job is working out which ones aren't. Making sure it doesn't force a model, and that the model we do choose is simply accessible. Be able to create UI with minimal code as possible.

The other one is just fighting with types and experimenting.

So it's rarely some heroic debugging session, it's mostly sitting with an API for hours trying to make it smaller. I built a scheduler machine in zag this year and put a whole resource concept in it, because obviously a scheduler needs resources right? Then I took it out again, nothing was using it yet.

## The mindset shift

It's quite a lot. One is that you need to read a lot and understand things before making a comment or answering a discussion, before deciding what to work on, before picking up an issue.

In the past I'd ask Sage how he came about the design thoughts and the inspiration, and he gave the one answer everyone gives. *"From years of experience."*

I understand it now. Largely it's also picking out what shapes the ecosystem. In the age of AI where we can simply build just anything and everything, you put more thoughts into delivering the best for users, and you don't break anything.

My PR review strategy became almost same as what Sage teaches haha.

Around the ecosystem, off Panda I do reviews and answer discussions across the [chakraverse](https://chakraverse.dev). Not zag yet (feels like so much going on 😂), but interestingly my first ever contribution was to zag, before I even got an invite to collaborate with Sage.

These days it looks like leaving direction notes on somebody else's pull request instead of opening my own. There's a POC for v4 that someone else started, and my actual job on it was to read it properly, write down where I thought it should go, and then ask if we could align instead of pulling in two directions. A year ago I would not have thought that was my place to do.

So somewhere along the line it turned from me asking the questions to me answering them, and I didn't really notice it happen.

Moving on, I think the rosy part of conversations was then becoming a maintainer at Chakra UI as well. Being in charge of releases and [every other thing a maintainer does](https://nesbitt.io/2026/08/28/now-hiring-senior-open-source-maintainer.html).

## Where would I be going from here?

ARK V6!!! (Someone's excited)

![A GitHub notification reading "@segunadebayo has invited you to collaborate on the chakra-ui/ark repository", with Lope's avatar and Sage's avatar side by side, joined by a plus sign.](/images/blog/a-year-a-verse-and-an-ecosystem/ark-invite.png)

Which is around when it stopped feeling like four separate projects I was helping out on, and started feeling like one thing.

To properly work on Chakra UI v4, we have to do a lot of upstream work to make sure Chakra UI users get the very best, of which I'm pretty sold on.

And our direction is very simple. [Panda](https://v2.pandacss.com) v2, [zag](https://v2.zagjs.com/) v2, [ark](https://ark-ui.com) v6, [chakra](https://chakra-ui.com) v4. In that order, cos the ones on top can't really move till the ones under them do.

Panda v2 is the one I'm really excited about. Try the beta, play with it, and don't go all *beta could be bitter*. No, the beta we have here is better, people are already building on it. If you find anything wrong, [tell us here](https://github.com/chakra-ui/panda/discussions/3599).

**Phew! A busy year in [chakraverse](https://chakraverse.dev/).**

In all of this, I think I perhaps might have forgotten how I totally much started. But the most exciting thing here has been working at Chakra UI, and every project, and for one I'm totally grateful for the privilege to be able to give back to the dev community and also learn from the dev community.

And more is coming. We'll keep improving every of the projects you use today, for you to build better relationships with UIs.

So go build something you're proud of. And when you do, come tell me about it. I'll be around.
