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
- [ ] **Real talks section** — replace the wishlist once I've actually given one.
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

- [ ] **Give the talk.** React Conf is the dream — but start with a meetup. Submit one CFP this quarter.
