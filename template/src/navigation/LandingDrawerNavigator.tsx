import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { Text, View } from 'react-native';
import CustomDrawer from '../components/drawers/CustomDrawer';

import CameraScreen from '../screens/CameraScreen';
import Landing from '../screens/Landing';
import LoginScreen from '../screens/LoginScreen';
import MapScreen from '../screens/MapScreen';
import SQLiteScreen from '../screens/SQLiteScreen';

export default function LandingDrawerNavigator() {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator
      screenOptions={
        {
          // header: (props) => <CustomHeader props={props} />,
        }
      }
      drawerContent={(props) => (
        <CustomDrawer props={props} drawerMap="landingDrawer" />
      )}
    >
      <Drawer.Screen name="Landing">
        {(props) => <Landing {...props} />}
      </Drawer.Screen>
      <Drawer.Screen name="Screen1" component={Screen1} />
      <Drawer.Screen name="Map" component={MapScreen} />
      <Drawer.Screen name="Screen2">
        {(props) => <Screen2 {...props} />}
      </Drawer.Screen>
      <Drawer.Screen name="Screen3" component={Screen3} />
      <Drawer.Screen name="Screen4" component={Screen4} />

      <Drawer.Screen name="LoginPublic">
        {(props) => <LoginScreen {...props} loginMode="public" />}
      </Drawer.Screen>
      <Drawer.Screen name="LoginAdmin">
        {(props) => <LoginScreen {...props} loginMode="admin" />}
      </Drawer.Screen>

      <Drawer.Screen name="Camera" component={CameraScreen} />
      <Drawer.Screen name="SQLiteScreen" component={SQLiteScreen} />
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

const Screen2 = (props: any) => {
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
