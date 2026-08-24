---
title: Almost got got
description: I was just trying to download a sermon, and I almost pasted malware into my terminal. That near-miss turned into our CPE 510 project, and a small crusade to make security policy something people actually remember.
date: 2026-08-23
---

![Almost Got Got, a field guide to social engineering](/images/blog/almost-got-got/og.png)

Security is important.

Well, this is another project to wrap up my last day at Forcados.

I had already prepared a slide some time during the semester for our fair project.

**CPE 510 - COMPUTER SECURITY TECHNIQUES**

Page 360 of Network Security Essentials
Sub-Topic: Malware countermeasure approaches

Assignment: There are four main elements of prevention listed by SP 800-83: *Policy, Awareness, Vulnerability Mitigation, Threat Mitigation.*

Divide yourselves into four groups, one element per group and do something educative or presentable with the element assigned to your group, it can even go beyond the classroom, towards the whole school.

The experience was mostly personal. I was trying to download a sermon, and I think it was on the old site, and yeah, there was some weird behavior. I saw an Apple boot screen, so identical, and then I was told to copy some things into the terminal to make the window go away. In a panic, I almost fell for the trick till I researched it. 😅

When our CPE 510 group got handed "Malware Countermeasure Approaches", specifically SP 800-83's four elements, the first thing I noticed was how useless every textbook definition felt next to what had just almost gotten me. So I started where everyone starts, the team slide. Then I went a step further and put together an actual policy document for FUTA, a proper Malware Prevention Policy. It was solid. But it didn't feel right. It was still just us talking at people, and it needed more of the community in it.

That's when the idea clicked: gather real stories from real people, and build the thing around them. I took it to the group and they agreed in unison. And watching how the other groups were approaching their elements, I already knew what I didn't want. We shouldn't make policy boring. We should make it fun, something that leaves a memory.

So I made two forms, one for the inner team and one for the public. Eleven came back from the team, twelve from outside. Twenty-three stories. ❤️ And the wild part wasn't the number, it was how close to home all of it was. Friends. Neighbours. People a text away. Appreciate everyone who shared. And once we lined the stories up, the pattern was impossible to miss.

The core was mostly social engineering, which is a prevalent issue in the modern world. In the developer space, we've been having a lot of supply chain attacks and even malware, GitHub ones, npm ones. It's been a really crazy 2026. Lots of tools have been developed to track these; thankful to Sentry today for their immense efforts, and the npmx community for one.

So here's the thing about those four elements. Awareness, Vulnerability Mitigation, Threat Mitigation, those three are mostly about machines. Patch this, scan that, filter the other. But Policy? Policy is about people. And that's exactly why I didn't want us to write the usual "users shall not..." document that nobody reads and everybody forgets.

Because think about what actually happened to me. No virus caught me. No firewall failed. A website just... asked me to do something, and I almost did it. That's social engineering. There's no antivirus for a human being deciding to trust the wrong thing. The only thing that stops it is you knowing the trick before it reaches you.

So that became our whole idea: a playbook, not a rulebook.

Instead of listing rules, we list the moves. The way the scammer plays it, and the one line that beats it. Like:

The move: someone calls saying they're from ICT, and your account gets shut down unless you confirm your password right now.
The counter: ICT will never ask for your password. Ever. Hang up.

Same information a boring policy would give you. But this one you'll actually remember when your phone rings.

That's where the forms came in. I didn't want to sit and invent scams from a textbook, I wanted real ones. So the inner form is for my team, twelve of us, each person owns one "play," researches it, and writes the move and the counter. The public form is for everyone else, the whole school and beyond, just tell us your story. Have you ever been scammed, or nearly? What happened?

And people showed up ❤️. Honestly, it was a little scary seeing how common all of it is.

The pattern was almost always the same. Someone pretending to be your bank, or a person you trust, and a push to move money or read out a code right now. Not one of the stories was a real hack. Every single one was just... persuasion. That's the whole thing. The vulnerability was trust.

Getting it to feel right took a while. More sessions than I'll admit, going back and forth on how it should look and how it should read. A slide deck? A poster? A PDF nobody opens? We kept pulling it apart and putting it back together until it became two things in one: a playbook you can scroll on your phone, and a field manual you can flip through like a little book. The design mattered as much as the words, because a policy nobody enjoys reading is a policy nobody reads.

The plan is to put it all together as a webpage. One link. Something you can open on your phone, read in three minutes, and actually enjoy reading. Fun on the surface, but real underneath, because there's still a proper policy sitting under the playbook, the kind FUTA ICT could actually adopt if they wanted to.

It's live here: **[almostgotgot.vercel.app](https://almostgotgot.vercel.app)**. Fifteen plays, the habits that beat them, and the real cases behind each.

![The playbook, a field guide to social engineering](/images/blog/almost-got-got/hero.png)

You can read it straight down the page, or flip through the whole thing like a book.

![The book view](/images/blog/almost-got-got/book-cover.png)

![The habits, and the plays](/images/blog/almost-got-got/overview.png)

Funny how it started. I was just trying to download a sermon. 😅 Almost got got. And instead of keeping it to myself, it turned into a thing that might stop someone else from almost getting got too. That's the part I like. Not a policy in a folder. Something people remember.

And while this might feel like a school project, security, the kind of threats we're facing now, is your responsibility and mine. It might not affect you today. It might be something far off you read about in the news. But some of it gets closer. Someone around you could get hit by a supply chain attack, dev-related, that quietly gains access, and by that law of the universal circle where everyone seems connected, you could end up part of the attack too.

So keep your passwords carefully. Guard your privacy as much as you guard everything else. Your network, your internet, guard those too. Open links you trust. If you don't trust one, view it through something that keeps it away from your PC. And if you must run code, run it in a virtual machine.

Don't spin the wheel to claim some iPhones. Don't open that link. Don't download that free game. Protect your friends.

Here's what I keep coming back to, as someone who builds things: security isn't a compliance checklist. It's a UX problem. If the safe path isn't also the easy, obvious, memorable one, people will keep pasting the command from the fake Apple boot screen. Every time. That's not their failure, it's a design failure. So we designed the safe path to be the one you actually remember.

And I really do believe the internet can be made safe. Not by some big company, not by one clever tool, though those help. It begins with you and me, and the small careful choices we make every day.

Let's make the web, the internet, a safe place again.
