import {
  DrawerContent,
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import React from 'react';
import { drawerConfig, DrawerConfigKey } from '../../config/drawers';
import MyDrawerItemList from './MyDrawerItemList';

interface CustomDrawerProps {
  drawerMap: DrawerConfigKey;
  props: DrawerContentComponentProps;
}

export default function CustomDrawer({ drawerMap, props }: CustomDrawerProps) {
  const config = drawerConfig[drawerMap];

  // Fallback to default drawer content if no config is found
  if (!config) {
    return <DrawerContent {...props} />;
  }

  const { descriptors, state, ...rest } = props;
  const focusedRoute = state.routes[state.index];
  const focusedDescriptor = descriptors[focusedRoute.key];
  const focusedOptions = focusedDescriptor.options;
  const { drawerContentStyle, drawerContentContainerStyle } = focusedOptions;

  return (
    <DrawerContentScrollView
      {...rest}
      contentContainerStyle={drawerContentContainerStyle}
      style={drawerContentStyle}
    >
      <MyDrawerItemList items={config} props={props} />
    </DrawerContentScrollView>
  );
}
