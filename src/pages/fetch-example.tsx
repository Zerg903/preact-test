import { Fragment, h } from 'preact'
import { PageHeader } from '~/components/page-header'
import { Images } from '~/components/images'

export const FetchExample = () => (
  <Fragment>
    <PageHeader text="Fetch example" />
    <Images size={12} />
  </Fragment>
)
