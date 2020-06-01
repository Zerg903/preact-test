import { h } from 'preact'
import { Comment } from '~/models'

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
