import { h, JSX } from 'preact'
import { Message } from './message'
import { Host } from '~/config'
import { useFetch } from '~/utils/use-fetch'
import { Comment } from '~/models'

type Props = {
  postId: number,
}

export const CommentsList = ({ postId }: Props) => {

  const url = `${Host}posts/${postId}/comments`
  const state = useFetch<Comment[]>(url)

  let view: JSX.Element

  switch (state.status) {
    case 'success':
      {
        const items = state.json.slice(0, 10)
        view = (
          <div class="list-group">
            {items.map(i => (
              <CommentListItem {...i} key={i.id} />
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
        view = <Message text={`fetching for id=${postId} ...`} type="default" />
      }
      break
  }

  return view
}

const CommentListItem = (props: Comment) => {
  return (
    <div class="list-group-item list-group-item-action flex-column align-items-start">
      <div class="d-flex w-100 justify-content-between">
        <h6 class="mb-1">{props.name}</h6>
        <small class="text-muted text-nowrap"><a href={`mailto:${props.email}`}>{props.email}</a></small>
      </div>
      <p class="mb-1 small">{props.body}</p>
    </div>
  )
}