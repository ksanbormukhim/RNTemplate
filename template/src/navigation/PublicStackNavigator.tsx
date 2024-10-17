import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import PublicLanding from '../screens/PublicLanding';

export default function PublicStackNavigator() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Public" component={PublicLanding} />
      {/* Add more screens for PublicApp as needed */}
    </Stack.Navigator>
  );
}
