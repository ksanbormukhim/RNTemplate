import React, { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import { SafeAreaView } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AdminApp from './src/app/AdminApp';
import LandingApp from './src/app/LandingApp';
import PublicApp from './src/app/PublicApp';
import Modals from './src/components/Modals';
import { AuthState, authStore } from './src/store/authStore';
import i18n from './src/utils/i18n';

function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      {/* <AuthProvider> */}
      <SafeAreaView style={{ flex: 1 }}>
        <Root />
        <Modals />
      </SafeAreaView>
      {/* </AuthProvider> */}
    </I18nextProvider>
  );
}
export default App;

function Root() {
  // const { authState } = useAuth();
  const { authState } = authStore();

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
}
