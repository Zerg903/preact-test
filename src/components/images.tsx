import { h } from 'preact'
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

export const Images = (props: Props) => {

  const url = `${Host}photos`
  const state = useFetch<Item[]>(url)

  switch (state.status) {
    case 'success':
      return <ImageList items={state.json.slice(0, props.size)} />

    case 'error':
      return <Message text="errror!" type="danger" />

    default:
      return <Message text="fetching..." type="default" />
  }
}

const ImageList = (props: { items: Item[] }) => (
  <div>{props.items.map(i => <Image {...i} />)}</div>
)

const Image = (props: Item) => (
  <img class="img-thumbnail m-2" src={props.thumbnailUrl} title={props.title} />
)
