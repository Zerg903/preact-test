
export type City = {
  id: number,
  name: string,
  streets: { id: number, name: string }[]
}

export type Post = {
  id: number,
  title: string,
  body: string
}

export type Comment = {
  id: number,
  name: string,
  body: string,
  email: string
}