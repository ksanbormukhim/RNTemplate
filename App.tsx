import React, { useEffect } from 'react';

import { SafeAreaView } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AdminApp from './src/app/AdminApp';
import LandingApp from './src/app/LandingApp';
import PublicApp from './src/app/PublicApp';
import GlobalModals from './src/components/GlobalModals';
import { AuthProvider, AuthState, useAuth } from './src/context/AuthContext';
function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <AuthProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Root />
        <GlobalModals />
      </SafeAreaView>
    </AuthProvider>
  );
}
export default App;

function Root() {
  const { authState } = useAuth();

  // const { showLoading, hideLoading, showErrorAlert, showAlert, showToast } =
  //   useRootStore();

  function conditionalRender() {
    switch (authState) {
      case AuthState.public:
        return <PublicApp />;
      case AuthState.admin:
        return <AdminApp />;
      case AuthState.none:
      default:
        return <LandingApp />;
    }
  }

  return conditionalRender();

  // const handleShowLoading = () => {
  //   showLoading('Loading data...');
  //   // Simulate loading
  //   setTimeout(() => {
  //     hideLoading();
  //     showErrorAlert({
  //       message: 'Data could not be loaded.',
  //       title: 'Load Error',
  //       onOk: () => console.log('OK pressed'),
  //     });
  //   }, 2000);
  // };

  // const handleShowAlert = () => {
  //   showAlert({
  //     message: 'This is a sample alert message.',
  //     title: 'Sample Alert',
  //     onOk: () => console.log('Alert OK pressed'),
  //     onCancel: () => console.log('Alert Cancel pressed'),
  //   });
  // };

  // const handleShowToast = () => {
  //   showToast(
  //     'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi iusto vel nam! Explicabo quibusdam rerum dolores ex libero illo odit, odio ipsum illum laboriosam accusantium ullam architecto officiis amet ad. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi iusto vel nam! Explicabo quibusdam rerum dolores ex libero illo odit, odio ipsum illum laboriosam accusantium ullam architecto officiis amet ad.',
  //     10000
  //   );
  // };

  // return (
  //   <View>
  //     <Button title="Show Loading" onPress={handleShowLoading} />
  //     <Button title="Show Alert" onPress={handleShowAlert} />
  //     <Button title="Show Toast" onPress={handleShowToast} />
  //   </View>
  // );
}
