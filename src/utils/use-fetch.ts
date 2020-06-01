import { useEffect, useState } from 'preact/hooks'

export type FetchState<T> =
  { status: 'fetching' | 'error', json: undefined } |
  { status: 'success', json: T }

export function useFetch<T>(url: string): FetchState<T> {

  const [data, setData] = useState<FetchState<T>>({ status: 'fetching', json: undefined })

  useEffect(() => {

    const controller = new AbortController()
    const signal = controller.signal
    let mounted = true

    setData({ status: 'fetching', json: undefined })

    fetch(url, { signal })
      .then(responce => responce.json())
      .then(json => { if (mounted) setData({ status: 'success', json }) })
      .catch(() => { if (mounted) setData({ status: 'error', json: undefined }) })

    return () => {
      mounted = false
      controller.abort()
    }
  }, [url])

  return data
}
