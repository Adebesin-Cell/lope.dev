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

      const token = config.posthogOptoutToken as string
      if (token) {
        const optout = new URLSearchParams(window.location.search).get('ph_optout')
        if (optout === token)
          ph.opt_out_capturing()
        else if (optout === 'reset')
          ph.opt_in_capturing()
      }
    },
  })

  if (import.meta.dev)
    client.opt_out_capturing()

  return {
    provide: { posthog: () => client },
  }
})
