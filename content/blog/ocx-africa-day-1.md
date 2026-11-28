---
title: OCX Africa, Day 1
description: "I joined a random Google Meet, signed up for OCX Africa, and spent a day in Lagos learning about makers, sandboxed agents, LLMs and first pull requests. Then I forgot my food."
seoTitle: "OCX Africa 2026, Day 1: makers, agents, LLMs and first pull requests"
date: 2026-11-22
series: OCX Africa
part: 1
---

[![The OCX Africa stage and rows of empty chairs at The Zone, Lagos, before the first session](https://live.staticflickr.com/65535/55623356955_7c46e87c04_b.jpg){loading="eager" fetchpriority="high" width="1024" height="683"}](https://www.flickr.com/photos/108559379@N08/55623356955/)

I wouldn't have forgiven myself if I didn't write about this experience.

I also promised myself I'd write it, so I stay accountable for what I learned. FWIW, I've attended a few events, and [OCX](https://ocxconf.org/ocx-africa/) is the tech event I've enjoyed the most.

OCX Africa was the first Open Community Experience in Africa, run by the Eclipse Foundation with [Open Source Community Africa](https://www.linkedin.com/company/oscafrica) (OSCA). It ran on 30 and 31 October 2026 at The Zone in Gbagada, Lagos, and it sold out. This is day one.

## How did you get to know about OCX?

I was working on some features and needed a breather, so I went on X. Samson had posted that he wanted to just have a chat on a Google Meet, and I said, let's do it. (FYI: I didn't know who Samson was until that day.) I googled him after the call. He's [Samson Goddy](https://www.linkedin.com/in/samsongoddy), from OSCA, the community partner for OCX Africa.

I casually joined the call, and since it was meant to be a break, I didn't want to overwhelm him with work talk. So I blurted out the weirdest question: did he watch basketball? 😂

I felt I'd messed it up, because I wanted it to feel natural. Everyone else was asking questions that made sense, so, peer influenced, I asked what he thought about open source. He sent me to [his article](https://blog.samsongoddy.com/what-happens-to-open-source-when-humans-stop-writing-the-software), which he said fully explains what he thinks about open source now.

While the conversation was going on, he shared the link to OCX Africa. I signed up quickly, since it felt like spots were limited and it was close to where I stayed 😇

## Day 1

I arrived a bit late on day one, because I had to put some things in place at home and work a bit first. I was half expecting a large audience. When I got there, the crowd was small, and I thought, oh man, this is going to be amazing 😅 (I like small. I usually burn out whenever I see a large audience.) It was a small room, and you could tell from the chair arrangement. The events I used to go to happened in big halls with lots of people.

I missed most of "One foundation, five frontiers: Inside Eclipse's open source ecosystem", but I was early for [Moses Adebayo](https://www.linkedin.com/in/adebayomos)'s talk. A couple of faces felt familiar from X, and an old friend, Nosa Osas, was there too. I was quite nervous tbf, but I tried to blend in as much as I could.

[![The opening Eclipse session, One foundation, five frontiers, which I mostly missed](https://live.staticflickr.com/65535/55623072428_27142a19f7_b.jpg){width="1024" height="683"}](https://www.flickr.com/photos/108559379@N08/55623072428/)

### Empowering African makers: Open source IoT and fabrication for the next generation

[![Moses Adebayo on stage beside a slide about defining the problem, moving fast and building an MVP](https://live.staticflickr.com/65535/55622925131_d731497417_b.jpg){width="1024" height="683"}](https://www.flickr.com/photos/108559379@N08/55622925131/)

Moses took us through his journey building with GreenLab and how tough it was to start building hardware. He gave some amazing takeaways:

- Find out why you're doing the work you set out to build. Define the purpose: is it for fun, or for commercial use?
- Start with the simplest version of what you want to build, then keep improving it with simulation, developing the idea from start to finish.
- Ignore the noise at the proof-of-concept stage. Stay with the boring work until you get to the final part of building.

He wrote more about that journey, from consumer robotics to Travella, in [his LinkedIn post](https://www.linkedin.com/posts/adebayomos_back-in-2019-we-started-out-focused-on-ugcPost-7525496237555462144-xxlF/).

I took a lot from it. I did a few hardware projects in school robotics, like [Elvon](/blog/hey-elvon), and I wanted to make my own robots at home, so it got me thinking: "oh yes, finally a better lens on everything I've been trying to do."

GreenLab Microfactory, founded by Babáṣílé (more on him below), is recorded as Nigeria's first Fab Lab, and it sits at FUTA, my own university. I had a session with them in 100 level, something around Arduino.

### Coffee time!

I connected with Samson here, and with [Ruth Ikegah](https://www.linkedin.com/in/ruth-ikegah). The conversations were short, if you ask me, because I got panic-struck about what to say to people, sheesh. Got to get better, don't I? Nosa helped me blend in, and most of my panic washed away. I had coffee and some bread (I don't remember what it looked like), and the coffee kept me awake through the next sessions. I broke my no-coffee diet for it.

### Full autonomy, zero panic: Running AI coding agents safely with Eclipse Enclave

[![Victor Olamide Akande presenting the four things Eclipse Enclave controls](https://live.staticflickr.com/65535/55623347840_2ab5fdc367_b.jpg){width="1024" height="683"}](https://www.flickr.com/photos/108559379@N08/55623347840/)

We've all used agents, and sometimes we need them to do pretty big things for us. Victor Olamide Akande walked us through [Eclipse Enclave](https://enclave.eclipse.dev) and why we should run agents in sandboxes instead of leaving them running wild. An agent roaming freely with wide disk permissions can mess up your workspace, or even your team's, and do things that can't be reversed. So you give agents a box, and they can only reach what you allowed.

### What do you think happens when you talk to an AI agent?

This session was charming. I even [said so on X](https://x.com/I_am_Lope/status/2116159459735069087).

[![Rasheedat Atinuke Jamiu on stage, with the Transformer Explainer on the screen behind her](https://live.staticflickr.com/65535/55622922616_22b0b7c974_b.jpg){width="1024" height="683"}](https://www.flickr.com/photos/108559379@N08/55622922616/)

[Rasheedat Atinuke Jamiu](https://www.linkedin.com/in/rasheedat-atinuke-jamiu) took us through everything that happens under the hood when you type a single question like "What is the capital of Nigeria?". I already had an idea of how LLMs work, so it was fun, and I still learned a lot more about the selection and probability that happen inside. It's funny how LLMs are just matching words to give us something that feels good. They don't have a deep understanding of us, just a bunch of probabilities that turn into a response. She shared two resources for us to play with. The one I remember is the [Transformer Explainer](https://poloclub.github.io/transformer-explainer/), where you can go into the deep parts yourself and even tune the temperature.

In short: your sentence is split into tokens, each token becomes a list of numbers, attention works out which words matter to each other, and the model scores every possible next word. Temperature decides how adventurous the pick is.

### 10 years building open source: Lessons from Nigeria, North & West Africa

[![Babáṣílé on stage pointing at a slide about the Fab Charter](https://live.staticflickr.com/65535/55622920096_0062c96eb1_b.jpg){width="1024" height="683"}](https://www.flickr.com/photos/108559379@N08/55622920096/)

Dr. [Babáṣílé Daniel Ọládélé-Emmanuel](https://www.linkedin.com/in/babasile-daniel) walked us through his experience of building in the open in West Africa. He worked with schools to build curriculum around hardware, and for odd reasons some of them never gave back the data they were asked for. His lesson was that trust is necessary in open source, and that people play a big part in making it last.

He introduced us to what the Fab Lab does and the challenges they've faced, and talked about what they've built at GreenLab over the years.

I remember him saying he bought some land, and before they could build anything there, some people marked the place with voodoo 😂. He just fenced it and left it for a while.

### Lunch & community networking

<!-- Lope: Oliver's LinkedIn is a medium-confidence match (Ikegah Oliver, GitHub oliverTwist2); check it's him. -->

Lunch was interesting. We took pictures and talked about the sessions. I met a guy building a more affordable Tawk.to, and two friends, both named Ibrahim, building a way to get through applications to schools abroad: they handle the hard process for you, so you worry less about it. My memory is fuzzy here. I really should write things down as soon as I get back in the evening, because I don't remember everyone I met.

Oh yeah, I met [Oliver Ikegah](https://www.linkedin.com/in/ikegah-oliver-11a112253) as well. We had a good conversation about what he's been exploring in open source.

### From user to contributor: Your first pull request to open source

[![Thomas Froment and Frédéric Desbiens in front of a slide: read the documentation, create your Eclipse Foundation account, complete the ECA, prepare your environment](https://live.staticflickr.com/65535/55621917527_6baa6a5a01_b.jpg){width="1024" height="683"}](https://www.flickr.com/photos/108559379@N08/55621917527/)

After lunch came a kind of session I always love. Like many people, my own start in open source was "how do I contribute?", and then you're hit with "is open source really for me?"

[Thomas Froment](https://www.linkedin.com/in/tfroment) and [Frédéric Desbiens](https://www.linkedin.com/in/fredericdesbiens) walked us through the basics of contributing. Their checklist before a first pull request was short: read the docs, create an Eclipse Foundation account, sign the ECA (the Eclipse Contributor Agreement), and set up your environment. And tbh open source is what it has always been: the human part is the open source.

When people ask me how to contribute, I usually point them to [Salma Alam-Naylor](https://www.linkedin.com/in/salma-alam-naylor)'s [How to make your first open source contribution](https://whitep4nth3r.com/blog/how-to-make-your-first-open-source-contribution/). A week before OCX, [James](https://www.linkedin.com/in/mrjamesakpan) asked me on X where to start, and [that's the piece I sent him](https://x.com/I_am_Lope/status/2113407397373104527). As she puts it, "open source really is about humans, rather than code."

That second step is where I got stuck. The next morning, on my way back for day two, I wrote down what I'd fix on Eclipse's own sign-up form. It showed one error at a time, so I submitted it three times before I found the character it didn't like. I haven't filed them yet. I got busy, for the love of me. So my first contribution to Eclipse is still waiting.

### Quiz: How well do you know open source?

[![Babáṣílé at the podium with the quiz screen full of player names behind him](https://live.staticflickr.com/65535/55623123894_375ec4393f_b.jpg){width="1024" height="576"}](https://www.flickr.com/photos/108559379@N08/55623123894/)

😭 You know when you walk into a room full of confidence and trip on your face? Yeah, that was me with the quiz. I did pretty well early on, but I was too slow on some questions, partly the network and partly me overthinking my answers. The quiz itself was truly amazing, though. Wait till you hear what happened on [day two](/blog/ocx-africa-day-2).

### Networking reception

![A blue drink from Juicers on the bar at the networking reception](/images/blog/ocx-africa-day-1/juicers.jpg)

After that we [had some drinks](https://x.com/I_am_Lope/status/2116268751528051139). Classic me: the conversations were so good I didn't want to go home. When I finally packed my bags and got home, I realised I'd left behind the food I had kept safely for dinner. You should have seen how hurt I was. I searched my bags frantically, like five times, thinking I was dreaming. I almost passed out from heat exhaustion too, since the traffic had already stressed me out 🥲

That night I [tweeted](https://x.com/I_am_Lope/status/2116238887593066970): "Conversations so good I forgot my food 😭"

[Thabang Mashologu](https://www.linkedin.com/in/thabang-mash/) wrote about why OCX Africa mattered to the Eclipse Foundation: [Africa is shaping the future of open source](https://blogs.eclipse.org/post/thabang-mashologu/africa-shaping-future-open-source).

Day two had a quiz app, a quiz that broke my heart, and a danfo on a chip. [Read day two](/blog/ocx-africa-day-2).

*Event photos link to the Eclipse Foundation's [OCX Africa 2026 album](https://www.flickr.com/photos/108559379@N08/albums/72177720336439234/) on Flickr. The drink is mine.*
