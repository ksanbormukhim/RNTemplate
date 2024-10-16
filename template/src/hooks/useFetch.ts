import { useCallback, useEffect, useMemo, useState } from 'react';

export function useFetch<T>(
  requests: {
    url: string | URL | globalThis.Request;
    init?: Omit<RequestInit, 'signal'>;
  }[],
  // retryCount = 1,
  // timeoutDuration = 5000,
  deps: any[] = []
): [T[], boolean, Error, () => void, () => void] {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  const urls = requests.map((u) => u.url);
  const memoizedRequests = useMemo(() => requests, [requests]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    setData([]);
    Promise.all(
      memoizedRequests.map((requests, index) =>
        fetch(requests.url, requests.init).then((res) => {
          if (!res.ok) {
            throw new Error(
              `Error at url index ${index}: ${res.status} ${res.statusText}`
            );
          }
          return res.json();
        })
      )
    )
      .then((res) => {
        setData(res);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [memoizedRequests]);

  useEffect(() => {
    fetchData();
  }, [...urls, ...deps]);

  return [data, loading, error, () => {}, () => {}];
}
