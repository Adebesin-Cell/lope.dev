import assert from 'node:assert'
import { readFileSync } from 'node:fs'
import { readSize } from './image-size'

const cases: [string, number, number][] = [
  ['public/images/blog/hey-elvon/cover.jpg', 2176, 1080],
  ['public/images/blog/context/cover.svg', 1200, 520],
  ['public/images/blog/my-pastor-once-said/hero.png', 2880, 1800],
  ['public/images/blog/ocx-africa-day-2/juicers.webp', 1350, 900],
]

for (const [path, width, height] of cases) assert.deepStrictEqual(readSize(readFileSync(path)), { width, height }, path)

const gif = Buffer.concat([Buffer.from('GIF89a'), Buffer.from([0x80, 0x02, 0x40, 0x01]), Buffer.alloc(20)])
assert.deepStrictEqual(readSize(gif), { width: 640, height: 320 }, 'gif header')

const riff = (chunk: string, body: number[]) =>
  Buffer.concat([
    Buffer.from('RIFF'),
    Buffer.alloc(4),
    Buffer.from('WEBP' + chunk),
    Buffer.alloc(4),
    Buffer.from(body),
    Buffer.alloc(16),
  ])
const lossless = (640 - 1) | ((320 - 1) << 14)
assert.deepStrictEqual(
  readSize(
    riff('VP8L', [0x2f, lossless & 0xff, (lossless >> 8) & 0xff, (lossless >> 16) & 0xff, (lossless >>> 24) & 0xff]),
  ),
  { width: 640, height: 320 },
  'webp lossless',
)
assert.deepStrictEqual(
  readSize(riff('VP8X', [0, 0, 0, 0, 0x7f, 0x02, 0, 0x3f, 0x01, 0])),
  { width: 640, height: 320 },
  'webp extended',
)

assert.strictEqual(readSize(Buffer.alloc(4)), null)
assert.strictEqual(readSize(Buffer.alloc(64)), null)

console.log(`ok, ${cases.length + 1} formats`)
