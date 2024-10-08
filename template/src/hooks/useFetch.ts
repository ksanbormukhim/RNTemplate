import { useCallback, useEffect, useRef, useState } from 'react';

// Custom hook for fetching data
const useFetch = <T>(
  url: string | URL | globalThis.Request,
  init?: Omit<RequestInit, 'signal'>,
  retryCount = 3, // Default number of retries
  timeoutDuration = 5000, // Default timeout duration
  deps: any[] = []
): [T | null, boolean, string | null, () => void, () => void] => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null); // Use useRef to store AbortController

  const fetchData = useCallback(async () => {
    abortControllerRef.current = new AbortController(); // Create a new AbortController for this request
    setLoading(true);
    setError(null);

    const timeoutId = setTimeout(
      () => abortControllerRef.current?.abort(), // Abort if timeout occurs
      timeoutDuration
    );

    const fetchWithRetry = async (retries: number): Promise<void> => {
      try {
        const response = await fetch(url, {
          ...init,
          signal: abortControllerRef.current?.signal, // Use the signal from the ref
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
        if (err.name === 'AbortError') {
          console.log('Fetch aborted');
        } else if (retries > 0) {
          console.log(`Retrying... Attempts left: ${retries}`);
          await fetchWithRetry(retries - 1); // Retry the fetch
        } else {
          setError(err.message);
        }
      } finally {
        clearTimeout(timeoutId); // Clear the timeout
        setLoading(false); // Set loading to false
      }
    };

    await fetchWithRetry(retryCount); // Call the retry function

    return () => {
      abortControllerRef.current?.abort(); // Cleanup abort controller on unmount
    };
  }, [url, init, retryCount, timeoutDuration, ...deps]);

  const abort = useCallback(() => {
    abortControllerRef.current?.abort(); // Abort fetch if needed
  }, []);

  useEffect(() => {
    if (url) {
      fetchData(); // Fetch data
    }

    return () => {
      abort(); // Cleanup on unmount
    };
  }, [url, fetchData, ...deps]);

  return [data, loading, error, fetchData, abort]; // Return fetch function for manual refresh
};

export { useFetch };
