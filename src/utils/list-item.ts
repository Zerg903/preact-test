
type ListItem = { value: string, name: string }
type NamedEntry = { id: number, name: string }

const namedEntryMapper = (entry: NamedEntry): ListItem => ({ value: entry.id.toString(), name: entry.name })
const firstItem: ListItem = { value: '', name: '...' }

export const makeOptions = <T>(items: T[], map: (t: T) => ListItem): ListItem[] => {
  return items.reduce((a, i) => { a.push(map(i)); return a }, [firstItem])
}

export const makeItemOptions = (items: { id: number, name: string }[]): ListItem[] => {
  return makeOptions(items, namedEntryMapper)
}
