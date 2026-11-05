export default defineEventHandler(async (event) => {
  requireAdmin(event)
  setHeader(event, 'cache-control', 'no-store')
  return listQuestions()
})
