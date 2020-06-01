import { Fragment, h } from 'preact'
import { useState } from 'preact/hooks'
import { PageHeader } from '~/components/page-header'
import { Posts } from '~/components/posts'
import { Comments } from '~/components/comments'
import { Message } from '~/components/message'

export const MasterSlaveExample = () => (
  <Fragment>
    <PageHeader text="Master / Slave example" />
    <PostsContainer />
  </Fragment>
)


const PostsContainer = () => {

  const [postId, setPostId] = useState<number>(-1)
  
  return (
    <div class="row">
      <div class="col-6">
        <h4 class="px-3">Posts</h4>
        <Posts onSelect={setPostId} postId={postId} />
      </div>
      <div class="col-6">
        <h4 class="px-3">Comments</h4>
        {postId === -1
          ? <Message text="<-- select post, pls" type="default" />
          : <Comments postId={postId} />
        }
      </div>
    </div>
  )
}
