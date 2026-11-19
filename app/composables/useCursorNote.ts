export interface CursorNote {
  id: string
  text: string
  anchor?: HTMLElement
}

export function useCursorNote() {
  const note = useState<CursorNote | null>('cursor-note', () => null)

  function show(next: CursorNote) {
    note.value = next.anchor ? { ...next, anchor: markRaw(next.anchor) } : next
  }

  function hide(id: string) {
    if (note.value?.id === id) note.value = null
  }

  return { note, show, hide }
}
