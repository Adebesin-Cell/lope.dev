# Roadmap

A living list of where this site is headed — and a few things I'm holding myself to. Not a backlog with deadlines; just intent.

> **Want to contribute?** Awesome — a lot of this is pick-up-and-go. Each item below says *what* it is and *where* it lives. Open an issue or PR and have at it. See **[CONTRIBUTING.md](./CONTRIBUTING.md)** for setup, house style, and the reusable building blocks so a new section looks like it was always there.

## Shipping next

- [ ] **Fill the blog** — write real bodies for the two draft posts (Ekphrasis motivation, LLMs in engineering) and import the rest of the Medium pieces.
- [ ] **GitHub stars on project cards** — show repo stars / last-release like the releases page, so the work has weight.
- [ ] **Command palette (⌘K)** — quick jump to pages, projects, posts.

## AFK — the personal section

> "Away From Keyboard." Less site, more me. One hub page at **`/afk`**, built like `/projects`: a single page composed of themed sections. **Good first contribution territory** — most of Phase 1 is just data + existing components.

### How the page is wired (for contributors)

Build it like the Projects page so it inherits the site's behaviour for free:

- Reuse the **`ProjectGroup`-style** section shell: a big faint watermark heading + a small uppercase label, each section carrying `:id="slug"` and `:data-toc="Title"` so **`TocNav`** renders a table of contents automatically.
- Wrap the page article in **`slide-enter-content`** so sections cascade in.
- Section content lives in a data file (e.g. `shared/data/afk.ts`); the page (`app/pages/afk.vue`) maps over it.

To add the page end-to-end, touch:
- `app/pages/afk.vue` + a section component + `shared/data/afk.ts`
- `app/components/AppHeader.vue` (add `{ to: '/afk', label: 'AFK', icon: 'i-lucide-…' }` — it's shared with `MobileMenu`)
- `nuxt.config.ts` → `routeRules['/afk'] = { prerender: true }` and add `/afk` to `nitro.prerender.routes`
- `server/api/__sitemap__/urls.ts` → add `{ loc: '/afk' }`
- `uno.config.ts` → safelist any icon strings used in `afk.ts`

### Phase 1 — static (start here)

Pure data + existing components. No APIs.

- [ ] **On the Court** 🏀 — basketball fandom: team I support, favourite player, GOAT pick, my position. Render as label/value rows. *Done when:* renders from data, shows in the TocNav, reads well on mobile.
- [ ] **Athlete Journey** — vertical timeline of milestones (`year`, `title`, `note`). *Done when:* timeline renders chronologically with a connecting line and dots, accessible as an ordered list.
- [ ] **Things I Build** ⚙️ — hardware / computer-engineering builds (custom keyboard, home lab, ESP32/IoT), kept separate from software Projects. Card list with brand-tinted icons (safelist the icons!). *Done when:* cards render with icon + name + description, optional link.
- [ ] **The Grind** 🏋️ — gym: weekly split (chips), current PRs (bench/squat/deadlift), goals. *Done when:* split, PRs and goals all render from data.

### Phase 2 — visual

- [ ] **Through the Lens** 📷 — photo gallery. Reuse `ImageZoom.vue` for click-to-fullscreen. Needs an image-hosting decision.
- [ ] **From the Kitchen** 🍳 — dishes I cook, with photos.
- [ ] **Places** 🌍 — countries travelled; highlighted world-map SVG or a flag grid.

### Phase 3 — live data

- [ ] **On Repeat** 🎵 — Spotify top tracks / now-playing via the Spotify API. Needs OAuth, a server route, and token refresh (store the refresh token as an env var). Can ship static (favourite artists/albums) first, then go live.

### More AFK ideas (wanted, unscheduled)

- [ ] **Now page** (`/now`, nownownow.com style) — what I'm focused on this month.
- [ ] **Bookshelf** — books I own / recommend.
- [ ] **Currently reading** — what's on the nightstand now.
- [ ] **Anime** — watching / favourites.
- [ ] **Film** — favourites / recently watched.
- [ ] **Guestbook** — let visitors leave a mark. Higher effort: needs storage + a write API + spam protection (and probably webmentions support).

### Out of scope (decided against)

- **Uses / setup page** — it's just a MacBook right now, not worth a page.
- **Coding-stats strip** (GitHub contributions / WakaTime) — not wanted.

## Someday / maybe

- [ ] **Animated OG** — Takumi keyframe variant for contexts that actually play it (GitHub, direct links).
- [ ] **Real talks section.** I've given one now (SailsConf, *Rebuilding Panda's Engine*). Add a "Given" list above the wishlist, with the event, date, slides and recording.
- [ ] **Signature logo** — trace a real handwritten "at" to refine the tegaki mark.

## Done

- [x] Rebuild on Nuxt 4 (content-first, dark, antfu-style)
- [x] Releases feed — public merged PRs, prerendered + cached, URL-driven pagination, animated "Shipping" header, uniform avatars, batched star counts (GraphQL)
- [x] Self-hosted blog (canonical → Medium, comments on Medium)
- [x] Dynamic OG images (nuxt-og-image + Takumi)
- [x] Animated handwriting logo (tegaki)
- [x] Mobile menu drawer + scroll-to-top
- [x] PostHog analytics
- [x] RSS feed (`/feed.xml`)
- [x] Design-feedback pass — spacing, consistent type/underlines, ghost buttons, colourful brand icons
- [x] Light-mode pass — theme-aware tokens (RGB-channel vars), dot background, prose, contrast
- [x] Accessibility pass — skip link, focus rings, `aria-hidden`/`aria-current`, reduced-motion, `lang`
- [x] RTL-ready — logical properties throughout
- [x] Floating TocNav — contextual table of contents on long pages
- [x] antfu ports — ArtPlum animated background, slide-enter stagger, image-zoom lightbox, post metadata + share links, view-transition theme toggle

---

## Lock in (personal) — hehe

Less site, more me. The honest list:

- [x] **Give the talk.** First one done: *Rebuilding Panda's Engine* at SailsConf (Oct 2026).
- [ ] **Give the second one.** Submit two CFPs this quarter. React Conf is still the dream.

## Portfolio: ideas from corbincrutchley.com

What to borrow, not copy:

- [ ] **A framing line per section.** One sentence that says what you believe before the list. For example, open source: "A library is part of someone else's working day."
- [ ] **Work history with numbers.** Role, dates, one line of scope, then the outcomes in bold: 37× faster cold extraction, 1,000 files rechecked in 122 ms instead of 13.5 s, and so on. Collapse older roles.
- [ ] **Talks as proof, not wishes.** Given talks with event and recording first, the wishlist after.
- [ ] **One clear call to action.** "Get in touch" for talks, roles or consulting, in the nav and at the end of the home page.

## Staff-level frontend (personal)

Staff isn't more code. It's scope, judgment and other people getting better because you're there. These are things I can start now:

### Habits

- [ ] **Write decisions down.** One short design doc or RFC per real decision (BethelFlow or Panda): the problem, the options, what I picked and why. Link the public ones from the site.
- [ ] **Measure before and after.** Every perf or DX change gets a number, like the runtime post. Keep a running "impact log" to feed the work-history section.
  - *Predictable codebase*: a BethelFlow teammate picked up the conventions from the post and uses them in their own projects.
- [ ] **Own a cross-cutting area.** Pick one at BethelFlow (perf budget, accessibility or the design system) and be the person who sets the standard, reviews against it and reports on it.
- [ ] **Review more than I write.** Do thoughtful PR reviews on Panda, Ark and Zag every week, and help first-time contributors land their PR.
- [ ] **Teach in public.** Keep the Panda series going, give one talk a quarter, and mentor one engineer.
- [ ] **Say no well.** Write up the requests I turn down and why, the way the SailsConf talk did.

### Courses and reading

- [ ] **The Staff Engineer's Path** (Tanya Reilly, book). The best single guide to what the role actually is.
- [ ] **Staff Engineer** (Will Larson, book and staffeng.com). Stories from staff engineers about how they got there.
- [ ] **Web performance.** Frontend Masters' web performance courses, plus web.dev's Core Web Vitals guides.
- [ ] **Accessibility.** web.dev's free *Learn Accessibility*, then test BethelFlow with a real screen reader.
- [ ] **Motion and craft.** Emil Kowalski's *animations.dev* or Josh Comeau's *Whimsical Animations*. This is the design engineer half.
- [ ] **CSS depth.** Josh Comeau's *CSS for JavaScript Developers*, if any of the layout or cascade parts feel shaky.
