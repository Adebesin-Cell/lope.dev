export const seriesSlug = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

export const seriesPath = (name: string) => `/blog/series/${seriesSlug(name)}`

export const isMainPart = (part?: number) => Number.isInteger(part)

export const partNumber = (part?: number) => (isMainPart(part) ? String(part).padStart(2, '0') : 'OVA')
