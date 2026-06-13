// Generates favicon.ico + apple-touch-icon.png (the "at" mark) so they match
// favicon.svg and replace the old CRA icon. Static assets — run manually:
//   bun run scripts/favicon.ts
import { writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { Renderer } from '@takumi-rs/core'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

const mark = (size: number) => ({
  type: 'container',
  style: {
    width: size,
    height: size,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0a0a0a',
    borderRadius: Math.round(size * 0.22),
    color: '#fafafa',
    fontFamily: 'Geist',
  },
  children: [{ type: 'text', text: 'at', style: { fontSize: Math.round(size * 0.5), fontWeight: 700 } }],
})

const r = new Renderer()
writeFileSync(join(ROOT, 'public/favicon.ico'), Buffer.from(await r.render(mark(64) as never, { width: 64, height: 64, format: 'ico' })))
writeFileSync(join(ROOT, 'public/apple-touch-icon.png'), Buffer.from(await r.render(mark(180) as never, { width: 180, height: 180, format: 'png' })))
console.log('favicons written: favicon.ico, apple-touch-icon.png')
