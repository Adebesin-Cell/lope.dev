---
title: OCX Africa, Day 2
description: "Day two of OCX Africa: I wired Claude Code into Eclipse Theia, built a quiz app, heard how OSCA began, lost a quiz I was winning, and turned an MXChip into a Lagos badge."
seoTitle: "OCX Africa 2026, Day 2: Theia AI, an open source panel and Eclipse ThreadX on the MXChip"
date: 2026-11-25
series: OCX Africa
part: 2
---

[![The day 2 group photo: everyone at OCX Africa in front of the OCX Africa wall at The Zone, Lagos](https://live.staticflickr.com/65535/55629382621_fbe9d6ec3b_b.jpg){loading="eager" fetchpriority="high"}](https://www.flickr.com/photos/108559379@N08/55629382621/)

I got there early this time. Thankfully, I ignored the voice telling me to leave my laptop at home, or I'd have missed a ton of good work. Good Lord, always bring your laptop to tech events, especially the small ones 🙏

If you missed it, [day one is here](/blog/ocx-africa-day-1).

## Day 2

### From LLMs to Agents: Build and understand your own AI coding environment

Getting there early meant a good seat and time to set up before Thomas started. I was in my black jacket, "Jensen style", as Moses called it 😅. I love jackets (I should seriously own more).

[Thomas Froment](https://www.linkedin.com/in/tfroment) ran this one, a two-hour workshop. He started with [Theia AI](https://theia-ide.org/), the AI layer in Eclipse Theia, and how much of it you can customize: the agents, the prompts, the models behind them. Then he let us build our own setups.

That's where I got stuck. Theia wanted a paid key for Claude, the AI model I wanted to use, and my account had $0 on it. I already pay for Claude every month, so I asked the obvious question: can't I just connect the Claude I already use, like I do in my usual editor?

You can. It just took me five errors and about twenty minutes before it finally answered my "Hi" 😅 Small win, big relief 🎉 If you're curious what those five errors were, I've tucked them in here:

::collapse{title='The five errors between me and that "Hi" 👀'}
Theia has a Claude Code provider, but getting it running went like this:

1. I pointed it at my `claude` binary. Wrong: Theia doesn't run the CLI, it loads the Agent SDK, and it went looking for an `sdk.mjs` that the binary doesn't ship with.
2. No default agent was set. I had to pick Claude Code myself, or start the message with `@ClaudeCode`.
3. `mkdir '/.claude'` failed. I hadn't opened a folder, so it tried to create its settings at the root of my disk. macOS said no.
4. `npm i -g @anthropic-ai/claude-agent-sdk` failed with `EACCES`, because my global npm folder belongs to root. I pushed through with `sudo`, which isn't ideal. The cleaner fix is to point npm's global prefix at a folder you own.
5. The path was still wrong. I had to point the Executable Path setting straight at `sdk.mjs` inside the installed package.

One more: the SDK carries its own copy of Claude Code, so when you update `claude`, update the SDK too.
::

There was a starter project we could build on, but I wanted to push myself. I wanted a quiz app with its own feel. I found some Dribbble shots I liked (thick black outlines, hard offset shadows, one loud pink) and wrote a prompt around them: Java for the backend, [Panda CSS](https://panda-css.com/) for styling (of course my UI has to [practise what I maintain](/blog/practice-what-you-maintain)), and [Ark UI](https://ark-ui.com/) for the interactions. Ark serves Vue too, so no React this time.

Java does the real work, like marking your answers and running the timer, and the page you see just shows it. Your browser never gets the right answers before you submit, so nobody can cheat by peeking 👀

And there I went. Things broke, as they do: Java couldn't be found, my own impatience broke my build, and dark mode made every card look like it was glowing 😂 Want to know how each of those happened? Open this:

::collapse{title="How Java went missing, my build broke and dark mode started glowing 🔧"}
- **"Unable to locate a Java Runtime."** I had Java 21 from Homebrew, but it wasn't linked, so nothing could find it. Pointing `JAVA_HOME` at it directly fixed it.
- **My own build broke.** I ran `./gradlew bootRun` while the agents were still writing pages. Three pages didn't exist yet, and the landing page failed type-checking with `'WebkitBoxDecorationBreak' does not exist in type 'SystemStyleObject'`. A Panda type error, in my own app. Humbling.
- **A test calling an endpoint that was gone.** The hello endpoint got deleted, but a test and the landing page still called it.
- **Dark mode.** The borders and shadows shared one colour that flipped to near-white, so every card got a white outline and a white glow. Dark mode got its own tokens, and I got a theme toggle.
::

Theia got the project started, but when the clock began running out, I moved to my usual setup and split the work between a few AI helpers: one building the behind-the-scenes part, one building the screens, and two checking the others' work. The checkers caught real problems. Two people saving a quiz with the same name at the same moment could crash the app, and anyone at all could create quizzes. So now publishing a quiz needs a password, a "creator key", and if the key gets rejected when you save, your quiz stays put.

The workshop ended before I was done. I kept going, and a bit after 1pm it ran: **Kwizi** 🥳, with a ten-question OCX Africa 2026 quiz built in.

![The OCX Africa 2026 quiz in Kwizi, open on question one: which organisation runs the OCX conferences?](/images/blog/ocx-africa-day-2/kwizi-ocx-quiz.jpg)

Of course I [posted it on X](https://x.com/I_am_Lope/status/2116502914839543945).

Here's the whole app, screen by screen. I ran it again for this post and played the OCX quiz:

::phone-carousel
---
label: Kwizi, screen by screen
slides:
  - src: /images/blog/ocx-africa-day-2/kwizi/01.webp
    alt: "Kwizi's landing page: \"Learn anything, one playful quiz at a time.\""
    caption: "The landing page"
  - src: /images/blog/ocx-africa-day-2/kwizi/02.webp
    alt: "The browse page with filters for age group, difficulty and question type"
    caption: "Browse quizzes, filtered by age, difficulty and question type"
  - src: /images/blog/ocx-africa-day-2/kwizi/03.webp
    alt: "The OCX Africa 2026 quiz, open on question one of ten"
    caption: "The OCX Africa quiz, ten questions"
  - src: /images/blog/ocx-africa-day-2/kwizi/04.webp
    alt: "Question one with \"The Eclipse Foundation\" selected"
    caption: "Multiple choice. Easy one 😌"
  - src: /images/blog/ocx-africa-day-2/kwizi/05.webp
    alt: "A fill-in-the-blank question with \"Africa\" typed in"
    caption: "Fill in the blank"
  - src: /images/blog/ocx-africa-day-2/kwizi/06.webp
    alt: "A matching question pairing three OCX editions with Mainz, Brussels and Lagos"
    caption: "Matching: each OCX edition to its city"
  - src: /images/blog/ocx-africa-day-2/kwizi/07.webp
    alt: "The results screen: 9 out of 10, with the question review starting below"
    caption: "Scored 9 out of 10. I missed one, of course"
  - src: /images/blog/ocx-africa-day-2/kwizi/08.webp
    alt: "The review of question 8, marked incorrect: I answered 2021, the correct answer is 2019, with the reason below"
    caption: "The one I missed: 2021, not 2019. The review tells you why"
  - src: /images/blog/ocx-africa-day-2/kwizi/09.webp
    alt: "The create page asking for a creator key before you can publish"
    caption: "Making your own quiz needs a creator key"
  - src: /images/blog/ocx-africa-day-2/kwizi/10.webp
    alt: "The landing page in dark mode"
    caption: "And dark mode, because I fixed it 😅"
---
::

Looking back, the Theia errors weren't about the model at all. They were about the setup around it: which agent answers, what folder it can see, and where its tools live. It's the same lesson I wrote about in [context is everything](/blog/context-is-everything): the model is only as good as what you put around it. Thomas's title said "understand your own AI coding environment", and tbh, I left understanding mine a lot better.

### Beyond local setup: Building a secure, AI-powered cloud IDE with Eclipse Theia and Google Cloud

[![Mary Mbaoma at the podium, beside a slide that reads "Think beyond a generic code editor"](https://live.staticflickr.com/65535/55629519549_edc0dee233_b.jpg)](https://www.flickr.com/photos/108559379@N08/55629519549/)

Mary, I'm so sorry I walked in after you'd started 🙈 I felt cold, the stress of the morning had caught up with me, and my nose wouldn't stop running, so I spent longer outside than I planned.

[Mary Mbaoma](https://sessionize.com/mary-mbaoma) is a cloud and DevOps engineer here in Lagos, and her talk picked up right where my morning left off: Theia again, but this time not on your laptop. Her pitch was to think beyond a generic code editor. What if a fintech team working with internal APIs, a platform team managing Kubernetes, or a bootcamp teaching Python each got an IDE made for how they work, instead of one setup for everyone?

Her answer was to build it on Theia and run it on Google Cloud Workstations, which runs that editor on Google's computers instead of yours. Everyone on the team gets the same setup, one person controls who gets in, nothing is lost when you close the tab, and all you need is a browser. She walked through it in phases, and [her repo](https://github.com/Mbaoma/AI-powered-IDE-with-Eclipse) follows the same steps: a custom Theia IDE running locally, then the same IDE as a cloud workstation, then Gemini wired in through Theia AI.

I didn't follow every step, since I came in late, but she did great 👏

### Panel discussion: African talent, global impact: Open source in the age of AI

[![The panel on stage, from left: Adeyinka Oresanya, Ruth Ikegah, Samson Goddy and Thabang Mashologu](https://live.staticflickr.com/65535/55629330421_a11cf88ee4_b.jpg)](https://www.flickr.com/photos/108559379@N08/55629330421/)

The big one! [Thabang Mashologu](https://www.linkedin.com/in/thabang-mash/) from the Eclipse Foundation asked the questions, and [Adeyinka Oresanya](https://podcast.chaoss.community/guests/adeyinka-oresanya) from CHAOSS, [Ruth Ikegah](https://www.linkedin.com/in/ruth-ikegah) and [Samson Goddy](https://www.linkedin.com/in/samsongoddy) told us how they got into open source.

It turned out to be a circle. Adeyinka said Ruth introduced her to open source. Ruth said it was Samson who introduced her. And they were sitting in exactly that order: Adeyinka, then Ruth, then Samson. Even the seat arrangement made sense 😂

Then Samson told his. It started long before [Open Source Community Africa](https://www.linkedin.com/company/oscafrica) (OSCA), which he co-founded, and it started with games. He wanted to play what everyone else was playing, but his computer couldn't run the popular games. While trying to find a way around it, he worked out why: his machine ran Linux, not Windows. That was his way in. (He tells a longer version in [this interview](https://www.opensourcestories.org/stories/2021/samson-goddy/).)

Ruth's start was a conversation. Someone explained it to her on a call: open source is like volunteering, just with software or hardware, and it isn't limited to code. Organising meetups counts too.

Hearing those stories from the people who lived them, and how they turned OSCA into a community that keeps growing across Africa, is something I'm glad I saw with my own eyes. They talked about the good parts of open source and the hard parts too.

Ruth was clear about one misconception: going into open source expecting to get paid. Not every project gets enough funding (we all know this), so it doesn't always pay. But that doesn't make open source less worth it. The world runs on open source and will keep running on it. Think of it like volunteering.

That matches what I've seen. Most people's first contribution starts the same way: you're using something, you hit friction, and you put in the time to fix it.

### The open source AI developer stack quiz

I don't know, man 😂 I had some of the worst luck here.

After day one, my heart was pounding for this quiz, and I came prepared. Thomas ran it, and I was speedrunning: every answer loaded the moment I tapped it. Whenever the leaderboard came up, there I was at the top, as Lope. I was already picturing the prize 😂

Then, on question 13 of 20, right after Thomas pulled up the leaderboard with me on top and the fastest times, the next question didn't load.

::slides
---
label: How I felt when the question didn't load
width: 960
height: 540
slides:
  - src: /images/blog/ocx-africa-day-2/haikyuu/01.webp
    alt: "Haikyuu. Silence. A boy in glasses grips his head with both hands, eyes wide, sweating."
  - src: /images/blog/ocx-africa-day-2/haikyuu/02.webp
    alt: "Same face, same panic. He whispers: \"This is reality.\""
  - src: /images/blog/ocx-africa-day-2/haikyuu/03.webp
    alt: "Still gripping his head: \"I need to accept it and think rationally.\""
  - src: /images/blog/ocx-africa-day-2/haikyuu/04.webp
    alt: "Later, slumped over his desk, one hand on his forehead, lying to himself: \"It'll be okay.\""
---
::

When the next one finally came, I picked the right answer, then panicked, doubted myself, and switched to the wrong one. My village people were clearly at work 😭 (Nigerian for the unseen forces that show up exactly when you're winning.)

I kept going, hoping to hang on to a spot in the top 8. On question 19, the power went out, and all I could think was: please, let it end here 😂 I was red, stressed, cold and hot at the same time. (And the prize I really wanted was a headset. I don't have one, and I like listening to music on my own, at the gym or when I don't want to use speakers 😖)

The results came out: 8th 🫠 My friends still laugh about it.

There were two prizes to pick from, an OCX bag or a book. I wanted to see what was in the bag, but I was standing in front of the stage, so I went with what everyone shouted for. I left with [*The Cathedral and the Bazaar*](http://www.catb.org/~esr/writings/cathedral-bazaar/) by Eric S. Raymond. I still don't know what was in the bag 😔

### Lunch & community networking

I met more people that day. My friend and our class rep from school were at a game event nearby, so I slipped out to catch up with them. It's been a month since I left school, and I've missed them.

Back at the venue, I met [Olabode Lawal-Shittabey](https://github.com/babblebey), a maintainer of [semantic-release](https://github.com/semantic-release/semantic-release). We talked about OIDC and how we could use it in [Chakra UI](https://chakra-ui.com/). He'd been following our work there and liked the approach we take, and he said we should do more livestreams and give more talks. (I'd just put up my [talks page](/talks), and a [speaker page](/giving-talks) if you want me at your event, so I took that personally 😇)

We took more pictures, though not nearly enough. I really need to take more pictures, but I was shy, man 😂

### Workshop: Real-time in your hands: Getting started with Eclipse ThreadX on the MXChip AZ3166

Every hardware project I did in school ran into the same wall, and this one was no different: the board has a micro-USB port, my MacBook only has USB-C, and I hadn't brought an adapter. I had the power in my hands and nowhere to plug it in.

Moses came to the rescue and lent me his cable 🙌 I'm really grateful, because that's the only reason I got to take part.

[Frédéric Desbiens](https://www.linkedin.com/in/fredericdesbiens) led this one. The MXChip AZ3166 is a little circuit board about the size of a bank card, with a tiny screen, two buttons, a few lights, and sensors that can feel heat, humidity, air pressure and movement. It runs [Eclipse ThreadX](https://threadx.io/), a tiny operating system made for small devices like this. You write code on your laptop, turn it into something the board understands, and copy it over, and the workshop gave us [sample projects](https://github.com/eclipse-threadx/samplex/tree/main/MXChip/AZ3166) to start from.

While I was still cable-less, I got my laptop ready, so the moment the board was plugged in, I could put code on it. Then I went off script and built a badge. The problems this time were small and funny, like my own name not fitting on the screen 😂 Yes, really. Here's how:

::collapse{title="Why my own name didn't fit on the screen (and the other small fail) 😅"}
- **Garbled serial output.** The board's logs came back as noise. macOS resets the serial port's speed when the port closes, so I was reading at the wrong baud rate.
- **My own name didn't fit.** The screen is 128 pixels wide and only two fonts are built in. The bigger one fits 11 characters, and "Hi, I'm Lope" is 12, so the "e" got chopped off. "Wait for green" on the reaction screen had the same problem.
::

By the end, the badge had nine screens. Button A flips between them, and button B does something different on each one:

- **Badge.** "OCX AFRICA" across the top and "Hi, I'm Lope" underneath, because a badge should say who you are. B makes the light flash like a party.
- **Climate.** Live temperature, humidity and air pressure from the board's sensors. It read 32.3 °C in the hall, which tells you everything about Lagos in October.
- **E hot o!** It works out how hot it actually feels, the way weather apps do, then gives its verdict in Pidgin, from "E dey warm small" up to "Lagos heat no joke" and "Who off the AC?!". The LED turns from blue to red as it gets hotter. Breathe on the board and the humidity jumps by more than ten points in a second or two, so it catches you: "Who dey breathe?!" (It reads a few degrees high, because the chip warms the sensor next to it.)
- **Spirit level.** A bubble that slides as you tilt the board, like a carpenter's level. Lay it flat and it says FLAT.
- **Seismograph.** A wave of vibration scrolling across the screen. Tap the table, stomp, or drop a pen near it, and the wave spikes and the LED flashes red. It remembers the strongest shake until you press B.
- **Step counter.** Put it in your pocket and walk. It counts your steps and works out how far you went. B resets it.
- **Floor counter.** The air gets a tiny bit thinner with every floor you climb, and the board can feel it. Press B on the ground floor, take the stairs, and it counts the floors.
- **Danfo Dash.** A Lagos traffic game. You're the danfo at the bottom of the road, and you tilt the board like a steering wheel to dodge okadas (thin and fast) and kekes (wide and slow). Every vehicle you get past is a point, and the traffic speeds up the longer you last. Crash and the screen shouts "OSHODI! You don jam!"
- **Reaction game.** Press B, wait for the LED to turn green, then press B again as fast as you can. Go too early and it tells you "Too soon!". It keeps your best time. Mine was 263 ms.

::clip{src="/videos/blog/ocx-africa-day-2/mxchip-badge.mp4" poster="/videos/blog/ocx-africa-day-2/mxchip-badge.poster.webp" alt="The MXChip badge in my hand, cycling through the spirit level, the reaction game, Danfo Dash and the E hot o! heat meter" width="640" height="640"}
::

All nine screens together use only a tiny slice of the board's memory, so there's plenty of room left. It took me back to [Elvon](/blog/hey-elvon), except this time nothing caught fire 😅

### Networking reception

The programme ended with a networking reception, which basically meant: have fun. So I did. Juicers was back, and I loved their drinks so much I wanted to try everything. I lost count of how many flavours I went through 😅

![Two Juicers drinks in my hand, a red one and a yellow one](/images/blog/ocx-africa-day-2/juicers.webp)

And before you ask: no, I didn't forget my food this time 😂 After [day one](/blog/ocx-africa-day-1), I packed it and carried it with me everywhere I went, from session to session. Lesson learned.

That was day two: a quiz app built in a morning, a question that never loaded, a danfo on a chip, a book picked by crowd vote, and my food safely home with me 🍱 I came to OCX looking for a break from work, and I left with new friends, a badge I wrote myself, and a lot to think about. That night I [posted my last OCX tweet](https://x.com/I_am_Lope/status/2116634971263627507)

See you at the next one, OCX 💙

::series-card{name="OCX Africa"}
::

*Event photos link to the Eclipse Foundation's [OCX Africa 2026 album](https://www.flickr.com/photos/108559379@N08/albums/72177720336439234/) on Flickr. The Kwizi screens, the badge video and the drinks are mine. The Haikyuu frames are from the anime.*
