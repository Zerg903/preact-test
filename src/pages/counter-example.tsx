import { Fragment, h } from 'preact'
import { Counter } from '~/components/counter'
import { PageHeader } from '~/components/page-header'

export const CounterExample = () => (
  <Fragment>
    <PageHeader text="Counter example" />
    <Counter />
  </Fragment>
)

