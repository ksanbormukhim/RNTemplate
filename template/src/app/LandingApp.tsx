import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { Text, View } from 'react-native';
import CustomDrawer from '../components/drawers/CustomDrawer';
import Landing from '../screens/Landing';

export default function LandingApp() {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      drawerContent={(props) => (
        <CustomDrawer props={props} drawerMap="landingDrawer" />
      )}
    >
      <Drawer.Screen name="Landing" component={Landing} />
      <Drawer.Screen name="Screen1" component={Screen1} />
      <Drawer.Screen name="Screen2" component={Screen2} />
      <Drawer.Screen name="Screen3" component={Screen3} />
      <Drawer.Screen name="Screen4" component={Screen4} />
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

const Screen2 = () => {
  return (
    <View>
      <Text>Screen 2</Text>
    </View>
  );
};
const Screen3 = () => {
  return (
    <View>
      <Text>Screen 3</Text>
    </View>
  );
};
const Screen4 = () => {
  return (
    <View>
      <Text>Screen 4</Text>
    </View>
  );
};
