---
title: Hey Elvon!
description: Five people, one random class assignment, and an autonomous trash collector we named Elvon. The wiring disasters, the two nights we lost to a speaker, the wire that burned two days before defense, and what the team had to say about it.
date: 2026-09-01
readingTime: 12min
---

### How a random group assignment became the best team I've worked with, and a robot that actually moves.

![Elvon, the autonomous trash collector, on the lab table with its bin, wheels and exposed wiring](/images/blog/hey-elvon/cover.jpg){loading="eager" fetchpriority="high"}

Hey Elvon!

I didn't like working on school group projects. Simply because projects were usually left to one person to take the full brunt of the work. But I think I had the great opportunity of working with this amazing team in building Elvon.

The team selection was done in class at random, and we got assigned a trash collector. Every other project had the variation of line follower only, or obstacle detection.

## Meet the team

Five of us. Babatunde Yetunde (our group leader), Ogundipe Victor (circuit specialist), Ajayi John (our media director), Alonge Emmanuel (build and packaging), and Adebesin Tolulope (software guy, that's me).

![The team around the workbench, minus John, who was behind the camera](/images/blog/hey-elvon/team.jpg)

Before any robotics project, we need to simulate and make a visual prototype, which Victor helped create for us to build freely.

![The Arduino, motor driver and ultrasonic sensor wired up on the breadboard for obstacle detection](/images/blog/hey-elvon/prototype.jpg)

## Day one was all vibes

For the first day, it was all vibes and chill. I remember it was so calm and everyone was so excited because it was going smoothly. We brought cameras, ready to take the occasion. And yeah, it did go smoothly.

And yeah, I tried to engage this time without being more passive. I was laughed at, obviously, so you don't know anything outside of working on your laptop (partly true). Because at the first point of touch, I didn't know what to do. I also have the fear of, well, electricity. We also tried to check if our glue gun was hot (yeah, I touched it and got a bit burnt, others claimed it wasn't hot). What are they feeding you guys?

::clip{src="/videos/blog/hey-elvon/glue-gun.mp4" poster="/videos/blog/hey-elvon/glue-gun.poster.webp" alt='"Just a little tap." Easy for him to say.' width="640" height="640"}
::

John took the major part of the camera work, he's a pro with cameras. Emmanuel and I started with the coupling, making sure we had the chassis ready and wheels for the more structural engineers to work here, Victor and Yetunde (their final year projects involved using Arduino, so they had more experience at it). And yeah, we got the very first setup. The motor connected and battery working as well. I [posted this](https://x.com/I_am_Lope/status/2090907430687309843) as we were packing up for the day.

![The bare chassis on its wheels, motors wired, nothing else on it yet](/images/blog/hey-elvon/chassis.jpg)

## The code

We also wrote out the code for the robot.

```cpp
// ==================== TIMINGS ====================
const unsigned long TURN_90_MS    = 500;   // calibration knob: bump up if it under-rotates (< ~90 deg)
const unsigned long REVERSE_MS    = 600;
const unsigned long PIR_WARMUP_MS = 30000;

// ==================== ROBOT STATES ====================
enum RobotState {
  PATROL,
  PIR_WAIT,
  OBSTACLE_AVOID
};

RobotState currentState = PATROL;
```

Three states. That's the whole brain. Patrol until something is in the way, wait when a human shows up, avoid when the ultrasonic says there's a wall. No map, no path planning (more on why later).

And the ultrasonic read, which is about as simple as it gets:

```cpp
int readDistanceCm() {
  digitalWrite(TRIG, LOW);
  delayMicroseconds(2);

  digitalWrite(TRIG, HIGH);
  delayMicroseconds(10);

  digitalWrite(TRIG, LOW);

  unsigned long duration = pulseIn(ECHO, HIGH, 25000);

  if (duration == 0) {
    return 999;   // nothing came back, treat as clear
  }

  return (int)(duration / 58UL);
}
```

I think progressing from there was fully robotics. We worked on the obstacle avoidance, which I [shared on my X page](https://x.com/I_am_Lope/status/2091286868742566077).

::clip{src="/videos/blog/hey-elvon/obstacle-avoidance.mp4" poster="/videos/blog/hey-elvon/obstacle-avoidance.poster.webp" alt="Elvon backing off a wall and picking a new direction" width="1280" height="720"}
::

## Then everything started breaking

One would think, oh yes, we're so done, let's get it. But that's when errors started surfacing, when we started to merge our other components together.

First was the problem that our motor was going in the opposite direction, hence no motion could be produced. Recalling that we made a judgement that we should alternate the wires around the motor board.

That was the tip of the iceberg.

## The PIR sensors humbled us

Merging the PIR sensors led to more real facing work (sensors are hard challenges). First it wasn't detecting properly. We wanted to use two sensors (for maximum efficiency), but it bit us in the back. Our robot was overstimulated, it sensed everything, and hence stopped at every point in time.

Before we also realized that we had maxed the output on the PIR sensors, so it had too long a range and that affected how it worked. After we figured that out, though a lot of times we had to edit our code thinking the code wasn't detecting as expected, it was the signals we were receiving that were not properly formed.

We removed one PIR and then we moved forward.

![The PIR sensor with its two potentiometers, sensitivity and delay, both turned all the way up](/images/blog/hey-elvon/pir-sensor.jpg)

## Giving it a name, and a voice

Now, a working robot. Let's add more human touch. Yetunde led the vision for the product here. We had to coin out the name for the robot. We called it Elvon.

So we added 3 audios to make the robot more human. Three tracks on the SD card, three moments:

| Track | When it plays | What Elvon says |
| --- | --- | --- |
| `0001.mp3` | On boot, before it starts roaming | *"Hi, I'm Elvon, your autonomous trash collector, made by CPE Group 7."* |
| `0002.mp3` | A PIR sees a person | *"Hi, kindly drop your trash in the waste bin."* |
| `0003.mp3` | Bin-full sensor trips, robot parks | *"Please empty the trash."* |

You can hear all three in the demo video: [Elvon, full run](https://1drv.ms/v/c/0b40b905323055ca/IQDLE1FB-RF9TpgcVQfxtQ6jAZ7Tr8_ad21ayhlklzirNjE?e=dRcxQE).

Now the robot would introduce itself after a warm boot, and then move (without a map, this is most efficient for motor robots). If it senses it's expected to work, it says the line out loud and holds still long enough for you to actually drop something.

And here's the part I'm still not over. The first version of that voice was **me**. I recorded all three lines myself, and we actually shipped it, because the team said I sounded robotic. 😔 That was the compliment.

We only swapped it for a synthesised one because that one was louder, and in a room full of people you need the volume more than you need the authenticity.

But nah. Nothing made a sound.

## Two nights fighting a speaker

We thought okay, maybe the code. We went to the code and adjusted, and we did find out that the signals were probably polluting the way the speaker is meant to act, and the servo signal, because there was no edge case handled in the code. But the speaker still didn't work.

We had to wait till 9pm for 2 days trying to fight the speaker to work. We tried different techniques, using a resistor to bring the voltage down for it to maybe work for the DF module. We also tried to use maybe a 3.3V from the breadboard.

Oh, I forgot to mention that our board has a different design, hence the other side of the board wasn't even getting necessary voltage. We had to pass voltage from the battery across, and that helped, but the speaker didn't work.

We were almost giving up and switching to an LED, but we argued that's not efficient design. It's very easy to miss an LED, or even a screen, as not everyone would be watching a screen to see "drop trash."

We tried troubleshooting and we got a lot of static. What could be wrong?

Eventually we figured it out. We connected one of the output pins of the DFPlayer to a common ground with the Arduino.

(It's the DFPlayer, though. Nothing was wrong with the speaker. Two nights. A ground wire.)

Here it is, [the moment Elvon says its first line out loud](https://testfutaedu-my.sharepoint.com/:v:/g/personal/ogundipevocpe2020_futa_edu_ng/IQCY9FMv5TFMTqkmJd5GG_yOAccUtvn-4Avei3hgZUlujEs?e=hyawX2).

## Teardown, four days out

Now all was working, but we needed the robot to reverse and turn properly. That wasn't even working. We tuned the code, made more adjustments, fixed a lot.

4 days to our defense, we had to tear it all down again, from the ground, pick each piece and troubleshoot so it doesn't give any issue.

And yay, we got it running. Really running. And all that was left was packaging.

![Elvon fully disassembled on the table, every part laid out before the rebuild](/images/blog/hey-elvon/teardown.jpg)

Emmanuel was solid here. He helped to ensure the proper packing of the robot, the design build.

## The bin, and the wire that burned

We wanted to make it more sophisticated by adding a servo motor to power the waste bin, but we ran into a few troubles. One, the bin we got was too heavy for the small body of the robot, hence the robot couldn't move.

On the same day, two days to our defense, the robot wire got burned pretty bad. We were able to isolate the problem quickly (we could have lost our project to a burn), (hey! I don't like hardware). Random burn, and we were just running tests.

But we didn't let that make us panic. We took an old charger and removed its pieces to make it work.

![Sparks off a shorting wire](/images/blog/hey-elvon/burnt-wire.gif)

*(Oh no, another one, a few days before defense.)*

## What we learned about power

And yes it did work. We resumed packing and were able to establish a few principles.

It takes a lot of power to run the small build, which affects the way the robot turns around. We advise using 4 batteries, but you have to use a buck converter here so you don't burn your Arduino.

The power drains battery, hence it wouldn't do for a long stretch of work. TTF would probably be high. But it's rechargeable, so it's easy to work with in short bursts and you can get it powered quickly.

## Defense day

The day of defense, our charger module stopped working 😭. Why must this happen?

Somehow everyone was unfazed. I mean, we spent so many late nights here, tired, hungry. We made our video for the whole project from start to finish and hoped we didn't have to do a long demo that would require us turning.

And yeah! We defended it. Funny, we were ready to answer questions but our demo and video were impressive enough that we didn't even have to go through any questioning. Our lecturer was very impressed. The design, the implementation. And amazing thought to every component.

One simple piece of engineering here is: simple design, but make it work. Don't overcomplicate it.

And yes, the robot is working. And the team really is the best I've worked with so far, responsive and very active group.

![The five of us, one shot each, stitched into a single grid](/images/blog/hey-elvon/team-grid.jpg)

## Let's hear from the team

I couldn't write this and only give you my side of it. I sat each of them down and asked the same seven questions. Same questions, wildly different answers, which is the part I love.

Here's what I asked everyone:

1. What was the exact moment during the build when you realized your part of the system was actually going to hold together?
2. What was the worst late-night hardware or wiring disaster you had to debug when everyone else was half asleep?
3. If you could erase one component or bug from your memory forever, what would it be?
4. Looking back at the whole thing, what piece of the project are you secretly most proud that you pulled off?
5. If given another robotics project, would you love to participate?
6. What was the teamwork like for you?
7. Word of advice for other people that want to build theirs.

---

### Victor, circuit specialist

[Victor on X](https://x.com/Victobiloba)

![Victor, our circuit specialist](/images/blog/hey-elvon/victor.jpg)

**The moment it held together.**
There was a time everything stopped working, all the sensors. The moment we disconnected them and started all over again and they started working one after the other.

**The worst late night.**
The night Yetunde had us wait till the speaker worked and it didn't 😭

*(I want it on record that we did eventually beat the speaker. It just took a second night.)*

**One thing to erase from memory.**
It would be the PIR sensor oo. Tweaking the potentiometer on it to adjust the sensitivity isn't easy, you can't really tell the effect.

**Most proud of.**
I didn't do it alone, we all did, because the code, the hardware connection and all. But basically I'll say the operation of the entire robot.

**Would you do another one?**
Yes, if there's no strict deadline haha.

**The teamwork.**
The teamwork was perfect, we had the ideal team.

**Advice.**
Make sure you have a good team where everyone is willing to pour in their contributions.

---

### John, media director

![John, our media director](/images/blog/hey-elvon/john.jpg)

**The moment it held together.**
For me, that moment came when we finally powered the system and saw the different parts responding the way we had designed them to. Seeing the sensors communicate with the controller and the motors respond to the commands made everything feel real.

At that point, it wasn't just wires, components, and code anymore. It was becoming an actual robot. That was when I knew, "Okay, this thing is really going to work."

**The worst late night.**
One of the most frustrating moments was when the system suddenly refused to behave as expected, even though we were convinced the connections were correct.

We had to go through the wiring, power supply, sensors, motor connections, and code one after another. The funny part was that everyone was already tired, so every small problem felt ten times bigger.

Eventually, we discovered that the problem was related to a connection we had overlooked. Fixing it and seeing the system respond again was honestly one of the most satisfying moments of the entire build.

*(Every single one of our bugs was a connection we had overlooked. Every one.)*

**One thing to erase from memory.**
There were moments when one loose or misplaced connection could make us question everything we had done. You could spend a long time checking the code, only to eventually discover that the real problem was a simple hardware connection.

Robotics really teaches you not to assume that the problem is where you first think it is.

**Most proud of.**
I'm most proud of the fact that we were able to bring the different sections of the project together into one functioning system.

It wasn't just about making a motor move or getting a sensor to produce a reading. The real achievement was integrating the hardware, programming, sensing, movement, and collection mechanism so that they could work together toward one goal.

**Would you do another one?**
The project was challenging, but it was also a great learning experience. Robotics gives you the opportunity to combine programming, electronics, mechanical design, and problem-solving.

**The teamwork.**
Everyone had different strengths, and there were times when we didn't immediately agree on the best way to approach a problem. But that's also part of working as a team. We had to communicate, listen to different ideas, divide responsibilities, and help each other when something wasn't working.

**Advice.**
The mistakes, debugging, late nights, and small victories are all part of what makes building a robot worthwhile.

At the end of the day, the biggest achievement isn't just having a working autonomous trash collector. It's knowing that you and your team took an idea, struggled through the challenges, learned along the way, and eventually turned that idea into something that could actually move and perform a task.

---

### Yetunde, group leader

![Yetunde, who named Elvon and led the vision](/images/blog/hey-elvon/yetunde.jpg)

**The moment it held together.**
From the beginning. I came to work on the project with a positive mindset. And yeah, God was with us from the start 💪. I believed everything was going to work perfectly from the start.

**The worst late night.**
The sensor fusion for the ultrasonic sensor and PIR sensor, along with the operation logic of the robot. It didn't go smoothly at first. I didn't troubleshoot it alone though.

**One thing to erase from memory.**
None. Every bug and error and every troubleshooting was an important step in achieving the final result. I won't erase them from my memory. I will use them as experience for later.

**Most proud of.**
The human interaction part of the work. The DFPlayer module was not working at all, but I didn't want to give up on it. After much troubleshooting, it started responding.

**Would you do another one?**
Yeah, I think it would be nice.

**The teamwork.**
Great, very great. I worked with teammates who were active, tenacious and smart.

**Advice.**
When you get stuck, rest a while, come back, check again, troubleshoot again, till it all works well.

---

### Emmanuel, build and packaging

![Emmanuel, who built and packaged the chassis](/images/blog/hey-elvon/emmanuel.jpg)

**The moment it held together.**
It was the exact moment we dropped the chassis on the floor with all the components inside, and nothing broke or fell out. When we turned on the power and the motor wheels actually moved, moving the whole weight smoothly without the wheels shaking or bending.

*(He says "dropped" like it was a planned test. It was not a planned test.)*

**The worst late night.**
That had to be around 9:00 PM when the ultrasonic sensor suddenly stopped detecting obstacles and the robot was just crashing straight into the wall.

**One thing to erase from memory.**
Definitely, trying to get the speaker to work. It was really stressful troubleshooting that. At first we thought we got the wrong model of the DFPlayer.

**Most proud of.**
I'm secretly most proud of how the PIR sensor and the ultrasonic sensor smoothly work together, because part of the bug we faced is getting the PIR to differentiate an obstacle, which is handled by ultrasonic, from an actual human motion.

*(This is the one nobody outside the team would notice, and it's the hardest thing in the build. A wall and a person look the same to a PIR.)*

**Would you do another one?**
Yeah, I would love to do it again.

**The teamwork.**
It was a great experience, honestly. We had to heavily rely on each other. While I was focused on the chassis and the obstacle avoidance, others were handling the PIR motion sensor and the speaker audio. Communication was key, because if one person's code or wiring messed up, the whole robot would just park. We pushed each other through the frustrating moments.

**Advice.**
My advice is simple: triple-check your power supply and use quality jumper wires. Most importantly, start small. Build the chassis and get the wheels moving first before you start adding all the fancy sensors.

---

## Where it landed

Five people, one Arduino Uno, two PIR sensors (one of which we fired), an ultrasonic, a DFPlayer that only needed a ground wire, and a robot with a name.

If you're building yours: keep the design simple, keep the wiring accessible, and when the code looks wrong, check the ground first. 😅

And get the team right. That part isn't in the datasheet.

## Build your own

Everything above is what happened. If you want to build one, here's the same thing as an order of operations, with our mistakes taken out.

::guide{title="Build your own Elvon" cta="Open the build guide" time="9 steps" team="a few evenings"}
  :::step{title="Get the chassis rolling first" parts="4WD acrylic chassis, TT gear motors, L298N motor driver, Arduino Uno, battery pack" gotcha="If a wheel spins backwards, don't debug the code. Swap the two wires on that motor's terminal block."}
  Nothing else matters until the thing moves. Mount the motors, wire the driver, and write the smallest sketch that drives all four wheels forward for two seconds.

  Do this before the deck goes on and before a single sensor is attached. Every hour you spend on sensors while the motors are unproven is an hour you'll spend twice.
  :::

  :::step{title="Calibrate the turns by hand" gotcha="These are wall-clock guesses, not geometry. Your floor, your battery level and your tyres all change them."}
  There's no encoder here, so a turn is just "drive the wheels in opposite directions for N milliseconds." That number is a knob you tune by watching it:

  ```cpp
  const unsigned long TURN_90_MS = 500;   // bump up if it under-rotates
  const unsigned long REVERSE_MS = 600;
  ```

  Put a piece of tape on the floor, run the turn ten times, and adjust until it lands square. Do it on a fresh battery, then again on a low one, and pick something that survives both.
  :::

  :::step{title="Add the ultrasonic and get obstacle avoidance working" parts="HC-SR04 ultrasonic sensor" gotcha="Reverse before you turn. Turning against a wall you're already touching just grinds."}
  One sensor, one job: how far is the thing in front of me. When it reads under your threshold, stop, reverse for `REVERSE_MS`, turn, and carry on.

  This is the point where it starts looking like a robot rather than a car.

  ::clip{src="/videos/blog/hey-elvon/obstacle-avoidance.mp4" poster="/videos/blog/hey-elvon/obstacle-avoidance.poster.webp" alt="Elvon backing off a wall and picking a new direction" width="1280" height="720"}
  ::
  :::

  :::step{title="Add exactly one PIR, and turn it down" parts="HC-SR501 PIR sensor" gotcha="Both potentiometers maxed is the mistake we made. Full sensitivity plus full delay means it triggers on everything and then refuses to let go."}
  We started with two PIRs for coverage and the robot became useless, stopping every few seconds because something, somewhere, was warm and moving. We pulled one out and it got better immediately.

  Then turn the sensitivity down. The two little pots on the board are range and hold time, and the sane starting position is nowhere near maximum.

  Budget 30 seconds of warm-up before you trust a single reading:

  ```cpp
  const unsigned long PIR_WARMUP_MS = 30000;
  ```

  A PIR that just powered on lies to you.
  :::

  :::step{title="Give the motion a state machine" gotcha="Without explicit states, the speaker and the servo fight the drive loop and you'll blame the sensors."}
  Three states covered everything Elvon needed to do:

  ```cpp
  enum RobotState {
    PATROL,
    PIR_WAIT,
    OBSTACLE_AVOID
  };
  ```

  Patrol until something interesting happens, wait when a person appears, back off when a wall appears. Write it this way from the start. Retrofitting states onto a pile of `if` statements is how we lost an evening.
  :::

  :::step{title="Wire the voice last" parts="DFPlayer Mini, microSD card, small speaker" gotcha="Tie the DFPlayer's ground to the Arduino's ground. If you get static or silence, this is the problem. It cost us two nights and it was one wire."}
  Name your tracks `0001.mp3`, `0002.mp3`, `0003.mp3` on the card and trigger them by index. Ours were a greeting on boot, a prompt when the PIR saw someone, and a complaint when the bin filled up.

  Test the module on its own, on the bench, before it goes anywhere near the robot. And if you record the voice yourself, know that the synthesised one is louder, and in a room full of people volume beats authenticity.
  :::

  :::step{title="Sort out power before you add anything heavy" parts="4x battery, buck converter" gotcha="Feed 4 batteries straight to the Arduino and you'll burn it. The buck converter isn't optional."}
  Turning draws more than driving straight, and a sagging pack shows up as a robot that suddenly can't complete a rotation. We landed on four batteries through a buck converter.

  Expect short runtimes. It's rechargeable, so it's fine for demos, but it won't patrol a corridor all afternoon.
  :::

  :::step{title="Mount the bin, and weigh it first" gotcha="The first bin we bought was too heavy for the chassis. Fully assembled, the robot simply refused to move."}
  Hold the empty bin in one hand and the chassis in the other. If the bin feels comparable, it's too heavy.

  We wanted a servo to tip it and gave that up. The bin that works is a light one, fixed in place, sitting over the drive platform rather than behind it.
  :::

  :::step{title="Tear it down once before you demo it" gotcha="Do this four days out, not the night before. Ours turned up a wire that had already burned."}
  Take the whole thing apart, check every joint, and rebuild it. It feels like a waste of an evening and it is the reason nothing failed in front of our lecturer.

  Have a spare of whatever charges it. Our charger module died on defense day.
  :::
::
