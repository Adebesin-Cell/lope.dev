import posthog from 'posthog-js'

export default defineNuxtPlugin(() => {
  const { public: config } = useRuntimeConfig()
  const key = config.posthogPublicKey as string
  if (!key)
    return

  const client = posthog.init(key, {
    api_host: '/ingest',
    ui_host: 'https://us.posthog.com',
    defaults: '2026-01-30',
    loaded: (ph) => {
      if (import.meta.dev)
        ph.debug()
    },
  })

  return {
    provide: { posthog: () => client },
  }
})
