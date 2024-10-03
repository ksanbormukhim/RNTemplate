import React from 'react';
import { Button, Text, View } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';

export default function PublicApp() {
  const { logout } = useAuthStore();

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
