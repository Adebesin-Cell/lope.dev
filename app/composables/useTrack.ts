import type { PostHog } from 'posthog-js'

export function useTrack() {
  const { $posthog } = useNuxtApp() as { $posthog?: () => PostHog }
  return (event: string, properties?: Record<string, string | number>) => $posthog?.().capture(event, properties)
}
