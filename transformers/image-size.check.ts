import assert from 'node:assert'
import { readFileSync } from 'node:fs'
import { readSize } from './image-size'

const cases: [string, number, number][] = [
  ['public/images/blog/hey-elvon/cover.jpg', 2176, 1080],
  ['public/images/blog/hey-elvon/glue-gun.gif', 640, 640],
  ['public/images/blog/context/cover.svg', 1200, 520],
  ['public/images/blog/my-pastor-once-said/hero.png', 2880, 1800],
]

for (const [path, width, height] of cases)
  assert.deepStrictEqual(readSize(readFileSync(path)), { width, height }, path)

assert.strictEqual(readSize(Buffer.alloc(4)), null)
assert.strictEqual(readSize(Buffer.alloc(64)), null)

console.log(`ok, ${cases.length} formats`)
