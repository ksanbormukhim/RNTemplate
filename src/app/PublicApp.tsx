import React from 'react';
import { Button, Text, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function PublicApp() {
  const { logout } = useAuth();

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
