import React, { ComponentType, useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

interface FetchOptions extends RequestInit {
  // You can define any additional options specific to your needs
}

interface UrlOption {
  url: string;
  options?: FetchOptions;
}

interface WithFetchProps {
  data: any[]; // Adjust the type according to your data structure
}

const withFetch = <P extends object>(
  WrappedComponent: ComponentType<P & WithFetchProps>,
  urlOptions: UrlOption[]
) => {
  const HOC: React.FC<Omit<P, keyof WithFetchProps>> = (props) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const responses = await Promise.all(
            urlOptions.map(({ url, options }) => fetch(url, options))
          );
          const jsonData = await Promise.all(
            responses.map((response) => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
          );
          setData(jsonData);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [urlOptions]);

    if (loading) {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }

    if (error) {
      return (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text>Error: {error}</Text>
        </View>
      );
    }

    return <WrappedComponent data={data} {...(props as P)} />;
  };

  return HOC;
};

export default withFetch;
