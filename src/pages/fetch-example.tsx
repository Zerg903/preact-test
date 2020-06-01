import { Fragment, h } from 'preact'
import { PageHeader } from '~/components/page-header'
import { useFetch } from '~/utils/use-fetch'
import { Image } from '~/models'
import { Host } from '~/config'
import { Message } from '~/components/message'
import { ImageList } from '~/components/images'

export const FetchExample = () => (
  <Fragment>
    <PageHeader text="Fetch example" />
    <ImagesContainer size={12} />
  </Fragment>
)

export const ImagesContainer = (props: { size: number }) => {

  const url = `${Host}photos`
  const state = useFetch<Image[]>(url)

  switch (state.status) {
    case 'success':
      return <ImageList items={state.json.slice(0, props.size)} />

    case 'error':
      return <Message text="errror!" type="danger" />

    default:
      return <Message text="fetching..." type="default" />
  }
}
