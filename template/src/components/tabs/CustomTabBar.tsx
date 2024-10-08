import { BottomTabBar, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { CommonActions } from '@react-navigation/native';
import React from 'react';
import {
  Animated,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { TabConfigKey, tabConfig } from '../../config/tabs';
import useIsKeyboardShown from '../../hooks/useIsKeyboardShown';

export default function CustomTabBar({
  props,
  tabMap,
}: {
  props: BottomTabBarProps & {
    style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;
  };
  tabMap: TabConfigKey;
}) {
  const items = tabConfig[tabMap];

  if (!items) {
    return <BottomTabBar {...props} />;
  }

  const { state, navigation, descriptors, insets, style } = props;

  const focusedRoute = state.routes[state.index];
  const focusedDescriptor = descriptors[focusedRoute.key];
  const focusedOptions = focusedDescriptor.options;

  const { tabBarHideOnKeyboard = false } = focusedOptions;

  const isKeyboardShown = useIsKeyboardShown();
  const shouldShowTabBar = !(tabBarHideOnKeyboard && isKeyboardShown);

  return (
    <View
      style={[
        tabStyle.container,
        { display: shouldShowTabBar ? 'flex' : 'none' },
      ]}
    >
      {items.map((item, index) => {
        if (item.hide) return;

        const route = state.routes.find(
          (element) => element.name === item.component
        );
        if (!route) return;

        const focused: boolean = focusedRoute.key === route?.key;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!focused && !event.defaultPrevented) {
            navigation.dispatch({
              ...CommonActions.navigate({ name: route.name, merge: true }),
              target: state.key,
            });
          }
        };

        return (
          <Pressable
            key={index}
            onPress={onPress}
            style={tabStyle.tabItem}
            android_ripple={{ color: '#3171e0', borderless: true }}
          >
            <Icon
              style={[tabStyle.iconStyle, focused && { color: '#3171e0' }]}
              name={item.icon}
            />
            <Text style={[tabStyle.textStyle, focused && { color: '#3171e0' }]}>
              {item.name}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const tabStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 5,
    backgroundColor: '#054374',
    justifyContent: 'center',
  },
  tabItem: {
    flex: 1,
  },
  textStyle: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 10,
  },
  iconStyle: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 17,
  },
});
