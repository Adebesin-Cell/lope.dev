
interface MergedPR {
  org: string
  repo: string
  number: number
  title: string
  url: string
  mergedAt: string
  orgAvatar: string
  type: string
}


const BATCH = 100

const TYPE_RE = /^(\w+)(?:\([^)]*\))?!?:/
const KNOWN_TYPES = new Set(['feat', 'fix', 'docs', 'chore', 'refactor', 'perf', 'test', 'build', 'ci', 'style', 'release'])

function commitType(title: string) {
  const t = title.match(TYPE_RE)?.[1]?.toLowerCase() ?? ''
  return KNOWN_TYPES.has(t) ? t : ''
}

export default defineCachedEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const user = config.public.githubUser

  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github+json',
    'User-Agent': 'lope.adebesin.com',
  }
  if (config.githubToken)
    headers.Authorization = `Bearer ${config.githubToken}`

  const q = `author:${user} type:pr is:merged is:public`
  const search = await $fetch<{ items?: any[], total_count?: number }>(
    `https://api.github.com/search/issues?q=${encodeURIComponent(q)}&sort=updated&order=desc&per_page=${BATCH}`,
    { headers, retry: 0 },
  ).catch(() => ({ items: [], total_count: 0 }))

  const prs: MergedPR[] = (search.items ?? [])
    .map((it: any) => {
      const full = (it.repository_url ?? '').replace('https://api.github.com/repos/', '')
      const [org, repo] = full.split('/')
      return {
        org: org ?? '',
        repo: repo ?? '',
        number: it.number,
        title: it.title ?? '',
        url: it.html_url ?? '',
        mergedAt: it.pull_request?.merged_at ?? it.closed_at ?? '',
        orgAvatar: org ? `https://github.com/${org}.png?size=80` : '',
        type: commitType(it.title ?? ''),
      } satisfies MergedPR
    })
    .filter(p => p.repo)

  return { prs, total: search.total_count ?? prs.length, fetchedAt: new Date().toISOString() }
}, {
  maxAge: 60 * 60,
  name: 'releases',
})
