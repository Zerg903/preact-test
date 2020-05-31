import { JSX } from 'preact'
import { useMemo, useState } from 'preact/hooks'

export type Action<TState> = { field: keyof TState, value: string }
export type Errors<TState> = { [key in keyof TState]?: string }
export type Validator<TState> = (state: TState, errors: Errors<TState>) => void

export const onChangeHandler = <TState>(dispatch: (action: Action<TState>) => void) => {
  return (e: JSX.TargetedEvent<HTMLElement, Event>) => {
    const target = e.target as unknown as { name: keyof TState, value: string }
    dispatch({ field: target.name, value: target.value })
  }
}

export function useSubmitHandler<TState>(state: TState, validator: Validator<TState>, submit: (state: TState) => void)
  : [Errors<TState> | null, (e: JSX.TargetedEvent<HTMLFormElement, Event>) => void] {

  const errors = useMemo(() => {
    const errors: Errors<TState> = {}
    validator(state, errors)
    return errors
  }, [state, validator])

  const [showErrors, setShowErrors] = useState(false)

  const handler = (e: JSX.TargetedEvent<HTMLFormElement, Event>) => {
    if (Object.keys(errors).length === 0)
      submit(state)
    else
      setShowErrors(true)

    e.preventDefault()
  }

  return [showErrors ? errors : null, handler]
}