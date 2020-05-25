import { Fragment, h } from 'preact'
import { PageHeader } from '~/components/page-header'
import { ImageList } from '~/components/image-list'

export const Page2 = () => (
  <Fragment>
    <PageHeader text="Page 2" />
    <ImageList size={12} />
  </Fragment>
)