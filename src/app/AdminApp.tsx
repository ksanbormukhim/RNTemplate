import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import AdminLanding from '../screens/AdminLanding';

export default function AdminApp() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Admin" component={AdminLanding} />
      {/* Add more tabs for AdminApp as needed */}
    </Tab.Navigator>
  );
}
