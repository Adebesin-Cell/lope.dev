import assert from 'node:assert'
import { minimarkToHtml } from './minimark-to-html'

const guide = minimarkToHtml({
  value: [
    ['guide', { title: 'Build your own Elvon', time: '~6 hrs', team: '5 people' },
      ['step', { title: 'Prep the chassis', parts: '4x TT motor' }, ['p', {}, 'Motors first.']],
      ['step', { title: 'Wire the driver', gotcha: 'Common ground or nothing works.' }, ['p', {}, 'L298N.']],
    ],
  ],
})

assert.match(guide, /<h3>Build your own Elvon<\/h3>/)
assert.match(guide, /<p>~6 hrs &#183; 5 people<\/p>/)
assert.match(guide, /<ol>.*<\/ol>/s)
assert.strictEqual(guide.match(/<li>/g)?.length, 2, 'one li per step')
assert.match(guide, /<strong>Prep the chassis<\/strong><p><em>4x TT motor<\/em><\/p><p>Motors first\.<\/p>/)
assert.match(guide, /<p>L298N\.<\/p><p><strong>Gotcha:<\/strong> Common ground or nothing works\.<\/p>/)
assert.doesNotMatch(guide, /<guide|<step/, 'no raw component tags reach the feed')

const bare = minimarkToHtml({
  value: [['guide', { title: 'Minimal' }, ['step', { title: 'Only a title' }, ['p', {}, 'Body.']]]],
})

assert.doesNotMatch(bare, /<em>|Gotcha:/, 'absent attributes render nothing')
assert.doesNotMatch(bare, /&#183;/, 'no separator without meta')

const clip = minimarkToHtml({
  value: [['clip', { src: '/videos/a.mp4', poster: '/videos/a.webp', alt: 'A robot reversing' }]],
})

assert.match(clip, /<video src="\/videos\/a\.mp4" poster="\/videos\/a\.webp"/)
assert.match(clip, /<a href="\/videos\/a\.mp4">A robot reversing<\/a>/)
assert.doesNotMatch(clip, /<clip/, 'no raw clip tag reaches the feed')

assert.strictEqual(minimarkToHtml(null), '')
assert.strictEqual(minimarkToHtml({}), '')

console.log('ok, guide + step + clip serialize')
