export function usePageSeo(opts: { title: string, description: string }) {
  const { url } = useSiteConfig()
  const route = useRoute()
  const canonical = `${url.replace(/\/$/, '')}${route.path}`

  useSeoMeta({
    title: opts.title,
    description: opts.description,
    ogType: 'website',
    ogTitle: opts.title,
    ogDescription: opts.description,
    ogUrl: canonical,
    twitterCard: 'summary_large_image',
    twitterTitle: opts.title,
    twitterDescription: opts.description,
  })

  useHead({ link: [{ rel: 'canonical', href: canonical }] })
}
