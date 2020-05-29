import { Fragment, h, JSX } from 'preact'
import { PageHeader } from '~/components/page-header'
import { Form, Props } from '~/components/form'
import { useFetch, FetchState } from '~/utils/use-fetch'
import { City } from '~/models/City'

export const FormExample = () => {

  const url = '/assets/cities.json';
  const state = useFetch<City[]>(url)

  return (
    <Fragment>
      <PageHeader text="Form example" />
      <div class="row">
        <div class="col-6">
          {SwitchState(state)}
        </div>
      </div>
    </Fragment>
  )
}

const SwitchState = (state: FetchState<City[]>) => {

  let View: JSX.Element

  switch (state.status) {
    case 'success':
      const cities = normolize(state.json)
      View = <Form cities={cities} />
      break;
    case 'error':
      View = <div class=".text-danger">errror!</div>
      break;
    default:
      View = <div class="text-primary">fetching...</div>
      break;
  }

  return View
}

const normolize = (json: City[]): Props['cities'] =>
  json.reduce<Props['cities']>(
    (acc, item) => {
      const id = item.id
      acc.allIds.push(id)
      acc.byId[id] = item
      return acc
    },
    { byId: {}, allIds: [] })
