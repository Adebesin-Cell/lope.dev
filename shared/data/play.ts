export interface PlayItem {
  slug: string
  title: string
  blurb: string
  tags: string[]
  href: string
  poster: string
  video: string
}

export const play: PlayItem[] = [
  {
    slug: 'through-the-eras',
    title: 'Through the Eras',
    blurb: 'A hand-built scroll journey through The Weeknd\'s eras, 2011–2025 — darkness bleaching into dawn.',
    tags: ['GSAP', 'Nuxt', 'Scroll'],
    href: 'https://through-the-eras.vercel.app',
    poster: '/play/through-the-eras.jpg',
    video: '/play/through-the-eras.webm',
  },
  {
    slug: 'recall',
    title: 'Recall',
    blurb: 'A small arcade of brain games where the URL is the database.',
    tags: ['Game', 'Nuxt', 'Arcade'],
    href: 'https://recall-nu-fawn.vercel.app',
    poster: '/play/recall.jpg',
    video: '/play/recall.webm',
  },
  {
    slug: 'cadence',
    title: 'Cadence',
    blurb: 'An animated experiment in motion and rhythm.',
    tags: ['GSAP', 'Vue'],
    href: '',
    poster: '/play/cadence.jpg',
    video: '/play/cadence.webm',
  },
  {
    slug: 'strangers-again',
    title: 'Strangers Again',
    blurb: 'An Astro + GSAP animated scroll piece.',
    tags: ['GSAP', 'Astro', 'Scroll'],
    href: 'https://strangers-again.webflow.io/',
    poster: '/play/strangers-again.jpg',
    video: '/play/strangers-again.webm',
  },
  {
    slug: 'last-faithful-admin',
    title: 'Last Faithful Admin',
    blurb: 'A whack-a-mole game about being the one person holding a whole church together.',
    tags: ['Game', 'Astro'],
    href: 'https://last-faithful-admin.netlify.app/',
    poster: '/play/last-faithful-admin.jpg',
    video: '/play/last-faithful-admin.webm',
  },
  {
    slug: 'flow-landing',
    title: 'Flow Landing',
    blurb: 'An animated landing experiment.',
    tags: ['CSS', 'Motion'],
    href: 'https://flowreef.webflow.io/',
    poster: '/play/flow-landing.jpg',
    video: '/play/flow-landing.webm',
  },
]
