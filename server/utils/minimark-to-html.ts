type MinimarkNode = string | [string, Record<string, unknown>, ...MinimarkNode[]]

const VOID = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img',
  'input', 'link', 'meta', 'param', 'source', 'track', 'wbr',
])

function escapeText(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function escapeAttr(s: string) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;')
}

function nodeToHtml(node: MinimarkNode): string {
  if (typeof node === 'string')
    return escapeText(node)

  const [tag, props, ...children] = node
  const attrs = Object.entries(props ?? {})
    .filter(([, v]) => v != null && v !== false)
    .map(([k, v]) => (v === true ? ` ${k}` : ` ${k}="${escapeAttr(Array.isArray(v) ? v.join(' ') : String(v))}"`))
    .join('')

  if (VOID.has(tag))
    return `<${tag}${attrs}>`

  return `<${tag}${attrs}>${children.map(nodeToHtml).join('')}</${tag}>`
}

// ponytail: minimal serializer for the author's own trusted content; not hardened against `]]>` inside CDATA (won't occur in these essays)
export function minimarkToHtml(body: { value?: MinimarkNode[] } | null | undefined): string {
  if (!body?.value)
    return ''
  return body.value.map(nodeToHtml).join('')
}
