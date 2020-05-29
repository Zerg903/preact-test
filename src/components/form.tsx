import { h, JSX } from 'preact'
import { useReducer, useState } from 'preact/hooks'
import { ListItem, makeOptions } from '~/utils/list-item'
import { City } from '~/models/City'

export type Props = {
  cities: {
    byId: { [id: number]: City }
    allIds: number[]
  }
}

type State = {
  cityId: string,
  streetId: string,
  name: string,
}

const initialState: State = {
  cityId: '',
  streetId: '',
  name: ''
};

const reducer = (state: State, action: { field: keyof State, value: string }): State => {

  if (action.field === 'cityId')
    return { ...state, 'cityId': action.value, 'streetId': '' }

  return { ...state, [action.field]: action.value }
}

const validate = (state: State) => {

  var errors: { [key in keyof State]?: string } = {}

  if (state.cityId === '')
    errors.cityId = 'Field "City" is required'

  if (state.streetId === '')
    errors.streetId = 'Field "Street" is required'

  if (state.name === '')
    errors.name = 'Field "Name" is required'

  return errors;
}

const ItemMapper = (item: { id: number, name: string }): ListItem => ({ value: item.id.toString(), name: item.name })

export const Form = ({ cities }: Props) => {

  const [state, dispatch] = useReducer(reducer, initialState)
  const [displayErrors, setDisplayErrors] = useState(false)

  const errors = validate(state)

  const onSubmit = (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {

    if (Object.keys(errors).length == 0)
      alert(JSON.stringify(state))
    else
      setDisplayErrors(true)

    e.preventDefault();
  }

  const onChange = (e: JSX.TargetedEvent<HTMLElement, Event>) => {
    var target = e.target as unknown as { name: keyof State, value: string }
    dispatch({ field: target.name, value: target.value })
  }

  const cityOptions = makeOptions(cities.allIds.map(id => cities.byId[id]), ItemMapper)
  const streetOptions = makeOptions(state.cityId != '' ? cities.byId[state.cityId].streets : [], ItemMapper)

  return (
    <form onSubmit={onSubmit}>

      <div class="form-group">
        <label for="select1">City</label>
        <select class="form-control"
          name="cityId"
          value={state.cityId}
          onChange={onChange}>
          {cityOptions.map(i => (<option value={i.value} key={i.value}>{i.name}</option>))}
        </select>
        {displayErrors && errors.cityId && <div class="text-danger small mt-2">{errors.cityId}</div>}
      </div>

      <div class="form-group">
        <label for="select2">Street</label>
        <select class="form-control"
          name="streetId"
          value={state.streetId}
          onChange={onChange}>
          {streetOptions.map(i => (<option value={i.value} key={i.value}>{i.name}</option>))}
        </select>
        {displayErrors && errors.streetId && <div class="text-danger small mt-2">{errors.streetId}</div>}
      </div>

      <div class="form-group">
        <label for="address">Name</label>
        <input type="text" class="form-control"
          name="name"
          value={state.name}
          onChange={onChange} />
        {displayErrors && errors.name && <div class="text-danger small mt-2">{errors.name}</div>}
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>

    </form>
  )
}