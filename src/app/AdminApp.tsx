import React from 'react';
import { Button, Text, View } from 'react-native';
import { authStore } from '../store/authStore';

export default function AdminApp() {
  const { logout } = authStore();
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
