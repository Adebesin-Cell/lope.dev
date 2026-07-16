---
title: Too scared to say Hi
description: How a kid with crippling imposter syndrome went from too scared to type "Hi" to maintaining Chakra UI and leading Panda v2. The origin. Raw.
date: 2026-07-16
---

::hi-cover
::

It takes me real, physical effort to type "Hi" in a channel.

Not "Hey, here's my PR, could you review it?" Just *Hi.* I'd draft that message, delete it, draft it again. I'd panic before opening an issue on a repo that *literally has an issues tab for exactly that*, because some part of me was certain I'd be seen as a menace, a bother, the guy who didn't belong 😄. That's not a bit for the blog. That's just how a lot of my engineering years actually went.

So open source (the place where you do all of that in public, in front of the people who built the things you use every single day) was never going to be easy for me. The first time I really understood what it was, I was mostly just confused. Where do I contribute? What do I even know that's worth sharing? Am I good enough to be in the same repo as them?

I carried those questions around for years. Early on at [IQ.wiki](https://iq.wiki) (I just hit my 4-year anniversary this month, wild) I put them to my team lead, :mention{handle="Royal-lobster" name="Srujan Guram"}. His answer was simple and kind: just contribute to the projects we already use at wiki. Start where you already are. Clean advice, honestly. And I still didn't move, because imposter syndrome doesn't care how good the advice is. It had me on a hook and wouldn't let go.

Open source became this place I circled for years but never actually walked into. I wanted in so badly, but I always had an excuse loaded and ready to make it look like I just didn't have the time. There was school. There was work. There was being human. And underneath all of those, quietly, there was the fear of being seen.

But I kept nibbling at the edges. Before I ever touched Hacktoberfest, I'd already shipped something real: back in March 2024, a PR to Magic Labs to move their connector onto the wagmi v2 standard, one of the connectors we used at wiki ([magiclabs/wagmi-magic-connector#16](https://github.com/magiclabs/wagmi-magic-connector/pull/16)). I took my sweet time with that one, days longer than it needed, because it was my first proper step into someone else's codebase and I wanted it to be perfect before a stranger saw it. It got merged. It felt incredible. And then the feeling faded, because a single PR wasn't what I was actually after.

I wanted something to *stay* in. Something with a community around it, where I could help people actually use a project, guide them, stand in front of the thing and go "this is what we built, and here's what it does for you." I've always loved that. I'd watch React and Vue conference talks on repeat, not really for the content, but for the picture of it: someone who shipped a thing, standing up, getting to explain it to a whole room full of people who cared.

And that's the smaller, sillier dream I almost never said out loud. I didn't just want to contribute. I wanted, one day, to stand on a stage like that and talk about something I'd built. Not attend. Talk. I'd think about it and immediately feel ridiculous, because I couldn't even type "Hi."

So that became my actual bar for what to look for: not a random issue to close, but something *developers use*, something you could stand on a podium and present. And here's the thing, I wasn't only wishing for that, I was already building toward it at my day job. At IQ.wiki we made [ADK-TS](https://github.com/BrainDAO/adk-ts), an open-source framework for building AI agents, and I poured 47 PRs into it trying to make it golden, the kind of tool a developer reaches for and a maintainer gets to stand up and talk about. That was the shape of what I wanted from open source too. Not a scattering of drive-by fixes. A flagship. Something with my fingerprints all over it that people actually reached for.

## Still searching (and one reply that stuck)

Early 2025, still circling. I'd just read [TkDodo's open-source origin story](https://tkdodo.eu/blog/my-open-source-origin-story) and it hit close enough that I actually worked up the nerve to leave a comment and ask him directly. Not "how do I find a project", the honest version: *I still get lost when contributing to major open-source projects, the complexity feels overwhelming, how do you navigate that?*

And he replied. Properly.

<!-- 📸 IMAGE (provided): TkDodo discussion screenshot -->
![My exchange with TkDodo on his open-source origin story, March 2025](/images/blog/oss/tkdodo-discussion.png)
*Asking TkDodo how to stop feeling lost in big codebases, on [his origin-story post](https://tkdodo.eu/blog/my-open-source-origin-story). His answer came down to one word: time.*

He said he'd felt exactly as overwhelmed staring at the Query codebase at first, that it's only natural, and that he deliberately *didn't* start with code contributions. He spent months just reading the codebase and answering people's questions before he ever felt confident enough to build a feature. My takeaway, which I wrote back to him, was almost embarrassingly simple: it takes time, and as the complexity grows, it takes even more of it. Nobody skips the part where you feel lost. You just stay long enough that lost turns into familiar.

I opened a few similar discussions on other repos too, saying I'd been looking for a project to call home for a long time. Those ones mostly went to silence. That's fine, that's open source, but at the time each non-reply felt like confirmation of the thing the fear kept whispering.

Hacktoberfest 2024 I actually showed up for. I got through 4 of 5 PRs before exams and that same imposter voice ("they're going to clock that you don't belong here") pulled me back out. But the work was real: a date-picker for one project, a copy-with-markdown feature for another, even a little styling fix straight into :mention{handle="muhammadhafijur" name="Muhammad Hafijur"}'s own side project. That's how I met people, :mention{handle="Johnkat-Mj" name="Johnkat Mj"}, Hafijur, a few others, and their projects cracked the door open just enough for me to see some light in this estranged world of open source. It still wasn't the thing that stays, but it was proof the room existed.

I started writing blogs around then too, turning the tools I used into little storytelling pieces. I loved that feeling as much as the code. Couldn't hold the cadence as long as I wanted, but it was a start, and looking back it was me quietly practising being seen.

I'd even landed a couple of fixes in zag by then, the state-machine engine sitting under Chakra, small things like making sure a file-upload input actually respected its `accept` attribute. But that's exactly what they were: small, drive-by fixes. A merged PR feels amazing for a day, and then the repo moves on without you, and so do you. That was never the thing I was chasing. I didn't want a merge. I wanted a *stay.* Somewhere with my name attached to it. Somewhere I'd still be next month.

## The email

Tired, a bit broken, still grinding, and pretty sure the dream was quietly drifting out of reach. It was August 2025. I was sitting in the lab where I'd been placed for my IT program, six compulsory months of computer networking, the full FUTA burnout arc in effect, when an email landed.

<!-- 📸 IMAGE (provided): Sage's email screenshot -->
![The email from Segun Adebayo, creator of Chakra UI, August 25 2025](/images/blog/oss/sage-email.png)
*August 25, 2025, 4:05 PM. Sage found me through my portfolio, saw I used Chakra at IQ.Wiki, and asked if I wanted to help build it.*

[Segun Adebayo](https://adebayosegun.com). Sage. Creator of Chakra UI. In my inbox, asking if I wanted in. And one line in it stopped me cold.

You don't feel lost. The exact thing I'd just asked TkDodo about, offered to me unprompted, by the person who made the library I'd been building with for years.

Heck yeah I was open to it. Sign me up. Sign me up.

There's backstory that made this land even harder. When I joined IQ.wiki back in 2022, I had a colleague, :mention{handle="anubra266" name="Abraham Aremu"}. We used Chakra everywhere. Abraham was on the Chakra team, and I loved the way he worked, ruthless about which open-source projects were worth his time, precise and unbothered about all of it. I looked up to him hard.

> Please don't see this 😂, I'll get dragged on the WhatsApp group.

But real talk: Abraham had a bigger hand in my open-source story than he knows. He was the proof that someone from my exact corner of the world could be *inside* the thing I only watched from outside. He was the drive you need to actually pick up the task.

## Joining Chakra

It started calm. I was in, and I was still feeling completely out of place, trying to do every single thing perfectly so nobody would regret the invite. And then my machine, with impeccable comedic timing, decided that was the perfect moment to die.

It just broke. Days after I got the one invite I'd been chasing for years, the laptop gave out. I was stuck. I had *just* joined, what on earth was I supposed to say? "Hi Sage, thanks for the opportunity, my computer is dead"? I said nothing and quietly panicked, then scrambled to get another machine as fast as humanly possible, because there was no way, absolutely no way, I was losing the thing I'd been looking for this whole time over hardware.

And I didn't lose it. I got a machine, and then I did the work.

<!-- 📸 OPTIONAL IMAGE: a merged Chakra PR of yours (Rich Text Editor or Component Explorer) -->

That autumn is a blur of Chakra work. I built out an interactive Component Explorer so people could actually *see* a component's anatomy, then shipped a TagsInput, a carousel, a Splitter, a whole Rich Text Editor, and the v2-to-v3 codemod. I even wrote the Chakra integration guide into TanStack Form.

Real components. Real people using them in production. And the entire time, the voice in my head kept insisting I was one PR away from being found out. That's the thing nobody warns you about finally getting the dream: the imposter doesn't read your commit history before it starts talking. The receipts pile up on one side of the desk and the fear just... ignores them.

## Finding npmx

New year, and I stumbled into npmx. If you don't know it, it's a gorgeous, genuinely fast frontend for the npm registry, built loud and completely in the open.

Here's the embarrassing part. Getting *into* Chakra hadn't cured anything. Faced with a brand new repo and a brand new team of people, I was scared all over again. Same old fear of typing in the chat, same certainty that my little PR would be a nuisance. So I did the thing I always do when I'm scared: I shipped the smallest, safest things I could possibly find.

I made the package name selectable. Fixed the localization on a "go back home" button. Added a download button. Tidied an i18n style thing. Tiny. Deliberately tiny. Small enough that if someone hated it, it wouldn't hurt too much.

And nobody treated the small PRs like a nuisance.

That's it. That's the whole turning point, and I know it sounds like nothing until you've spent years too scared to say "Hi" in a channel. The npmx community was just... kind. Curious. Genuinely glad you showed up, however small your first contribution was. Nobody was quietly keeping score of whether you'd earned the right to be there.

Then they did the thing that actually broke the fear for good: they made a video showing off the people building npmx, and [they put me in it](https://bsky.app/profile/npmx.dev/post/3mg62lcgbcs2s). The caption was four words. *"this is open source."*

<!-- 📸 OPTIONAL IMAGE: screenshot of the npmx "this is open source" video / your appearance in it -->

For a guy whose whole dream was to one day be *seen* for the work, and whose whole personality was hiding from exactly that, being pulled into the frame and told "you're one of us, this counts" rewired something I'd assumed was permanent. I said as much [on Bluesky](https://bsky.app/profile/lopeadebesin.bsky.social/post/3mg63bf4res23):

> I used to be really scared of contributing to open-source projects or even speaking up in chats, but @npmx.dev really changed that. I love the community and the team 🚀

Still true. It's the first line of my bio now, right under maintainer.

You can watch the fear shrink month by month. February: make a label selectable, a button, a localization fix. March: a whole brand page, OG images for compare pages, a Tab component with tests. By June I was architecting whole systems from scratch: a core engine, a CLI, the works.

Same person. Four months apart. The only thing that changed was that I stopped flinching before I hit "Create pull request."

## Getting handed the keys

I stopped asking permission to contribute. I stopped waiting until I was *sure* I was good enough before doing the work, and just did the work, which, it turns out, is the exact thing that gets you handed the keys.

Somewhere in there, without one single dramatic moment, I became a maintainer. First at [Chakra UI](https://chakra-ui.com), then at [Panda CSS](https://panda-css.com/). The exact thing I'd wanted since the very beginning, a project with my name actually attached to it, and I almost missed the moment it happened because I was too busy working. The kid who used to draft and delete "Hi" gets asked to review other people's code now. And honestly? That's the part that still scares me most, being the person whose comment could quietly make someone feel like they don't belong. So I fight to be the warm room I spent years looking for, because I remember precisely what it costs to open that first PR.

And the work changed shape. Components were one thing; the engine underneath is another. I got into zag, the state-machine layer sitting under Chakra and Ark UI, and started building the actual machinery, a whole new scheduler state machine from scratch, and chasing down a nasty date-input bug where the wall-clock time drifted across formatter timezones, the kind of quiet correctness work I used to assume "real" contributors did and I didn't. Turned out I just had to do it.

## Leading Panda v2

Then the big one. I'm leading [Panda](https://panda-css.com/) v2.

<!-- 📸 OPTIONAL IMAGE: Panda v2 / a merged panda PR or the repo -->

Panda is the zero-runtime styling engine a lot of design systems build on, and v2 is close to a full rethink. We're tearing out the old Node pipeline and putting a Rust stack in its place, shipping the compiler to WebAssembly so it runs in the browser, in StackBlitz, in WebContainers, standing up the v2 beta with native publishing, and adding first-class design-system support so a team can adopt a whole system from a single config field. We even ran the benchmarks to prove the new stack is genuinely faster, not just newer.

This is the golden one. The thing developers use, the thing you actually get to stand on a podium and talk about. I went looking for a project like that for years, and somehow ended up helping lead one.

## Where I am now

I still feel the fear some days. I've just stopped waiting for it to leave before I start.

FUTA is almost behind me, and more and more of what I build now is my own. I'm a founding engineer at [BethelFlow](https://www.bethelflow.com/), and my final-year project quietly became the thing I'm proudest of: [Ekphrasis](https://github.com/Adebesin-Cell/ekphrasis), a browser extension that describes images for blind and low-vision users. Instead of spitting out a generic AI caption, it grounds the description in the page you're actually on, so the same photo reads differently on a news site than it does in a shop. It runs a vision model on-device over WebGPU for privacy, and only reaches for the cloud when it needs the extra quality. It's open source now.

That's the kind of thing I'd want on the slide behind me one day, right next to Panda. Something I built, that helps someone, out in the open where anyone can look.

Because here's the honest ending, the part I couldn't have said at the start. Open source is stressful. It's high-stakes. It costs more than it looks like from the outside. And every single time I read about it, or get to work on it, I want more of it. I love helping people, and this is the truest way I've found to do it. The fear never fully left, I just found something I love louder than I'm scared of it.

So if you're where I was, circling the door and dead certain you're not good enough to walk in: the receipts don't come first, you do. Ship the small thing. Find the warm room. Stay long enough that lost turns into familiar. And then, one day, hold the door open for the next person who's too scared to say Hi.
