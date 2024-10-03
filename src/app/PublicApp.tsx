import React from 'react';
import { Button, Text, View } from 'react-native';
import { authStore } from '../store/authStore';

export default function PublicApp() {
  const { logout } = authStore();

  return (
    <View>
      <Text>PublicApp</Text>
      <Button
        title="Log Out"
        onPress={() => {
          logout();
        }}
      />
    </View>
  );
}
