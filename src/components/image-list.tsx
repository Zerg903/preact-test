import { h, JSX } from 'preact'
import { Message } from './message'
import { useFetch } from '~/utils/use-fetch'
import { Host } from '~/config'

type Props = {
  size: number,
}

type Item = {
  title: string,
  url: string,
  thumbnailUrl: string,
}

export const ImageList = (props: Props) => {

  const url = `${Host}photos`
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
        view = <Message text="errror!" type="danger" />
      }
      break
    default:
      {
        view = <Message text="fetching..." type="default" />
      }
      break
  }

  return view
}

const Image = (props: Item) => (
  <img class="img-thumbnail m-2" src={props.thumbnailUrl} title={props.title} />
)