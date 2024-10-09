import { useCallback, useEffect, useRef, useState } from 'react';

const useFetch = <T>(
  url: string | URL | globalThis.Request,
  init?: Omit<RequestInit, 'signal'>,
  retryCount = 1,
  timeoutDuration = 5000,
  deps: any[] = []
): [T | null, boolean, any | null, () => void, () => void] => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async () => {
    abortControllerRef.current = new AbortController();
    setLoading(true);
    setError(null);

    const timeoutId = setTimeout(
      () => abortControllerRef.current?.abort(),
      timeoutDuration
    );

    const fetchWithRetry = async (retries: number): Promise<void> => {
      try {
        const response = await fetch(url, {
          ...init,
          signal: abortControllerRef.current?.signal,
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const contentType = response.headers.get('Content-Type');
        let result: T | Record<string, any> | null = null;

        // Handle JSON response
        if (contentType && contentType.includes('application/json')) {
          result = (await response.json()) as T;
        } else {
          // Handle non-JSON response
          const textResponse = await response.text();
          result = textResponse as any as T;
        }

        setData(result);
      } catch (err: any) {
        if (retries > 0) {
          console.log(`Retrying... Attempts left: ${retries}`);
          await fetchWithRetry(retries - 1);
        } else if (err.name === 'AbortError') {
          err.message = 'Operation Aborted because of Timeout';
          setError(err);
        } else {
          setError(err);
        }
      } finally {
        clearTimeout(timeoutId);
        setLoading(false);
      }
    };

    await fetchWithRetry(retryCount);
    return () => {
      abortControllerRef.current?.abort();
    };
  }, [url, init, retryCount, timeoutDuration, ...deps]);

  const abort = useCallback(() => {
    abortControllerRef.current?.abort();
  }, []);

  useEffect(() => {
    if (url) {
      fetchData();
    }

    return () => {
      abort();
    };
  }, [url, fetchData, ...deps]);

  return [data, loading, error, fetchData, abort];
};

export { useFetch };
