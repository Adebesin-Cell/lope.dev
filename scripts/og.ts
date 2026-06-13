// Generates OG images with Takumi:
//   - public/og.png            → the site-wide default card
//   - public/og/<slug>.png     → one card per blog post (title as the hero)
//
// Committed as static assets (bulletproof on Vercel — no runtime native deps,
// and social unfurls show a static frame anyway). Also re-run automatically at
// build via a nuxt `build:before` hook, so adding a post regenerates its card.
//
// Run manually: bun run scripts/og.ts
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Renderer } from '@takumi-rs/core'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

type Style = Record<string, unknown>
const box = (style: Style, children: unknown[] = []) => ({ type: 'container', style, children })
const txt = (text: string, style: Style) => ({ type: 'text', text, style })
const img = (src: string, style: Style) => ({ type: 'image', src, style })

const BG = '#0a0a0a'
const INK = '#fafafa'
const MUTED = '#a1a1aa'
const FAINT = '#71717a'
const GLOW = 'radial-gradient(900px circle at 12% 0%, rgba(255,255,255,0.07), transparent 55%)'

const chip = (label: string) =>
  box({ paddingTop: 10, paddingBottom: 10, paddingLeft: 22, paddingRight: 22, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.05)' }, [
    txt(label, { fontSize: 26, color: '#d4d4d8' }),
  ])

// The brand mark: the avatar photo (colourful) when available, else the "at" wordmark.
const mark = (avatar: string | null) =>
  avatar
    ? img(avatar, { width: 76, height: 76, borderRadius: 999 })
    : txt('at', { fontSize: 46, fontWeight: 700 })

function frame(children: unknown[]) {
  return box(
    {
      width: 1200,
      height: 630,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 90,
      backgroundColor: BG,
      color: INK,
      fontFamily: 'Geist',
      backgroundImage: GLOW,
    },
    children,
  )
}

const topBar = (right: string, avatar: string | null) =>
  box({ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, [
    mark(avatar),
    txt(right, { fontSize: 26, color: FAINT, fontFamily: 'Geist Mono' }),
  ])

function siteCard(avatar: string | null) {
  return frame([
    topBar('lope.adebesin.com', avatar),
    box({ display: 'flex', flexDirection: 'column', gap: 20 }, [
      txt('Adebesin Tolulope', { fontSize: 86, fontWeight: 700, letterSpacing: -2, lineHeight: 1.0 }),
      txt('Software engineer · open-source contributor', { fontSize: 36, color: MUTED }),
    ]),
    box({ display: 'flex', gap: 16 }, ['Chakra UI', 'Panda', 'Zag', 'Ark UI', 'IQ.AI', 'npmx'].map(chip)),
  ])
}

function postCard(title: string, avatar: string | null) {
  return frame([
    topBar('lope.adebesin.com/blog', avatar),
    box({ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 1020 }, [
      txt(title, { fontSize: title.length > 48 ? 58 : 70, fontWeight: 700, letterSpacing: -1.5, lineHeight: 1.12 }),
    ]),
    box({ display: 'flex', alignItems: 'center', gap: 16 }, [
      txt('Adebesin Tolulope', { fontSize: 30, color: INK, fontWeight: 500 }),
      txt('·', { fontSize: 30, color: FAINT }),
      txt('Blog', { fontSize: 30, color: MUTED }),
    ]),
  ])
}

function frontmatterTitle(md: string): string | null {
  const fm = md.match(/^---\n([\s\S]*?)\n---/)
  if (!fm)
    return null
  const m = fm[1].match(/^title:\s*(.+)$/m)
  return m ? m[1].trim().replace(/^["']|["']$/g, '') : null
}

async function loadAvatar(): Promise<string | null> {
  try {
    const res = await fetch('https://github.com/Adebesin-Cell.png?size=160')
    if (!res.ok)
      return null
    const buf = Buffer.from(await res.arrayBuffer())
    const type = res.headers.get('content-type') || 'image/png'
    return `data:${type};base64,${buf.toString('base64')}`
  }
  catch {
    return null
  }
}

export async function generateOgImages() {
  const renderer = new Renderer()
  const opts = { width: 1200, height: 630, format: 'png' } as const
  const avatar = await loadAvatar()

  // Default site card
  writeFileSync(join(ROOT, 'public/og.png'), Buffer.from(await renderer.render(siteCard(avatar) as never, opts)))

  // Per blog post (skip drafts)
  const blogDir = join(ROOT, 'content/blog')
  const outDir = join(ROOT, 'public/og')
  mkdirSync(outDir, { recursive: true })
  let count = 0
  for (const file of readdirSync(blogDir).filter(f => f.endsWith('.md'))) {
    const md = readFileSync(join(blogDir, file), 'utf-8')
    const fm = md.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? ''
    if (/^draft:\s*true/m.test(fm))
      continue
    const title = frontmatterTitle(md)
    if (!title)
      continue
    const slug = file.replace(/\.md$/, '')
    writeFileSync(join(outDir, `${slug}.png`), Buffer.from(await renderer.render(postCard(title, avatar) as never, opts)))
    count++
  }
  return { posts: count, avatar: Boolean(avatar) }
}

// CLI
if (import.meta.url === `file://${process.argv[1]}`) {
  generateOgImages().then(r => console.log(`OG images generated — site + ${r.posts} posts (avatar: ${r.avatar})`))
}
