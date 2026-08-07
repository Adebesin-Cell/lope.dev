export interface CardData {
  quote: string
  title?: string
  url?: string
}

export type CardFormat = 'x' | 'ig'

const BG = '#0a0a0a'
const INK = '#f4f4f5'
const MUTED = 'rgba(161,161,170,0.9)'
const FAINT = '#71717a'
const AVATAR = '/lope-avatar.jpeg'

export const DIMENSIONS: Record<CardFormat, [number, number]> = {
  x: [1600, 900],
  ig: [1080, 1080],
}

export const PLUM_SEED = 41

let ready: Promise<HTMLImageElement> | null = null
function ensureAssets() {
  if (ready)
    return ready
  ready = Promise.all([
    document.fonts.load('500 40px Newsreader'),
    document.fonts.load('italic 400 22px Newsreader'),
    document.fonts.load('600 44px Caveat'),
    document.fonts.load('600 28px Inter'),
    document.fonts.load('500 16px "JetBrains Mono"'),
  ]).then(() => new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = AVATAR
  }))
  return ready
}

function wrap(ctx: CanvasRenderingContext2D, str: string, maxW: number): string[] {
  const words = str.split(' ')
  const lines: string[] = []
  let line = ''
  for (const w of words) {
    const test = line ? `${line} ${w}` : w
    if (ctx.measureText(test).width > maxW && line) {
      lines.push(line)
      line = w
    }
    else {
      line = test
    }
  }
  if (line)
    lines.push(line)
  return lines
}

function layout(ctx: CanvasRenderingContext2D, paras: string[], maxW: number, size: number): string[] {
  ctx.font = `500 ${size}px Newsreader, serif`
  const out: string[] = []
  paras.forEach((p, i) => {
    if (i)
      out.push('')
    for (const l of wrap(ctx, p, maxW))
      out.push(l)
  })
  return out
}

function measure(lines: string[], size: number): number {
  const lh = size * 1.42
  return lines.reduce((h, l) => h + (l === '' ? lh * 0.55 : lh), 0)
}

function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6D2B79F5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export type PlumSegment = [number, number, number, number]

export function plumSegments(w: number, h: number, seed: number): PlumSegment[] {
  const rand = mulberry32(seed)
  const r15 = Math.PI / 12
  const r90 = Math.PI / 2
  const r180 = Math.PI
  const len = w / 260
  const segs: PlumSegment[] = []
  const step = (x: number, y: number, rad: number) => {
    if (segs.length > 3200)
      return
    const length = rand() * len
    const nx = x + Math.cos(rad) * length
    const ny = y + Math.sin(rad) * length
    segs.push([x, y, nx, ny])
    if (nx < -60 || nx > w + 60 || ny < -60 || ny > h + 60)
      return
    const rate = segs.length <= 30 ? 0.8 : 0.5
    if (rand() < rate)
      step(nx, ny, rad + rand() * r15)
    if (rand() < rate)
      step(nx, ny, rad - rand() * r15)
  }
  step(w + 5, rand() * h * 0.5 + h * 0.15, r180)
  step(rand() * w * 0.4 + w * 0.55, -5, r90)
  return segs
}

function drawPlum(ctx: CanvasRenderingContext2D, w: number, h: number, seed: number) {
  ctx.save()
  ctx.strokeStyle = 'rgba(210,210,215,0.16)'
  ctx.lineWidth = 1
  ctx.lineCap = 'round'
  for (const [x1, y1, x2, y2] of plumSegments(w, h, seed)) {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
  }
  ctx.restore()
}

export function useHighlightCard() {
  async function draw(canvas: HTMLCanvasElement, format: CardFormat, data: CardData) {
    const avatar = await ensureAssets()
    const [w, h] = DIMENSIONS[format]
    const dpr = 2
    canvas.width = w * dpr
    canvas.height = h * dpr
    const ctx = canvas.getContext('2d')
    if (!ctx)
      return
    ctx.scale(dpr, dpr)
    ctx.textBaseline = 'alphabetic'

    ctx.fillStyle = BG
    ctx.fillRect(0, 0, w, h)

    const P = Math.round(w * 0.07)
    const contentW = w - P * 2
    const inset = Math.round(P * 0.55)
    drawPlum(ctx, w, h, PLUM_SEED)

    const L = 26
    ctx.strokeStyle = 'rgba(244,244,245,0.28)'
    ctx.lineWidth = 1.5
    const corner = (cx: number, cy: number, dx: number, dy: number) => {
      ctx.beginPath()
      ctx.moveTo(cx, cy + dy * L)
      ctx.lineTo(cx, cy)
      ctx.lineTo(cx + dx * L, cy)
      ctx.stroke()
    }
    corner(inset, inset, 1, 1)
    corner(w - inset, inset, -1, 1)
    corner(inset, h - inset, 1, -1)
    corner(w - inset, h - inset, -1, -1)

    const av = 52
    ctx.save()
    ctx.beginPath()
    ctx.roundRect(P, P, av, av, 10)
    ctx.clip()
    const side = Math.min(avatar.width, avatar.height)
    ctx.drawImage(avatar, (avatar.width - side) / 2, (avatar.height - side) / 2, side, side, P, P, av, av)
    ctx.restore()

    const nameX = P + av + 18
    ctx.textBaseline = 'middle'
    ctx.fillStyle = INK
    ctx.font = '600 26px Inter, sans-serif'
    ctx.fillText('Adebesin Tolulope', nameX, P + av / 2 + 1)
    const nameW = ctx.measureText('Adebesin Tolulope').width
    ctx.fillStyle = MUTED
    ctx.font = 'italic 500 26px Newsreader, serif'
    ctx.fillText('/ Blog', nameX + nameW + 12, P + av / 2 + 1)

    ctx.textAlign = 'right'
    ctx.fillStyle = FAINT
    ctx.font = '500 14px "JetBrains Mono", monospace'
    ctx.letterSpacing = '3px'
    ctx.fillText('PULLED FROM THE POST', w - P, P + av / 2 + 1)
    ctx.letterSpacing = '0px'
    ctx.textAlign = 'left'

    ctx.textBaseline = 'alphabetic'
    const markY = P + av + 74
    ctx.fillStyle = 'rgba(244,244,245,0.22)'
    ctx.font = '500 96px Newsreader, serif'
    ctx.fillText('“', P - 4, markY)

    const paras = data.quote.split('\n').map(s => s.trim()).filter(Boolean)
    const textTop = markY + 18
    const footerTop = h - P - 46
    const sigGap = 54
    const availH = footerTop - sigGap - textTop

    const max = Math.round(w * 0.05)
    const min = Math.round(w * 0.015)
    let size = max
    let lines = layout(ctx, paras, contentW, size)
    while (size > min && measure(lines, size) > availH) {
      size -= 2
      lines = layout(ctx, paras, contentW, size)
    }
    while (measure(lines, size) > availH && lines.length > 1)
      lines.pop()
    if (measure(layout(ctx, paras, contentW, size), size) > availH) {
      const last = lines[lines.length - 1]
      if (last)
        lines[lines.length - 1] = `${last.replace(/[\s.,;:]+$/, '')}…`
    }

    ctx.font = `500 ${size}px Newsreader, serif`
    ctx.fillStyle = INK
    const lh = size * 1.42
    const usedH = measure(lines, size)
    let y = textTop + size + Math.max(0, (availH - usedH) / 2)
    for (const l of lines) {
      if (l === '') {
        y += lh * 0.55
        continue
      }
      ctx.fillText(l, P, y)
      y += lh
    }

    ctx.fillStyle = INK
    ctx.font = '600 42px Caveat, cursive'
    ctx.fillText('— Lope', P, footerTop - 6)

    ctx.textAlign = 'right'
    if (data.title) {
      ctx.fillStyle = MUTED
      ctx.font = 'italic 400 19px Newsreader, serif'
      const t = `from “${data.title}”`
      ctx.fillText(ctx.measureText(t).width > contentW * 0.9 ? `${t.slice(0, 60)}…”` : t, w - P, footerTop + 8)
    }
    if (data.url) {
      ctx.fillStyle = FAINT
      ctx.font = '400 14px "JetBrains Mono", monospace'
      ctx.fillText(data.url.replace(/^https?:\/\//, ''), w - P, footerTop + 32)
    }
    ctx.textAlign = 'left'
  }

  return { draw }
}
