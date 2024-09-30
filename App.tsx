import React, { useEffect } from 'react';

import SplashScreen from 'react-native-splash-screen';
import AdminApp from './src/app/AdminApp';
import LandingApp from './src/app/LandingApp';
import PublicApp from './src/app/PublicApp';
import { AuthProvider, AuthState, useAuth } from './src/context/AuthContext';

function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <AuthProvider>
      <Root />
    </AuthProvider>
  );
}
export default App;

function Root() {
  const { authState } = useAuth();

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
