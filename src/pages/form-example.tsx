import { Fragment, h } from 'preact'
import { PageHeader } from '~/components/page-header'
import { Form, Props } from '~/components/form'
import { useFetch } from '~/utils/use-fetch'
import { City } from '~/models'
import { Message } from '~/components/message'

export const FormExample = () => (
  <Fragment>
    <PageHeader text="Form example" />
    <div class="row">
      <div class="col-6">
        <FormContainer />
      </div>
    </div>
  </Fragment>
)

const FormContainer = () => {

  const url = '/assets/cities.json'
  const state = useFetch<City[]>(url)

  switch (state.status) {
    case 'success':
      return <Form data={normolize(state.json)} />

    case 'error':
      return <Message text="errror!" type="danger" />

    default:
      return <Message text="fetching..." type="default" />
  }
}

const normolize = (json: City[]): Props['data'] => {
  return json.reduce<Props['data']>((acc, item) => {
    const id = item.id
    acc.allIds.push(id)
    acc.byId[id] = item
    return acc
  }, { byId: {}, allIds: [] })
}
