export const seriesSlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

export const seriesPath = (name: string) => `/blog/series/${seriesSlug(name)}`
