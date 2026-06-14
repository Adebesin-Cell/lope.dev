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

interface GhSearchItem {
  number: number
  title?: string
  html_url?: string
  repository_url?: string
  closed_at?: string
  pull_request?: { merged_at?: string }
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

// Batch every repo's star count into ONE GraphQL request instead of a REST
// call per repo. GraphQL requires auth, so without a token we skip stars
// (the UI hides the star when count is 0) — keeping the endpoint to a single
// search call rather than hammering the API unauthenticated.
async function fetchStars(repos: string[], token: string) {
  if (!token || !repos.length)
    return new Map<string, number>()

  const fields = repos
    .map((full, i) => {
      const [owner, name] = full.split('/')
      return `r${i}: repository(owner: ${JSON.stringify(owner)}, name: ${JSON.stringify(name)}) { stargazerCount }`
    })
    .join('\n')

  const res = await $fetch<{ data?: Record<string, { stargazerCount?: number } | null> }>(
    'https://api.github.com/graphql',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'User-Agent': 'lope.adebesin.com',
      },
      body: { query: `query {\n${fields}\n}` },
      retry: 0,
    },
  ).catch(() => null)

  const out = new Map<string, number>()
  repos.forEach((full, i) => out.set(full, res?.data?.[`r${i}`]?.stargazerCount ?? 0))
  return out
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

  const search = await $fetch<{ items?: GhSearchItem[], total_count?: number }>(
    `https://api.github.com/search/issues?q=${encodeURIComponent(q)}&sort=updated&order=desc&per_page=${BATCH}`,
    { headers, retry: 0 },
  ).catch(() => ({ items: [], total_count: 0 }))

  const base = (search.items ?? [])
    .map((it) => {
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

  const stars = await fetchStars([...new Set(base.map(p => `${p.org}/${p.repo}`))], config.githubToken)
  const prs = base.map(p => ({ ...p, stars: stars.get(`${p.org}/${p.repo}`) ?? 0 }))

  return { prs, total: search.total_count ?? prs.length, fetchedAt: new Date().toISOString() }
}, {
  maxAge: 60 * 60,
  name: 'releases',
})
