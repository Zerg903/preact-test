import { h } from 'preact'
import { useState } from 'preact/hooks'

export const Counter = () => {

  const [count, setCount] = useState(0)

  const increment = () => setCount(count + 1)
  const decrement = () => setCount((currentCount) => currentCount - 1)

  return (
    <div class="d-flex justify-content-start mx-3">
      <button onClick={increment} class="counter-btn btn btn-success btn-sm">+</button>
      <div class="counter-text px-2">Count: {count}</div>
      <button onClick={decrement} class="counter-btn btn btn-danger btn-sm">-</button>
    </div>
  )
}
