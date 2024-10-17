import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { Text, View } from 'react-native';
import CustomDrawer from '../components/drawers/CustomDrawer';
import Landing from '../screens/Landing';

export default function LandingDrawerNavigator() {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawer props={props} drawerMap="landingDrawer" />
      )}
    >
      <Drawer.Screen name="Landing" component={Landing} />
      <Drawer.Screen name="Screen1" component={Screen1} />
      <Drawer.Screen name="Map" component={Screen1} />
    </Drawer.Navigator>
  );
}

const Screen1 = () => {
  return (
    <View>
      <Text>Screen 1</Text>
    </View>
  );
};
