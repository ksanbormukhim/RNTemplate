import React from 'react';
import { useFetch } from '../hooks/useFetch';
import ErrorContainer from './ErrorContainer';
import SkeletonLoader from './SkeletonLoader';

type FetchComponentProps<T> = {
  fetchParam: {
    url: string | URL | globalThis.Request;
    init?: Omit<RequestInit, 'signal'>;
    retryCount?: number;
    timeoutDuration?: number;
    deps?: any[];
  };
  render: (data: T) => JSX.Element;
  loaderHeight?: number;
  loaderBorderRadius?: number;
  LoadingComponent?: React.FC;
  ErrorComponent?: React.FC<{ error: any; onRetry: () => void }>;
};

const FetchComponent = <T,>({
  fetchParam,
  render,
  loaderHeight = 200,
  loaderBorderRadius = 10,
  LoadingComponent = () => (
    <SkeletonLoader height={loaderHeight} borderRadius={loaderBorderRadius} />
  ),
  ErrorComponent = ({ error, onRetry }) => (
    <ErrorContainer
      message={error.message}
      height={loaderHeight}
      borderRadius={loaderBorderRadius}
      onRetry={onRetry}
    />
  ),
}: FetchComponentProps<T>) => {
  const [data, loading, error, refetch] = useFetch<T>(
    fetchParam.url,
    fetchParam.init,
    fetchParam.retryCount,
    fetchParam.timeoutDuration,
    fetchParam.deps
  );

  if (loading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <ErrorComponent error={error} onRetry={refetch} />;
  }

  if (data) {
    return render(data);
  }

  return null;
};

export default FetchComponent;
