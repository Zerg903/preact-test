import { h } from 'preact'

export const PageHeader = (props: { text: string }) => (
  <h3 class="mb-4 px-3">{props.text}</h3>
)