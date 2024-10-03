import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import Landing from '../screens/Landing';

export default function LandingApp() {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Landing" component={Landing} />
      {/* Add more screens for LandingApp as needed */}
    </Drawer.Navigator>
  );
}
