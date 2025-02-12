import React from 'react';
import { Button, ScrollView, StyleSheet } from 'react-native';

type LandingType = {
  navigation: any;
  route: any;
};

export default function Landing({ navigation }: LandingType) {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <Button
        title="Open Camera Screen"
        onPress={() => {
          navigation.navigate('Camera');
        }}
      />
      <Button
        title="Open SQLite Screen"
        onPress={() => {
          navigation.navigate('SQLiteScreen');
        }}
      />
      {/* <LoginComponent /> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
});
