import { Fragment, h } from 'preact'
import { useState } from 'preact/hooks'
import { PageHeader } from '~/components/page-header'
import { PostList } from '~/components/post-list'
import { CommentList } from '~/components/comment-list'
import { Message } from '~/components/message'
import { Host } from '~/config'
import { useFetch } from '~/utils/use-fetch'
import { Comment, Post } from '~/models'

export const MasterSlaveExample = () => (
  <Fragment>
    <PageHeader text="Master / Slave example" />
    <MasterSlaveContainer />
  </Fragment>
)

const MasterSlaveContainer = () => {

  const [postId, setPostId] = useState<number>(-1)

  return (
    <div class="row">
      <div class="col-6">
        <h4 class="px-3">Posts</h4>
        <PostsContainer onSelect={setPostId} postId={postId} />
      </div>
      <div class="col-6">
        <h4 class="px-3">Comments</h4>
        {postId === -1
          ? <Message text="<-- select post, pls" type="default" />
          : <CommentsContainer postId={postId} />
        }
      </div>
    </div>
  )
}

export const PostsContainer = (props: { postId: number, onSelect: (id: number) => void }) => {

  const url = `${Host}posts`
  const state = useFetch<Post[]>(url)

  switch (state.status) {
    case 'success':
      return <PostList items={state.json.slice(0, 5)} postId={props.postId} onSelect={props.onSelect} />

    case 'error':
      return <Message text="errror!" type="danger" />

    default:
      return <Message text="fetching..." type="default" />
  }
}

const CommentsContainer = (props: { postId: number }) => {

  const { postId } = props
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
