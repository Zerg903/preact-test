import { h, JSX } from 'preact'
import { Post } from '~/models'

type Props = {
  items: Post[],
  onSelect: (id: number) => void,
  postId: number,
}

export const PostList = (props: Props) => {

  const { items, postId, onSelect } = props

  return (
    <div class="list-group">
      {items.map(i => (
        <PostListItem {...i} active={i.id === postId} onSelect={onSelect} key={i.id} />
      ))}
    </div>
  )
}

const PostListItem = (props: Post & { onSelect: Props['onSelect'], active: boolean }) => {

  const onClick = (e: JSX.TargetedEvent<HTMLElement, Event>) => {
    props.onSelect(props.id)
    e.preventDefault()
  }

  return (
    <a href="#"
      class={`list-group-item list-group-item-action flex-column align-items-start${props.active ? ' active' : ''}`}
      onClick={onClick}
    >
      <div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">{props.title}</h5>
        <small class="text-muted text-nowrap">id: {props.id}</small>
      </div>
      <p class="mb-1 small">{props.body}</p>
    </a >
  )
}
