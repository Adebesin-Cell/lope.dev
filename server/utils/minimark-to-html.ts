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

function attr(props: Record<string, unknown> | undefined, key: string) {
  const value = props?.[key]
  return value == null ? '' : escapeText(String(value))
}

// MDC components have no HTML equivalent, so without a mapping here they
// serialize as their own tag name and render as nothing in a feed reader.
function componentToHtml(tag: string, props: Record<string, unknown> | undefined, body: string) {
  if (tag === 'guide') {
    const meta = [attr(props, 'time'), attr(props, 'team')].filter(Boolean).join(' &#183; ')
    return [
      `<h3>${attr(props, 'title')}</h3>`,
      meta && `<p>${meta}</p>`,
      `<ol>${body}</ol>`,
    ].filter(Boolean).join('')
  }

  if (tag === 'step') {
    const parts = attr(props, 'parts')
    const gotcha = attr(props, 'gotcha')
    return [
      `<li><strong>${attr(props, 'title')}</strong>`,
      parts && `<p><em>${parts}</em></p>`,
      body,
      gotcha && `<p><strong>Gotcha:</strong> ${gotcha}</p>`,
      '</li>',
    ].filter(Boolean).join('')
  }

  if (tag === 'clip') {
    const src = attr(props, 'src')
    const poster = attr(props, 'poster')
    return [
      `<video src="${src}"${poster && ` poster="${poster}"`} controls muted loop playsinline></video>`,
      `<p><a href="${src}">${attr(props, 'alt') || 'Watch the clip'}</a></p>`,
    ].join('')
  }

  return null
}

function nodeToHtml(node: MinimarkNode): string {
  if (typeof node === 'string')
    return escapeText(node)

  const [tag, props, ...children] = node

  // shiki dumps highlight spans + a <style> block into the body; feeds want neither.
  if (tag === 'style')
    return ''
  if (tag === 'pre' && props?.code != null)
    return `<pre><code>${escapeText(String(props.code))}</code></pre>`

  const component = componentToHtml(tag, props, children.map(nodeToHtml).join(''))
  if (component != null)
    return component

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
