import { DrawerHeaderProps } from '@react-navigation/drawer';
import React from 'react';
import { Text, View } from 'react-native';

const CustomHeader = ({ props }: { props: DrawerHeaderProps }) => {
  return (
    <View>
      <Text>{props.route.name}</Text>
    </View>
  );
};

export default CustomHeader;
