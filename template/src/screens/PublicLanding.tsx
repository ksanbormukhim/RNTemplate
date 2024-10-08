import React from 'react';
import { ActivityIndicator, Button, Text, View } from 'react-native';
import { authStore } from '../store/authStore';
import { useFetch } from '../utils/useFetch';

export default function PublicLanding() {
  const { logout } = authStore();

  // if (loading) return <ActivityIndicator size="large" />;
  // if (error) return <Text>Error: {error}</Text>;

  return (
    <View>
      <Text>PublicApp</Text>

      <Button
        title="Log Out"
        onPress={() => {
          logout();
        }}
      />
      <AaA key={1} />
      <BaA />
    </View>
  );
}

function AaA() {
  const [data2, loading2, error2] = useFetch<any>(
    'https://jsonplaceholder.org/comments'
  );

  if (data2)
    console.log('comments', data2, `loading: ${loading2}`, `error: ${error2}`);

  return (
    <View>
      <Text>PublicApp</Text>

      {loading2 && (
        <>
          <ActivityIndicator size="large" />
          <Text>Loading 2</Text>
        </>
      )}

      {error2 && (
        <>
          <Text>Error 2</Text>
        </>
      )}
      {/* {data2 && <>{console.log('comments', data2)}</>} */}
      <Text>AaA</Text>
    </View>
  );
}

function BaA() {
  const [data, loading, error, refresh, abort] = useFetch(
    'https://jsonplaceholder.org/users'
  );

  if (data)
    console.log('users', data, `loading: ${loading}`, `error: ${error}`);

  return (
    <View>
      <Text>PublicApp</Text>

      {loading && (
        <>
          <ActivityIndicator size="large" />
          <Text>Loading 1</Text>
        </>
      )}

      {error && (
        <>
          <Text>Error 1</Text>
        </>
      )}
      {/* {data && <>{console.log('comments', data)}</>} */}
      <Text>BaA</Text>
    </View>
  );
}
