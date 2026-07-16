const WORDS_PER_MINUTE = 200

export function readingTimeText(body: unknown): string | undefined {
  const words = extractText(body).trim().split(/\s+/).filter(Boolean).length
  if (!words)
    return undefined
  return `${Math.max(1, Math.round(words / WORDS_PER_MINUTE))}min`
}

function extractText(node: unknown): string {
  if (node == null)
    return ''
  if (typeof node === 'string')
    return node
  if (Array.isArray(node)) {
    // MDC element node is [tag, props, ...children]; a node list has arrays at index 0.
    if (typeof node[0] === 'string')
      return node.slice(2).map(extractText).join(' ')
    return node.map(extractText).join(' ')
  }
  if (typeof node === 'object') {
    const obj = node as Record<string, unknown>
    if ('value' in obj)
      return extractText(obj.value)
    if ('children' in obj)
      return extractText(obj.children)
  }
  return ''
}
