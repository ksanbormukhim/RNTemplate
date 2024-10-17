import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Text, View } from 'react-native';
import LanguageSelector from '../components/LanguageSelector';
import { authStore } from '../store/authStore';

export default function PublicLanding() {
  const { logout } = authStore();

  const [selectedValue, setSelectedValue] = useState('Select an option');

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
  const { t } = useTranslation();

  return (
    <View>
      <Text>PublicApp</Text>

      {/* <LanguageSelector /> */}

      {/* <SelectOption
        options={['Option 1', 'Option 2', 'Option 3', 'Option 4']}
        value={selectedValue}
        onValueSelected={setSelectedValue}
        withClearSelection
      /> */}

      <View style={{ padding: 20 }}>
        <LanguageSelector />
        <Text style={{ marginTop: 20 }}>
          {t('welcome', { name: 'John Doe' })}
        </Text>
        <Text>{t('greeting', { name: 'Alice' })}</Text>
        <Text>{t('appNameFull')}</Text>
      </View>

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
      {/* <FetchComponent
        requests={[
          { url: 'https://jsonplaceholder.org/users' },
          { url: 'https://jsonplaceholder.org/comments' },
          // { url: 'https://jsonplaceholder.typicode.com/posts/999' },
        ]}
        render={(data) => {
          if (data) console.log('users', data);
          return <Text>{JSON.stringify(data)}</Text>;
        }}
      /> */}
    </View>
  );
}
