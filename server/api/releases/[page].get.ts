const PER_PAGE = 20

export default defineEventHandler(async (event) => {
  const page = Math.max(1, Number(getRouterParam(event, 'page')) || 1)
  const prs = await getReleases(event)
  return { prs: prs.slice((page - 1) * PER_PAGE, page * PER_PAGE), total: prs.length, perPage: PER_PAGE }
})
