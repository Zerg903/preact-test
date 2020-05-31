import { h } from 'preact'
import { useMemo, useReducer } from 'preact/hooks'
import { makeItemOptions } from '~/utils/list-item'
import { City } from '~/models/city'
import { Action, Errors, onChangeHandler, useSubmitHandler, onClickHandler } from '~/utils/form'

export type Props = {
  data: {
    byId: { [id: number]: City }
    allIds: number[]
  }
}

type State = {
  cityId: string,
  streetId: string,
  name: string,
  gender: string,
  accepted: boolean
}

const initialState: State = {
  cityId: '',
  streetId: '',
  name: '',
  gender: '',
  accepted: false,
}

const reducer = (state: State, action: Action<State>): State => {

  if (action.field === 'cityId')
    return { ...state, cityId: action.value, streetId: '' }

  return { ...state, [action.field]: action.value }
}

const validate = (state: State, errors: Errors<State>) => {

  if (state.cityId === '')
    errors.cityId = 'Field "City" is required'

  if (state.streetId === '')
    errors.streetId = 'Field "Street" is required'

  if (state.name === '')
    errors.name = 'Field "Name" is required'

  if (state.gender === '')
    errors.gender = 'Field "Gender" is required'

  if (!state.accepted)
    errors.accepted = 'You must agree before submitting'
}

const submit = (state: State) => {

  const json = {
    cityId: Number(state.cityId),
    streetId: Number(state.streetId),
    name: state.name,
    gender: state.gender,
    accepted: state.accepted,
  }

  // post json
  alert(JSON.stringify(json))
}

export const Form = ({ data }: Props) => {

  const [state, dispatch] = useReducer(reducer, initialState)
  const [errors, onSubmit] = useSubmitHandler(state, validate, submit)

  const onChange = onChangeHandler(dispatch)
  const onClick = onClickHandler(dispatch)

  const cities = useMemo(() => makeItemOptions(data.allIds.map(id => data.byId[id])), [data])
  const streets = useMemo(() => makeItemOptions(state.cityId != '' ? data.byId[state.cityId].streets : []), [data, state.cityId])

  return (
    <form onSubmit={onSubmit}>

      <div class="form-group">
        <label for="select1">City</label>
        <select class="form-control"
          name="cityId"
          // value={state.cityId}
          onChange={onChange}>
          {cities.map(i => (<option value={i.value} key={i.value}>{i.name}</option>))}
        </select>
        {errors && errors.cityId && <div class="text-danger small mt-2">{errors.cityId}</div>}
      </div>

      <div class="form-group">
        <label for="select2">Street</label>
        <select class="form-control"
          name="streetId"
          // value={state.streetId}
          onChange={onChange}>
          {streets.map(i => (<option value={i.value} key={i.value}>{i.name}</option>))}
        </select>
        {errors && errors.streetId && <div class="text-danger small mt-2">{errors.streetId}</div>}
      </div>

      <div class="form-group">
        <label for="address">Name</label>
        <input type="text" class="form-control"
          name="name"
          // value={state.name}
          onChange={onChange} />
        {errors && errors.name && <div class="text-danger small mt-2">{errors.name}</div>}
      </div>

      <div class="form-group">
        <label for="address">Gender</label>
        <div class="form-control">
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" id="gender-mail"
              name="gender"
              value="male"
              // checked={state.gender === 'male'}
              onClick={onChange}
            />
            <label class="form-check-label" for="gender-mail">Male</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" id="gender-female"
              name="gender"
              value="female"
              // checked={state.gender === 'female'}
              onClick={onChange}
            />
            <label class="form-check-label" for="gender-female">Female</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" id="gender-other"
              name="gender"
              value="other"
              // checked={state.gender === 'other'}
              onClick={onChange}
            />
            <label class="form-check-label" for="gender-other">Other</label>
          </div>
        </div>
        {errors && errors.gender && <div class="text-danger small mt-2">{errors.gender}</div>}
      </div>

      <div class="form-group">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" id="accepted"
            name="accepted"
            // checked={state.accepted}
            onClick={onClick}
          />
          <label class="form-check-label" for="accepted">Agree to terms and conditions</label>
          {errors && errors.accepted && <div class="text-danger small mt-2">{errors.accepted}</div>}
        </div>
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>

    </form>
  )
}