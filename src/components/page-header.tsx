import { h } from 'preact'

type Props = {
  text: string
}

export const PageHeader = (props: Props) => (
  <h3 class="my-4 px-3">{props.text}</h3>
)
