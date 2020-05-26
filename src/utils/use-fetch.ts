import { useEffect, useState } from 'preact/hooks'

export type FetchState<T> =
  { status: 'fetching' | 'error', json: undefined } |
  { status: 'success', json: T }

export function useFetch<T>(url: string): FetchState<T> {

  const [data, setData] = useState<FetchState<T>>({ status: 'fetching', json: undefined });

  useEffect(() => {

    const controller = new AbortController()
    const signal = controller.signal

    fetch(url, { signal: signal })
      .then(responce => responce.json())
      .then(json => { setData({ status: 'success', json }) })
      .catch(_ => { setData({ status: 'error', json: undefined }) })

    return () => controller.abort();
  }, [url]);

  return data;
}
