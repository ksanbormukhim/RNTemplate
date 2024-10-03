import React from 'react';
import { Button, Text, View } from 'react-native';
import { useAuthStore } from '../store/useAuthStore';

export default function AdminApp() {
  const { logout } = useAuthStore();
  return (
    <View>
      <Text>AdminApp</Text>
      <Button
        title="Log Out"
        onPress={() => {
          logout();
        }}
      />
    </View>
  );
}
