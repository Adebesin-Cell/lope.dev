---
title: Being Heard Isn't Just About Speaking — It's About Understanding
description: A guide to internationalization (i18n) in Next.js using next-intl to build multilingual, user-aware web experiences.
date: 2025-05-26
readingTime: 6min
canonical: https://iamlope.medium.com/being-heard-isnt-just-about-speaking-it-s-about-understanding-b700929c5743
---

### From human connection to multilingual UX — using Next.js and next-intl to build user-aware, language-ready web experiences.

![](https://cdn-images-1.medium.com/max/730/1*MlejWnprLa0VZpKGNdt9vg.png)

I've always loved to be heard — not just in the sense of speaking, but in a way that makes me feel understood. We all do. It's human nature. But more often than not, I've found myself in conversations where I wasn't truly listened to. I was acknowledged, but not understood.

There was a time when I kept explaining myself over and over, hoping the other person would get it. But they were listening through their own filter — hearing what they wanted, not what I was actually saying. And I realized something: Most of us communicate the way *we* want to be heard, instead of listening the way *someone else* wants to be understood.

But what if we chose to listen differently? What if, instead of assuming, we asked? What if we designed experiences that didn't just express what we wanted to say, but adapted to the way others understood best?

Just like in personal conversations, the way we design digital experiences determines whether users feel understood. Imagine visiting a website that doesn't support your language. You might understand bits and pieces, but the experience feels foreign, even alienating.

So, what does it really mean to listen? It's more than just acknowledging the presence of another — it's about making them feel at home, like they belong. In the digital world, listening means adapting to the user's needs, not expecting them to adapt to us.

Think about it: When you walk into a space where everything is unfamiliar — the language, the signs, the way things work — it takes extra effort just to navigate. You feel like an outsider. But when that same space acknowledges your language, your culture, and your way of thinking, suddenly, it feels welcoming. It feels like it was made for you.

That's why [internationalization (i18n)](https://www.techtarget.com/whatis/definition/internationalization-I18N) is so powerful. It's not just about translating words — it's about creating an experience that listens to the user, understands them, and speaks to them in a way that feels natural. And for Next.js developers, one of the best ways to achieve this is through [**next-intl**](https://next-intl.dev/docs/getting-started).

## How Do We Start Listening?

Just like in any conversation, there are different ways to listen. Sometimes, we listen through direct engagement — asking questions, responding in real time. Other times, we listen passively — observing patterns, understanding behavior, and adapting accordingly.

With **next-intl**, we have similar choices when it comes to internationalization. We can structure our applications in a way that prioritizes adaptability, ensuring users feel like the experience was crafted for them. In Next.js, this comes down to two key approaches:

### With i18n Routing → Letting the URL Speak

This approach integrates the language directly into the app's navigation. Just like entering a space where the signs immediately tell you, *"We speak your language,"* this method ensures users instantly see content in their preferred language.

- Uses a top-level [locale] segment for prefixed pathnames, such as /en/about or /es/contact.
- Supports domain-based routing, like en.example.com/about for region-specific experiences.
- Ideal for applications that need clear and structured multilingual navigation.

### Without i18n Routing → Listening to User Preferences

Not every conversation starts with words; sometimes, we listen by observing. This approach allows applications to detect and adapt to a user's language preference dynamically.

- Useful for apps that rely on user settings to determine language.
- Works well for single-language applications that may need flexibility in the future.
- Keeps URLs clean and language-independent, shifting the focus to user choice rather than URL structure.

Both methods have their place, just like different ways of listening in conversation. The key is to choose the one that best fits the needs of your users — because in the end, it's not just about what we build, but how we make people feel understood.

## Getting Started: Learning to Listen Through Code

Just like in any meaningful conversation, listening starts with intention. In the world of applications, that intention shows up when we choose to support multiple languages — when we decide that users from anywhere should feel like the experience was designed with them in mind.

With Next.js and next-intl, that journey begins simply:

```bash
npm install next-intl
```

But just like human conversations, how we listen matters just as much as what we hear. Next-intl gives us two ways to approach internationalization: one that makes language visible, and another that quietly adapts based on the user's preferences.

Let's begin with the first: **i18n Routing** — a way to let language speak through the URL itself.

## With i18n Routing: Making Language Part of the Experience

When users land on a page and immediately see content in their language — like /en/about or /es/contact—they know: *"This space speaks to me."*

This approach brings language into the very fabric of navigation, using a top-level [locale] segment in your Next.js routes. Setting it up is easier than it sounds.

### Step 1: Define Your Messages

Each language gets its own JSON file. Here's a simple example:

***messages/en.json:***

```json
{
  "HomePage": {
    "title": "Hello world!",
    "about": "Go to the about page"
  }
}
```

### Step 2: Configure Next.js for Locales

With next-intl, we wrap our config to enable locale-based routing.

***next.config.ts***

```ts
import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {};
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
```

### Step 3: Define Routing and Navigation Behavior

Tell your app what languages it understands, and what to fall back on if it doesn't.

***src/i18n/routing.ts***

```ts
import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // list of all locales that are supported
  locales: ['en', 'es', 'kr'],

  // Used when no locale matches, fallback to default
  defaultLocale: 'en'
});
```

***src/i18n/navigation.ts***

```ts
import {createNavigation} from 'next-intl/navigation';
import {routing} from './routing';

export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
```

### Step 4: Middleware That Adapts Like a Good Listener

Middleware lets your app greet users in their language from the very first request.

```ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);
export const config = {
 matcher: ["/((?!_next|api|ingest|.*\\..*).*)"],
};
```

### Step 5: Responding Based on Locale Context

Server components need to know what language they're speaking. That's where request.ts comes in.

***src/i18n/request.ts***

```ts
import type { Locale } from "@/messages/_schema";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
 // This typically corresponds to the `[locale]` segment
 let locale = await requestLocale;

 if (!locale || !routing.locales.includes(locale as Locale)) {
  locale = routing.defaultLocale;
 }

return {
  locale,
  messages: (await import(`../messages/${locale}.json`)).default,
 };
});
```

### Step 6: Set Up Your Locale Layout

Now we make sure every page honors the selected language.

```tsx
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  // Ensure that the incoming `locale` is valid
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
```

### Step 7: Let Your Users Feel Heard

In your components, bring the translations to life:

**Client Component**

```tsx
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';

export default function HomePage() {
  const t = useTranslations('HomePage');
  return (
    <div>
      <h1>{t('title')}</h1>
      <Link href="/about">{t('about')}</Link>
    </div>
  );
}
```

**Server Component**

```tsx
import {getTranslations} from 'next-intl/server';

export default async function HomePage() {
  const t = await getTranslations('HomePage');
  return <h1>{t('title')}</h1>;
}
```

## Not Every Conversation Starts With a Word

Sometimes, the most thoughtful form of listening is quiet observation. Instead of putting the language in the URL, we let the app detect the user's preferences and adapt silently. This is where **listening without i18n routing** shines — cleaner URLs, language chosen by the user, and a more fluid experience for apps where explicit routing isn't needed.

If that approach sounds more like the kind of experience you want to create, next-intl supports it beautifully. You can explore that approach here:
👉 [Listening Without i18n Routing →](https://next-intl.dev/docs/getting-started/app-router/without-i18n-routing)

## Speak Their Language, Feel Their World

In the end, being heard is about more than just the words we say — it's about how we make people feel. Whether it's through visible cues like URLs or quiet detection of preferences, the heart of internationalization is empathy. It's about designing with the listener in mind.

With next-intl and Next.js, you're not just building apps — you're creating spaces that speak to people, in their language, on their terms.

And that's the kind of conversation worth having.
