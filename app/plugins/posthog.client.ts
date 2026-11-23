import type { PostHog } from 'posthog-js'

type Properties = Record<string, string | number>

export default defineNuxtPlugin((nuxtApp) => {
  const { public: config } = useRuntimeConfig()
  const key = config.posthogPublicKey as string
  if (!key) return

  let client: PostHog | undefined
  const queue: Array<(ph: PostHog) => void> = []
  const run = (fn: (ph: PostHog) => void) => (client ? fn(client) : queue.push(fn))

  const landing = new URL(window.location.href)
  const campaign = Object.fromEntries([...landing.searchParams].filter(([name]) => name.startsWith('utm_')))
  let first = true

  nuxtApp.hook('page:finish', () => {
    const properties = first ? { $current_url: landing.href, ...campaign } : { $current_url: window.location.href }
    first = false
    run((ph) => ph.capture('$pageview', properties))
  })

  onNuxtReady(async () => {
    const { posthog } = await import('posthog-js')
    client = posthog.init(key, {
      api_host: '/ingest',
      ui_host: 'https://us.posthog.com',
      defaults: '2026-01-30',
      capture_pageview: false,
      capture_pageleave: true,
      disable_session_recording: true,
      disable_surveys: true,
      loaded: (ph) => {
        if (import.meta.dev) ph.debug()

        const token = config.posthogOptoutToken as string
        if (token) {
          const optout = new URLSearchParams(window.location.search).get('ph_optout')
          if (optout === token) ph.opt_out_capturing()
          else if (optout === 'reset') ph.opt_in_capturing()
        }
      },
    })

    if (import.meta.dev) client.opt_out_capturing()
    for (const fn of queue.splice(0)) fn(client)
  })

  return {
    provide: {
      track: (event: string, properties?: Properties) => run((ph) => ph.capture(event, properties)),
    },
  }
})
