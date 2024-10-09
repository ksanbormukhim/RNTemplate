import React from 'react';
import { Button, Text, View } from 'react-native';
import FetchComponent from '../components/FetchComponent';
import { authStore } from '../store/authStore';

export default function PublicLanding() {
  const { logout } = authStore();

  // const [data2, loading2, error2] = useFetch<any>(
  //   'https://jsonplaceholder.org/comments'
  // );

  // if (data2)
  //   console.log('comments', data2, `loading: ${loading2}`, `error: ${error2}`);

  // const [data, loading, error, refresh, abort] = useFetch(
  //   'https://jsonplaceholder.typicode.com/posts/999'
  // );

  // if (data)
  //   console.log('users', data, `loading: ${loading}`, `error: ${error}`);

  return (
    <View>
      <Text>PublicApp</Text>

      {/* <DefaultLoadingComponent /> */}
      {/* <SkeletonLoader height={200} borderRadius={10} />
      <ErrorContainer /> */}
      {/* <DefaultErrorComponent error={{ message: 'ss' }} /> */}

      <Button
        title="Log Out"
        onPress={() => {
          logout();
        }}
      />
      {/* {loading2 && (
        <>
          <ActivityIndicator size="large" />
          <Text>Loading 2</Text>
        </>
      )}

      {error2 && (
        <>
          <Text>Error 2</Text>
        </>
      )} */}

      <FetchComponent
        fetchParam={{ url: 'https://jsonplaceholder.typicode.com/posts/999' }}
        render={(data) => {
          if (data) console.log('users', data);
          return <Text>{JSON.stringify(data)}</Text>;
        }}
      />

      <FetchComponent
        fetchParam={{ url: 'https://jsonplaceholder.typicode.com/posts/999' }}
        render={(data) => {
          if (data) console.log('users', data);
          return <Text>{JSON.stringify(data)}</Text>;
        }}
      />

      {/* {loading && (
        <>
          <ActivityIndicator size="large" />
          <Text>Loading 1</Text>
        </>
      )}

      {error && (
        <>
          <Text>Error 1 {error.message}</Text>
        </>
      )} */}

      {/* <AaA key={1} /> */}
      {/* <BaA /> */}
    </View>
  );
}

function AaA() {
  return (
    <View>
      <Text>PublicApp</Text>

      {/* {data2 && <>{console.log('comments', data2)}</>} */}
      <Text>AaA</Text>
    </View>
  );
}

function BaA() {
  return (
    <View>
      <Text>PublicApp</Text>

      {/* {data && <>{console.log('comments', data)}</>} */}
      <Text>BaA</Text>
    </View>
  );
}
