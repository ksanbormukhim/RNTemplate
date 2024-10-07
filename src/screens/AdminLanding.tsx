import React from 'react';
import { Button, Text, View } from 'react-native';
import { authStore } from '../store/authStore';
import LanguageSelector from '../components/LanguageSelector';

export default function AdminLanding() {
  const { logout } = authStore();

  return (
    <View>
      <Text>AdminApp</Text>
      <LanguageSelector />
      <Button
        title="Log Out"
        onPress={() => {
          logout();
        }}
      />
    </View>
  );
}
