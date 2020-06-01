import { h, JSX } from 'preact'
import { Message } from './message'
import { Host } from '~/config'
import { useFetch } from '~/utils/use-fetch'
import { Post } from '~/models'

type Props = {
  activePostId: number,
  onSelect: (id: number) => void,
}

export const PostList = ({ activePostId, onSelect }: Props) => {

  const url = `${Host}posts`
  const state = useFetch<Post[]>(url)

  let view: JSX.Element

  switch (state.status) {
    case 'success':
      {
        const items = state.json.slice(0, 5)
        view = (
          <div class="list-group">
            {items.map(i => (
              <PostListItem {...i} active={i.id === activePostId} onSelect={onSelect} key={i.id} />
            ))}
          </div>
        )
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

const PostListItem = (props: Post & { active: boolean, onSelect: (id: number) => void }) => {

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