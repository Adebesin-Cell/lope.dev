interface MergedPR {
  org: string
  repo: string
  number: number
  title: string
  url: string
  mergedAt: string
  orgAvatar: string
  type: string
  stars: number
}

const BATCH = 100

const REPO_AVATAR: Record<string, string> = {
  'chakra-ui/panda': '/brands/panda.png',
  'chakra-ui/ark': '/brands/ark.png',
  'chakra-ui/zag': '/brands/zag.png',
}

const TYPE_RE = /^(\w+)(?:\([^)]*\))?!?:/
const KNOWN_TYPES = new Set(['feat', 'fix', 'docs', 'chore', 'refactor', 'perf', 'test', 'build', 'ci', 'style', 'release'])

function commitType(title: string) {
  const t = title.match(TYPE_RE)?.[1]?.toLowerCase() ?? ''
  return KNOWN_TYPES.has(t) ? t : ''
}

async function fetchStars(repos: string[], headers: Record<string, string>) {
  const entries = await Promise.all(
    repos.map(async (full) => {
      const data = await $fetch<{ stargazers_count?: number }>(`https://api.github.com/repos/${full}`, { headers, retry: 0 }).catch(() => null)
      return [full, data?.stargazers_count ?? 0] as const
    }),
  )
  return new Map(entries)
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

  const q = process.env.NUXT_RELEASES_QUERY
    || `author:${user} type:pr is:merged is:public`

  const search = await $fetch<{ items?: any[], total_count?: number }>(
    `https://api.github.com/search/issues?q=${encodeURIComponent(q)}&sort=updated&order=desc&per_page=${BATCH}`,
    { headers, retry: 0 },
  ).catch(() => ({ items: [], total_count: 0 }))

  const base = (search.items ?? [])
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
        orgAvatar: REPO_AVATAR[full] ?? (org ? `https://github.com/${org}.png?size=80` : ''),
        type: commitType(it.title ?? ''),
        stars: 0,
      } satisfies MergedPR
    })
    .filter(p => p.repo)

  const stars = await fetchStars([...new Set(base.map(p => `${p.org}/${p.repo}`))], headers)
  const prs = base.map(p => ({ ...p, stars: stars.get(`${p.org}/${p.repo}`) ?? 0 }))

  return { prs, total: search.total_count ?? prs.length, fetchedAt: new Date().toISOString() }
}, {
  maxAge: 60 * 60,
  name: 'releases',
})
