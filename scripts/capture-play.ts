/**
 * Records a hover-preview clip + poster for each live /play card.
 *
 *   bunx playwright install chromium   # one-time
 *   bun scripts/capture-play.ts        # records into public/play/
 *   bun scripts/capture-play.ts recall # only the given slug(s)
 *
 * Cards with an empty href are skipped. A hung site can't stall the run:
 * each capture is force-killed after SITE_TIMEOUT_MS. The poster is taken
 * AFTER `settle` ms (past any preloader/intro) and the clip is trimmed by the
 * same amount so it starts on the hero, not the loader.
 */
import { execFileSync } from 'node:child_process'
import { mkdir, readdir, rename, rm } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'
import { play } from '../shared/data/play'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public/play')
const tmpDir = join(outDir, '.rec')
const VIEWPORT = { width: 1280, height: 720 }
const CLIP_MS = 6000
const SITE_TIMEOUT_MS = 90_000

// Per-site tuning. `settle` = ms to wait for the preloader/intro before the
// poster shot and clip start. `scroll` = drift down the page (landing/scroll
// pieces) vs. hold still (games/menus).
const DEFAULT = { settle: 3500, scroll: true }
const CONFIG: Record<string, { settle: number, scroll: boolean }> = {
  'cadence': { settle: 5000, scroll: true }, // ~4s GSAP Loader timeline
  'flow-landing': { settle: 5000, scroll: true }, // Webflow preloader
  'strangers-again': { settle: 3000, scroll: true },
  'through-the-eras': { settle: 3000, scroll: true },
  'last-faithful-admin': { settle: 1500, scroll: false }, // static game menu
  'recall': { settle: 2000, scroll: false },
}

function fail(ms: number) {
  return new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error(`timed out after ${ms}ms`)), ms))
}

// Cut the intro off the front. Playwright's webm has one keyframe (frame 0), so
// a stream copy can't seek — must re-encode. Fast VP9 (realtime, cpu-used 8) so
// it stays quick. Runs OUTSIDE the browser timeout (see loop) — a slow encode
// must never kill the capture.
function trim(file: string, startSec: number) {
  const raw = `${file}.raw.webm`
  execFileSync('mv', [file, raw])
  execFileSync('ffmpeg', ['-y', '-ss', String(startSec), '-i', raw, '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '36', '-an', '-deadline', 'realtime', '-cpu-used', '8', file], { stdio: 'ignore' })
  execFileSync('rm', ['-f', raw])
}

async function record(slug: string, url: string) {
  const cfg = CONFIG[slug] ?? DEFAULT
  const browser = await chromium.launch()
  try {
    const context = await browser.newContext({
      viewport: VIEWPORT,
      recordVideo: { dir: tmpDir, size: VIEWPORT },
    })
    const page = await context.newPage()
    page.setDefaultTimeout(20_000)

    // 'load' (not 'networkidle') — Webflow/analytics keep sockets open forever.
    await page.goto(url, { waitUntil: 'load' })
    await page.waitForTimeout(cfg.settle) // let the preloader/intro finish
    await page.screenshot({ path: join(outDir, `${slug}.jpg`), type: 'jpeg', quality: 82 })

    if (cfg.scroll) {
      const height = await page.evaluate(() => document.body.scrollHeight - window.innerHeight)
      const steps = 12
      for (let i = 0; i <= steps; i++) {
        await page.evaluate(y => window.scrollTo({ top: y, behavior: 'smooth' }), (Math.max(0, height) * i) / steps)
        await page.waitForTimeout(CLIP_MS / steps)
      }
    }
    else {
      await page.waitForTimeout(CLIP_MS) // hold on the hero and record it live
    }

    const video = page.video()
    await page.close() // stops rAF/audio so the video can finalize (games hung otherwise)
    await context.close()
    if (!video)
      return null
    const out = join(outDir, `${slug}.webm`)
    await rename(await video.path(), out) // untrimmed; caller trims outside the timeout
    return out
  }
  finally {
    await browser.close().catch(() => {})
  }
}

// Browser work is timeout-guarded; the (slower) trim runs after, unguarded.
async function capture(slug: string, url: string) {
  const cfg = CONFIG[slug] ?? DEFAULT
  const out = await Promise.race([record(slug, url), fail(SITE_TIMEOUT_MS)])
  if (out)
    trim(out, cfg.settle / 1000)
}

const only = process.argv.slice(2)
const live = play.filter(p => p.href && (only.length === 0 || only.includes(p.slug)))
process.stderr.write(`Recording ${live.length} card(s)…\n`)

await mkdir(tmpDir, { recursive: true })
for (const item of live) {
  try {
    await capture(item.slug, item.href)
    process.stderr.write(`  ✓ ${item.slug}\n`)
  }
  catch (err) {
    process.stderr.write(`  ✗ ${item.slug}: ${(err as Error).message}\n`)
  }
}

for (const f of await readdir(tmpDir).catch(() => [])) await rm(join(tmpDir, f)).catch(() => {})
await rm(tmpDir, { recursive: true, force: true }).catch(() => {})
process.stderr.write('done\n')
