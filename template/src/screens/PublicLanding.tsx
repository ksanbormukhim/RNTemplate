import React from 'react';
import { Button, Text, View } from 'react-native';
import FetchComponent from '../components/FetchComponent';
import { authStore } from '../store/authStore';

export default function PublicLanding() {
  const { logout } = authStore();

  // const [data, loading, error] = useFetch<any>([
  //   {
  //     url: 'https://jsonplaceholder.org/comments',
  //     init: {},
  //   },
  //   {
  //     url: 'https://jsonplaceholder.org/users',
  //     init: {},
  //   },
  //   {
  //     url: 'https://jsonplaceholder.typicode.com/posts/999',
  //     init: {},
  //   },
  // ]);

  // console.log(loading, error, data);
  // const [comments, user] = data;

  return (
    <View>
      <Text>PublicApp</Text>

      <Button
        title="Log Out"
        onPress={() => {
          logout();
        }}
      />

      {/* {loading && (
        <>
          <SkeletonLoader visible={loading} message={`${loading}`} />
          <Text>{`${loading}`}</Text>
        </>
      )}

      {error && (
        <>
          <ErrorContainer message={error.message} />
        </>
      )}

      {data.length > 0 && (
        <>
          <Text>{JSON.stringify(data)}</Text>
        </>
      )} */}

      {/* <FetchComponent
        fetchParam={{ url: 'url' }}
        render={(data) => {
          if (data) console.log('users', data);
          return <Text>{JSON.stringify(data)}</Text>;
        }}
      /> */}

      {/* <SkeletonLoader visible /> */}
      {/* <ErrorContainer /> */}
      <FetchComponent
        requests={[
          { url: 'https://jsonplaceholder.org/users' },
          { url: 'https://jsonplaceholder.org/comments' },
          // { url: 'https://jsonplaceholder.typicode.com/posts/999' },
        ]}
        render={(data) => {
          if (data) console.log('users', data);
          return <Text>{JSON.stringify(data)}</Text>;
        }}
      />
    </View>
  );
}
