import React from 'react';
import { useFetch } from '../hooks/useFetch';
import ErrorContainer from './ErrorContainer';
import SkeletonLoader from './SkeletonLoader';

const FetchComponent = <T,>({
  requests,
  deps = [],
  render,
  loaderHeight = 200,
  loaderBorderRadius = 10,
  LoadingComponent = () => (
    <SkeletonLoader height={loaderHeight} borderRadius={loaderBorderRadius} />
  ),
  ErrorComponent = ({ error }) => (
    <ErrorContainer
      message={error.message}
      height={loaderHeight}
      borderRadius={loaderBorderRadius}
    />
  ),
}: {
  requests: {
    url: string | URL | globalThis.Request;
    init?: Omit<RequestInit, 'signal'>;
  }[];
  // retryCount = 1,
  // timeoutDuration = 5000,
  deps?: any[];
  render: (data: any[]) => JSX.Element;
  loaderHeight?: number;
  loaderBorderRadius?: number;
  LoadingComponent?: React.FC;
  ErrorComponent?: React.FC<{ error: any }>;
}) => {
  const [data, loading, error] = useFetch<any>(requests, deps);

  if (loading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <ErrorComponent error={error} />;
  }

  if (data) {
    return render(data);
  }

  return null;
};

export default FetchComponent;
