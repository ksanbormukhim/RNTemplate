import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomTabBar from '../components/tabs/CustomTabBar';
import AdminLanding from '../screens/AdminLanding';
import { View, Text } from 'react-native';

export default function AdminTabNavigator() {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar props={props} tabMap="adminTab" />}
    >
      <Tab.Screen name="Admin" component={AdminLanding} />
      <Tab.Screen name="Screen1" component={Screen1} />
      <Tab.Screen name="Screen2" component={Screen2} />
      <Tab.Screen name="Screen3" component={Screen3} />
    </Tab.Navigator>
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
