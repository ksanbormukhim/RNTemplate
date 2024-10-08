import React from 'react';
import { Text, View } from 'react-native';
import LanguageSelector from '../components/LanguageSelector';
import LoginComponent from '../components/LoginComponent';

export default function Landing() {
  return (
    <View>
      <Text>LandingApp</Text>
      <LoginComponent />
    </View>
  );
}
