import { Fragment, h, JSX } from 'preact'
import { PageHeader } from '~/components/page-header'
import { Form, Props } from '~/components/form'
import { useFetch, FetchState } from '~/utils/use-fetch'
import { City } from '~/models'
import { Message } from '~/components/message'

export const FormPage = () => {

  const url = '/assets/cities.json'
  const state = useFetch<City[]>(url)

  return (
    <Fragment>
      <PageHeader text="Form example" />
      <div class="row">
        <div class="col-6">
          {switchView(state)}
        </div>
      </div>
    </Fragment>
  )
}

const switchView = (state: FetchState<City[]>) => {

  let View: JSX.Element

  switch (state.status) {
    case 'success':
      {
        const data = normolize(state.json)
        View = <Form data={data} />
      }
      break
    case 'error':
      {
        View = <Message text="errror!" type="danger" />
      }
      break
    default:
      {
        View = <Message text="fetching..." type="default" />
      }
      break
  }

  return View
}

const normolize = (json: City[]): Props['data'] =>
  json.reduce<Props['data']>(
    (acc, item) => {
      const id = item.id
      acc.allIds.push(id)
      acc.byId[id] = item
      return acc
    },
    { byId: {}, allIds: [] })
