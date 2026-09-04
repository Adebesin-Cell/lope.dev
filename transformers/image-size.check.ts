import assert from 'node:assert'
import { readFileSync } from 'node:fs'
import { readSize } from './image-size'

const cases: [string, number, number][] = [
  ['public/images/blog/hey-elvon/cover.jpg', 2176, 1080],
  ['public/images/blog/context/cover.svg', 1200, 520],
  ['public/images/blog/my-pastor-once-said/hero.png', 2880, 1800],
]

for (const [path, width, height] of cases)
  assert.deepStrictEqual(readSize(readFileSync(path)), { width, height }, path)

const gif = Buffer.concat([Buffer.from('GIF89a'), Buffer.from([0x80, 0x02, 0x40, 0x01]), Buffer.alloc(20)])
assert.deepStrictEqual(readSize(gif), { width: 640, height: 320 }, 'gif header')

assert.strictEqual(readSize(Buffer.alloc(4)), null)
assert.strictEqual(readSize(Buffer.alloc(64)), null)

console.log(`ok, ${cases.length + 1} formats`)
