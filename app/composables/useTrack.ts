export function useTrack() {
  const { $track } = useNuxtApp() as { $track?: (event: string, properties?: Record<string, string | number>) => void }
  return (event: string, properties?: Record<string, string | number>) => $track?.(event, properties)
}
