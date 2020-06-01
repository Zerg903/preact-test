import { h } from 'preact'
import { Message } from './message'
import { Host } from '~/config'
import { useFetch } from '~/utils/use-fetch'
import { Comment } from '~/models'

type Props = {
  postId: number,
}

export const Comments = ({ postId }: Props) => {

  const url = `${Host}posts/${postId}/comments`
  const state = useFetch<Comment[]>(url)

  switch (state.status) {
    case 'success':
      return <CommentList items={state.json.slice(0, 10)} />

    case 'error':
      return <Message text="errror!" type="danger" />
      
    default:
      return <Message text={`fetching for id=${postId} ...`} type="default" />
  }
}

export const CommentList = (props: { items: Comment[] }) => (
  <div class="list-group">
    {props.items.map(i => (
      <CommentListItem {...i} key={i.id} />
    ))}
  </div>
)

const CommentListItem = (props: Comment) => (
  <div class="list-group-item list-group-item-action flex-column align-items-start">
    <div class="d-flex w-100 justify-content-between">
      <h6 class="mb-1">{props.name}</h6>
      <small class="text-muted text-nowrap"><a href={`mailto:${props.email}`}>{props.email}</a></small>
    </div>
    <p class="mb-1 small">{props.body}</p>
  </div>
)
