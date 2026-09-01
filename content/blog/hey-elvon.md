---
title: Hey Elvon!
description: Five people, one random class assignment, and an autonomous trash collector we named Elvon. The wiring disasters, the two nights we lost to a speaker, the wire that burned two days before defense, and what the team had to say about it.
date: 2026-09-01
readingTime: 12min
---

### How a random group assignment became the best team I've worked with, and a robot that actually moves.

![Elvon, the autonomous trash collector, on the lab table with its bin, wheels and exposed wiring](/images/blog/hey-elvon/cover.png)

Hey Elvon!

I didn't like working on school group projects. Simply because projects were usually left to one person to take the full brunt of the work. But I think I had the great opportunity of working with this amazing team in building Elvon.

The team selection was done in class at random, and we got assigned a trash collector. Every other project had the variation of line follower only, or obstacle detection.

## Meet the team

Five of us. Babatunde Yetunde (our group leader), Ogundipe Victor (circuit specialist), Ajayi John (our media director), Alonge Emmanuel (build and packaging), and Adebesin Tolulope (software guy, that's me).

![The team around the workbench on day one, cameras out, nothing burnt yet](/images/blog/hey-elvon/team.png)

Before any robotics project, we need to simulate and make a visual prototype, which Victor helped create for us to build freely.

![The circuit prototype Victor built, Arduino Uno with the motor driver, PIR sensors, ultrasonic and DFPlayer laid out](/images/blog/hey-elvon/prototype.png)

## Day one was all vibes

For the first day, it was all vibes and chill. I remember it was so calm and everyone was so excited because it was going smoothly. We brought cameras, ready to take the occasion. And yeah, it did go smoothly.

And yeah, I tried to engage this time without being more passive. I was laughed at, obviously, so you don't know anything outside of working on your laptop (partly true). Because at the first point of touch, I didn't know what to do. I also have the fear of, well, electricity. We also tried to check if our glue gun was hot (yeah, I touched it and got a bit burnt, others claimed it wasn't hot). What are they feeding you guys?

<!-- GIF: me tentatively poking the glue gun / everyone laughing. Short, 2s loop. -->
![The glue gun test, and my very brave hand](/images/blog/hey-elvon/glue-gun.gif)

John took the major part of the camera work, he's a pro with cameras. Emmanuel and I started with the coupling, making sure we had the chassis ready and wheels for the more structural engineers to work here, Victor and Yetunde (their final year projects involved using Arduino, so they had more experience at it). And yeah, we got the very first setup. The motor connected and battery working as well. I [posted this](https://x.com/I_am_Lope/status/2090907430687309843) as we were packing up for the day.

<!-- GIF: first wheel spin. The "it moves" moment. -->
![First motor spin on the bare chassis](/images/blog/hey-elvon/first-spin.gif)

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

<!-- GIF or embed: the obstacle avoidance clip from X. -->
![Elvon backing off a wall and picking a new direction](/images/blog/hey-elvon/obstacle-avoidance.gif)

## Then everything started breaking

One would think, oh yes, we're so done, let's get it. But that's when errors started surfacing, when we started to merge our other components together.

First was the problem that our motor was going in the opposite direction, hence no motion could be produced. Recalling that we made a judgement that we should alternate the wires around the motor board.

That was the tip of the iceberg.

## The PIR sensors humbled us

Merging the PIR sensors led to more real facing work (sensors are hard challenges). First it wasn't detecting properly. We wanted to use two sensors (for maximum efficiency), but it bit us in the back. Our robot was overstimulated, it sensed everything, and hence stopped at every point in time.

Before we also realized that we had maxed the output on the PIR sensors, so it had too long a range and that affected how it worked. After we figured that out, though a lot of times we had to edit our code thinking the code wasn't detecting as expected, it was the signals we were receiving that were not properly formed.

We removed one PIR and then we moved forward.

![The PIR sensor with its two potentiometers, sensitivity and delay, both turned all the way up](/images/blog/hey-elvon/pir-sensor.png)

## Giving it a name, and a voice

Now, a working robot. Let's add more human touch. Yetunde led the vision for the product here. We had to coin out the name for the robot. We called it Elvon.

So we added 3 audios to make the robot more human. Three tracks on the SD card, three moments:

| Track | When it plays | What Elvon says |
| --- | --- | --- |
| `0001.mp3` | On boot, before it starts roaming | *"Hi, I'm Elvon, your autonomous trash collector, made by CPE Group 7."* |
| `0002.mp3` | A PIR sees a person | *"Hi, kindly drop your trash in the waste bin."* |
| `0003.mp3` | Bin-full sensor trips, robot parks | *"Please empty the trash."* |

<!-- TODO: YouTube URL of the demo, so people can hear all three live. -->
You can hear all three in the demo video: [Elvon, full run](https://youtube.com/watch?v=TODO).

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

<!-- GIF: the first time Elvon actually speaks. Faces in frame if possible. Best GIF in the post. -->
![The moment Elvon says its first line out loud](/images/blog/hey-elvon/first-voice.gif)

## Teardown, four days out

Now all was working, but we needed the robot to reverse and turn properly. That wasn't even working. We tuned the code, made more adjustments, fixed a lot.

4 days to our defense, we had to tear it all down again, from the ground, pick each piece and troubleshoot so it doesn't give any issue.

And yay, we got it running. Really running. And all that was left was packaging.

![Elvon fully disassembled on the table, every part laid out before the rebuild](/images/blog/hey-elvon/teardown.png)

Emmanuel was solid here. He helped to ensure the proper packing of the robot, the design build.

## The bin, and the wire that burned

We wanted to make it more sophisticated by adding a servo motor to power the waste bin, but we ran into a few troubles. One, the bin we got was too heavy for the small body of the robot, hence the robot couldn't move.

On the same day, two days to our defense, the robot wire got burned pretty bad. We were able to isolate the problem quickly (we could have lost our project to a burn), (hey! I don't like hardware). Random burn, and we were just running tests.

But we didn't let that make us panic. We took an old charger and removed its pieces to make it work.

![The burnt wire, and the old charger we harvested to replace it](/images/blog/hey-elvon/burnt-wire.png)

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

![The team after defense, Elvon in front, everyone still standing](/images/blog/hey-elvon/defense-day.png)

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

![Victor mid-wiring, multimeter in hand](/images/blog/hey-elvon/victor.png)

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

![John behind the camera, shooting the demo](/images/blog/hey-elvon/john.png)

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

![Yetunde with Elvon, the person who named it](/images/blog/hey-elvon/yetunde.png)

<!-- TODO: Yetunde's answers. Same seven questions. She led the product vision and named Elvon, so Q4 and Q6 are the ones to push on. -->

*Answers coming, she's the one who named Elvon and led the vision for what it should feel like, so I'm not publishing this section half-done.*

---

### Emmanuel, build and packaging

![Emmanuel packing the chassis, the part that made it look finished](/images/blog/hey-elvon/emmanuel.png)

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
