import { useEffect, useState } from 'preact/hooks'

export type FetchState<T> =
  { status: 'fetching' | 'error', json: undefined } |
  { status: 'success', json: T }

export function useFetch<T>(url: string): FetchState<T> {

  const [data, setData] = useState<FetchState<T>>({ status: 'fetching', json: undefined });

  useEffect(() => {

    let mounted = true;

    async function fetchData() {
      try {
        let response = await fetch(url)
        const json = await response.json();
        if (mounted)
          setData({ status: 'success', json })
      }
      catch{
        if (mounted)
          setData({ status: 'error', json: undefined })
      }
    }

    fetchData()

    return () => { mounted = false; };
  }, [url]);

  return data;
}
