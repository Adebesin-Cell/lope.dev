const KEY = 'lope:reads'

export function useReads() {
  const reads = useState<string[]>('reads', () => [])
  const loaded = useState('reads-loaded', () => false)

  if (import.meta.client) {
    onMounted(() => {
      if (loaded.value) return
      loaded.value = true
      try {
        const saved: unknown = JSON.parse(localStorage.getItem(KEY) ?? '[]')
        if (Array.isArray(saved)) reads.value = saved.filter((p): p is string => typeof p === 'string')
      } catch {}
    })
  }

  function isRead(path: string) {
    return reads.value.includes(path)
  }

  function markRead(path: string) {
    if (isRead(path)) return false
    reads.value = [...reads.value, path]
    try {
      localStorage.setItem(KEY, JSON.stringify(reads.value))
    } catch {}
    return true
  }

  return { reads, isRead, markRead }
}
