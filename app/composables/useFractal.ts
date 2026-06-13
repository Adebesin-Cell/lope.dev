// Symmetric fractal-tree generator. Produces a single SVG path string with
// many `M…L…` subpaths so it can be drawn as one stroke and animated cleanly
// via stroke-dasharray. Depth is bounded so total segments stay reasonable.
function mulberry32(seed: number) {
  return () => {
    let t = (seed += 0x6D2B79F5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

interface BranchOptions {
  seed?: number
  startX: number
  startY: number
  angle: number
  length: number
  depth: number
}

export function buildBranches(opts: BranchOptions) {
  const rand = mulberry32(opts.seed ?? 1)
  const segments: string[] = []

  function branch(x: number, y: number, angle: number, length: number, depth: number) {
    if (depth <= 0 || length < 1.5)
      return
    const x2 = x + Math.cos(angle) * length
    const y2 = y + Math.sin(angle) * length
    segments.push(`M${x.toFixed(1)},${y.toFixed(1)} L${x2.toFixed(1)},${y2.toFixed(1)}`)

    const spread = 0.32 + rand() * 0.18
    const taper = 0.7 + rand() * 0.06
    const wobble = (rand() - 0.5) * 0.12

    branch(x2, y2, angle - spread + wobble, length * taper, depth - 1)
    branch(x2, y2, angle + spread + wobble, length * (taper - 0.05), depth - 1)
  }

  branch(opts.startX, opts.startY, opts.angle, opts.length, opts.depth)
  return segments.join(' ')
}
