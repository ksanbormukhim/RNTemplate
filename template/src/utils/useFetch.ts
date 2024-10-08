import { useCallback, useEffect, useState } from 'react';

const useFetch = <T = unknown>(
  url: string | URL | globalThis.Request,
  init?: Omit<RequestInit, 'signal'>,
  deps: any[] = []
): [T | null, boolean, string | null, () => void, () => void] => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [abortController] = useState(new AbortController());
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        ...init,
        signal: abortController.signal,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const contentType = response.headers.get('Content-Type');
      let result: T | Record<string, unknown> | null = null;

      if (contentType && contentType.includes('application/json')) {
        result = (await response.json()) as T;
      } else {
        const textResponse = await response.text();
        result = textResponse as unknown as T;
      }

      setData(result);
    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.log('Fetch aborted'); // Optional: Log fetch abort
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  }, [...deps, url, init, abortController]);

  const abort = useCallback(() => {
    abortController.abort();
  }, [abortController]);

  useEffect(() => {
    if (url) {
      fetchData();
    }

    return () => {
      abort();
      setData(null);
      setLoading(false);
      setError(null);
    };
  }, [url, fetchData, abort]);

  return [data, loading, error, fetchData, abort];
};

export { useFetch };
