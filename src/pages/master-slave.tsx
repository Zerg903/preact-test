import { Fragment, h } from 'preact'
import { useState } from 'preact/hooks'
import { PageHeader } from '~/components/page-header'
import { PostList } from '~/components/post-list'
import { CommentsList } from '~/components/comments-list'
import { Message } from '~/components/message'

export const MasterSlavePage = () => {

  const [postId, setPostId] = useState<number>(-1)

  return (
    <Fragment>
      <PageHeader text="Master / Slave" />
      <div class="row">
        <div class="col-6">
          <h4 class="px-3">Posts</h4>
          <PostList onSelect={setPostId} activePostId={postId} />
        </div>
        <div class="col-6">
          <h4 class="px-3">Comments</h4>
          {postId === -1
            ? <Message text="<-- select post, pls" type="default" />
            : <CommentsList postId={postId} />
          }
        </div>
      </div>
    </Fragment>
  )
}