import { Fragment, h } from 'preact'
import { PageHeader } from '~/components/page-header'
import { Form, Props } from '~/components/form'
import json from '~/cities.json'

export const FormExample = () => {

  var cities = json.reduce<Props['cities']>((acc, item) => {
    const id = item.id
    acc.allIds.push(id)
    acc.byId[id] = item
    return acc
  }, { byId: {}, allIds: [] })

  return (
    <Fragment>
      <PageHeader text="Form example" />
      <div class="row">
        <div class="col-6">
          <Form cities={cities} />
        </div>
      </div>
    </Fragment>
  )
}