import { h, JSX } from 'preact'
import { useFetch } from '~/utils/use-fetch'

type Props = {
  size: number,
}

type Item = {
  title: string,
  url: string,
  thumbnailUrl: string,
}

export const ImageList = (props: Props) => {

  const url = 'http://jsonplaceholder.typicode.com/photos'
  const state = useFetch<Item[]>(url)

  let view: JSX.Element

  switch (state.status) {
    case 'success':
      {
        const items = state.json.slice(0, props.size)
        view = <div>{items.map(i => <Image {...i} />)}</div>
      }
      break
    case 'error':
      {
        view = <div class=".text-danger">errror!</div>
      }
      break
    default:
      {
        view = <div class="text-primary">fetching...</div>
      }
      break
  }

  return view
}

const Image = (props: Item) => (
  <img class="img-thumbnail m-2" src={props.thumbnailUrl} title={props.title} />
)