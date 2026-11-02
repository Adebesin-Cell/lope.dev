import assert from 'node:assert'
import { legacyOgPagePath, ogImageFromHtml } from './legacy-og'

assert.equal(legacyOgPagePath('static/blog/look-it-up-once/og.png'), '/blog/look-it-up-once')
assert.equal(legacyOgPagePath('image/blog/hey-elvon/og.png'), '/blog/hey-elvon')
assert.equal(legacyOgPagePath('image/og.png'), '/')
assert.equal(legacyOgPagePath('static/og.jpeg'), '/')
assert.equal(legacyOgPagePath('image/blog/x/og.svg'), null)
assert.equal(legacyOgPagePath('image/blog/x/other.png'), null)
assert.equal(legacyOgPagePath('image/../api/x/og.png'), null)
assert.equal(legacyOgPagePath('image/blog//x/og.png'), null)
assert.equal(legacyOgPagePath('image/https:/evil.com/og.png'), null)
assert.equal(legacyOgPagePath('image/blog/series/panda-internals/og.png'), '/blog/series/panda-internals')
assert.equal(legacyOgPagePath('image/ingest/anything/og.png'), null)
assert.equal(legacyOgPagePath('image/api/releases/1/og.png'), null)
assert.equal(legacyOgPagePath('image/lope-is-graduating/og.png'), null)
assert.equal(legacyOgPagePath('image/blog/a/b/og.png'), null)

assert.equal(
  ogImageFromHtml('<meta name="twitter:image" content="a"><meta property="og:image" content="https://x/_og/d/b.png">'),
  'https://x/_og/d/b.png',
)
assert.equal(ogImageFromHtml('<meta property="og:image:width" content="1200">'), null)
assert.equal(ogImageFromHtml('<html></html>'), null)
assert.equal(
  ogImageFromHtml('<meta property="og:image" content="https://x/a.png?b=1&amp;c=2">'),
  'https://x/a.png?b=1&c=2',
)

console.log('legacy-og: ok')
