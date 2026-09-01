import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { MinimalTree } from '@nuxt/content'
import { defineTransformer } from '@nuxt/content'

interface Size { width: number, height: number }

export function readSize(buf: Buffer): Size | null {
  if (buf.length < 24)
    return null

  if (buf.readUInt32BE(0) === 0x89504E47)
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) }

  if (buf.toString('ascii', 0, 3) === 'GIF')
    return { width: buf.readUInt16LE(6), height: buf.readUInt16LE(8) }

  if (buf.readUInt16BE(0) === 0xFFD8) {
    let i = 2
    while (i < buf.length - 9) {
      if (buf[i] !== 0xFF) {
        i++
        continue
      }
      const marker = buf[i + 1]!
      if (marker >= 0xC0 && marker <= 0xCF && ![0xC4, 0xC8, 0xCC].includes(marker))
        return { width: buf.readUInt16BE(i + 7), height: buf.readUInt16BE(i + 5) }
      i += 2 + buf.readUInt16BE(i + 2)
    }
    return null
  }

  const head = buf.toString('utf8', 0, 1024)
  if (head.includes('<svg')) {
    const viewBox = head.match(/viewBox=["']\s*[\d.-]+[\s,]+[\d.-]+[\s,]+([\d.]+)[\s,]+([\d.]+)/)
    if (viewBox)
      return { width: Math.round(+viewBox[1]!), height: Math.round(+viewBox[2]!) }
    const w = head.match(/\bwidth=["'](\d+)/)
    const h = head.match(/\bheight=["'](\d+)/)
    if (w && h)
      return { width: +w[1]!, height: +h[1]! }
  }

  return null
}

function sizeOf(src: string): Size | null {
  try {
    return readSize(readFileSync(join(process.cwd(), 'public', src)))
  }
  catch {
    return null
  }
}

type Node = [string, Record<string, unknown>, ...unknown[]]

function walk(nodes: unknown[]) {
  for (const node of nodes) {
    if (!Array.isArray(node))
      continue
    const [tag, props, ...children] = node as Node
    if (tag === 'img' && typeof props?.src === 'string' && props.src.startsWith('/') && !props.width) {
      const size = sizeOf(props.src)
      if (size) {
        props.width = size.width
        props.height = size.height
      }
    }
    walk(children)
  }
}

export default defineTransformer({
  name: 'image-size',
  extensions: ['.md'],
  transform(file) {
    const body = file.body as MinimalTree | undefined
    if (Array.isArray(body?.value))
      walk(body.value)
    return file
  },
})
