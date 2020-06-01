import { h } from 'preact'

type Props = {
  text: string,
  type: 'default' | 'primary' | 'danger'
}

export const Message = ({ type, text }: Props) => (
  <div class={`text-${type}`}>{text}</div>
)
