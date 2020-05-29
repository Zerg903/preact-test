
export type ListItem = { value: string, name: string }

export const makeOptions = <T>(items: T[], map: (t: T) => ListItem): ListItem[] => {
  return items.reduce((a, i) => { a.push(map(i)); return a }, [defaultItem])
}

const defaultItem: ListItem = { value: '', name: '...' }