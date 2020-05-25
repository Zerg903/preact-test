import { Fragment, h } from 'preact'
import { Counter } from '~/components/counter'
import { PageHeader } from '~/components/page-header'

export const Page1 = () => (
  <Fragment>
    <PageHeader text="Page 1" />
    <Counter />
  </Fragment>
)

