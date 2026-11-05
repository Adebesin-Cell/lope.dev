export default defineEventHandler(async (event) => {
  requireAdmin(event)
  const rkey = getRouterParam(event, 'rkey') ?? ''
  if (!/^[\w.:~-]{1,512}$/.test(rkey)) throw createError({ statusCode: 400, statusMessage: 'Bad id' })
  await deleteQuestion(rkey)
  return { ok: true }
})
