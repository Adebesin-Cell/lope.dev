type Listable = { draft?: boolean | null; date?: string | Date | null }

export const today = () => new Date().toISOString().slice(0, 10)

export const isScheduled = (post: Listable) => !!post.date && String(post.date).slice(0, 10) > today()

export const isListed = (post: Listable) => !post.draft && !isScheduled(post)
