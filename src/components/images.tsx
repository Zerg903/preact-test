import { h } from 'preact'
import { Image } from '~/models'

export const ImageList = (props: { items: Image[] }) => (
  <div>{props.items.map(i => <ImageListItem {...i} />)}</div>
)

const ImageListItem = (props: Image) => (
  <img class="img-thumbnail m-2" src={props.thumbnailUrl} title={props.title} />
)
