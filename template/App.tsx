import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import { SafeAreaView } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AdminApp from './src/app/AdminApp';
import LandingApp from './src/app/LandingApp';
import PublicApp from './src/app/PublicApp';
import CommonUI from './src/components/CommonUI';
import { AuthState, useAuthStore } from './src/store/authStore';
import i18n from './src/translations/i18n';

function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      {/* I18nextProvider:  Language Provider*/}
      <SafeAreaView style={{ flex: 1 }}>
        <Root />
        <CommonUI />
        {/* CommonUI:  Alert And Toast Provider*/}
      </SafeAreaView>
    </I18nextProvider>
  );
}
export default App;

function Root() {
  const { authState } = useAuthStore();

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

  return <NavigationContainer>{conditionalRender()}</NavigationContainer>;
}
