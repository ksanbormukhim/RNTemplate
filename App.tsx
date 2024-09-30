import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

import SplashScreen from 'react-native-splash-screen';

function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <View>
        <Text>a</Text>
      </View>
    </>
  );
}
export default App;
