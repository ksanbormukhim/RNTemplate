import {
  DrawerContent,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {
  CommonActions,
  DrawerActions,
  useLinkBuilder,
  useTheme,
} from '@react-navigation/native';
import Color from 'color';
import React, { useState } from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { DrawerConfigKey, drawerConfig } from '../../navigation/config/drawers';
import { DrawerScreenItemType, MyDrawerProp } from '../../types';
import DrawerFooter from './DrawerFooter';
import DrawerHeader from './DrawerHeader';

export default function CustomDrawer({
  drawerMap,
  props,
}: {
  drawerMap: DrawerConfigKey;
  props: DrawerContentComponentProps;
}) {
  const items = drawerConfig[drawerMap];

  // Fallback to default drawer content if no config is found
  if (!items) {
    return <DrawerContent {...props} />;
  }

  const { descriptors, state, ...rest } = props;
  const focusedRoute = state.routes[state.index];
  const focusedDescriptor = descriptors[focusedRoute.key];
  const focusedOptions = focusedDescriptor.options;
  const { drawerContentStyle, drawerContentContainerStyle } = focusedOptions;

  return (
    <>
      <DrawerHeader />
      <DrawerContentScrollView
        {...rest}
        contentContainerStyle={drawerContentContainerStyle}
        style={drawerContentStyle}
      >
        <MyDrawerItemList items={items} props={props} />
      </DrawerContentScrollView>
      <DrawerFooter />
    </>
  );
}

function MyDrawerItemList({
  items,
  props,
  myProp,
}: {
  items: DrawerScreenItemType[];
  props: DrawerContentComponentProps;
  myProp?: MyDrawerProp;
}) {
  const { state, navigation, descriptors } = props;

  const buildLink = useLinkBuilder();

  const focusedRoute = state.routes[state.index];
  const focusedDescriptor = descriptors[focusedRoute.key];
  const focusedOptions = focusedDescriptor.options;

  const {
    drawerActiveTintColor,
    drawerInactiveTintColor,
    drawerActiveBackgroundColor,
    drawerInactiveBackgroundColor,
  } = focusedOptions;

  const [openIndex, setOpenIndex] = useState(-1);

  return items.map((item, index) => {
    if ('children' in item && item.children) {
      const isOpen = openIndex === index;

      return (
        <DrawerItemGroup
          key={index}
          isOpen={isOpen}
          onPress={() => setOpenIndex(isOpen ? -1 : index)}
          item={item}
          props={props}
          myProp={myProp}
        />
      );
    }

    const route = state.routes.find(
      (element) => 'component' in item && element.name === item.component
    );

    if (!route) {
      throw new Error(
        'Cannot find route! Which is imposable!!!.\n If so please check declaration of screen config. Or if you have define the route in the Navigator'
      );
    }

    const focused: boolean = focusedRoute.key === route.key;

    const onPress = () => {
      const event = navigation.emit({
        type: 'drawerItemPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (!event.defaultPrevented) {
        navigation.dispatch({
          ...(focused
            ? DrawerActions.closeDrawer()
            : CommonActions.navigate({ name: route.name, merge: true })),
          target: state.key,
        });
      }
    };

    const {
      title,
      drawerLabel,
      drawerIcon,
      drawerLabelStyle,
      drawerItemStyle,
      drawerAllowFontScaling,
    } = descriptors[route.key].options;

    return (
      <DrawerItem
        key={route.key}
        label={
          drawerLabel !== undefined
            ? drawerLabel
            : item.name !== undefined
            ? item.name
            : title !== undefined
            ? title
            : route.name
        }
        icon={
          drawerIcon !== undefined
            ? drawerIcon
            : ({ color, size, focused }) => (
                <Icon
                  name={item.icon}
                  color={color}
                  size={focused ? size : (size * 3) / 4}
                />
              )
        }
        focused={focused}
        activeTintColor={drawerActiveTintColor}
        inactiveTintColor={drawerInactiveTintColor}
        activeBackgroundColor={drawerActiveBackgroundColor}
        inactiveBackgroundColor={drawerInactiveBackgroundColor}
        allowFontScaling={drawerAllowFontScaling}
        labelStyle={drawerLabelStyle}
        style={[{ marginHorizontal: 0 }, drawerItemStyle]}
        to={buildLink(route.name, route.params)}
        onPress={onPress}
      />
    );
  }) as React.ReactNode as React.ReactElement;
}

function DrawerItemGroup({
  isOpen,
  onPress,
  item,
  props,
  myProp,
}: {
  isOpen: boolean;
  onPress: (event: GestureResponderEvent) => void;
  item: DrawerScreenItemType;
  props: DrawerContentComponentProps;
  myProp?: MyDrawerProp;
}) {
  const { colors } = useTheme();

  const {
    labelStyle,
    allowFontScaling,
    activeTintColor = colors.primary,
    inactiveTintColor = Color(colors.text).alpha(0.68).rgb().string(),
    activeBackgroundColor = Color(activeTintColor).alpha(0.12).rgb().string(),
    inactiveBackgroundColor = 'transparent',
    style,
    testID,
    accessibilityLabel,
  } = myProp || {};

  const { borderRadius = 4 } = StyleSheet.flatten(style || {});
  const color = isOpen ? activeTintColor : inactiveTintColor;
  const backgroundColor = isOpen
    ? activeBackgroundColor
    : inactiveBackgroundColor;

  return (
    <View
      collapsable={false}
      style={[styles.container, { borderRadius, backgroundColor }, style]}
    >
      <Pressable
        testID={testID}
        onPress={onPress}
        style={[
          styles.wrapper,
          { borderRadius },
          isOpen && {
            borderBottomColor: '#999',
            borderBottomWidth: 1,
            paddingVertical: 1,
          },
        ]}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        accessibilityState={{ selected: isOpen }}
        // pressColor={pressColor}
        // pressOpacity={pressOpacity}
        // to={to}
      >
        <Icon name={item.icon} size={24} />
        <View style={[styles.label, { marginLeft: 32, marginVertical: 5 }]}>
          <Text
            numberOfLines={1}
            allowFontScaling={allowFontScaling}
            style={[
              {
                color,
                fontWeight: '500',
              },
              labelStyle,
            ]}
          >
            {item.name}
          </Text>
        </View>
        <Icon
          name={
            isOpen
              ? 'arrow-down-circle-outline'
              : 'arrow-forward-circle-outline'
          }
          size={24}
        />
      </Pressable>

      {isOpen && 'children' in item && (
        <View style={{ paddingLeft: 20 }}>
          <MyDrawerItemList
            items={item.children}
            props={props}
            myProp={myProp}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    overflow: 'hidden',
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  label: {
    marginRight: 32,
    flex: 1,
  },
  button: {
    display: 'flex',
  },
});
