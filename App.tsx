import React, { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import { SafeAreaView } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import AdminApp from './src/app/AdminApp';
import LandingApp from './src/app/LandingApp';
import PublicApp from './src/app/PublicApp';
import Modals from './src/components/Modals';
import { AuthProvider, AuthState, useAuth } from './src/context/AuthContext';
import i18n from './src/utils/i18n';

function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <Root />
          <Modals />
        </SafeAreaView>
      </AuthProvider>
    </I18nextProvider>
  );
}
export default App;

function Root() {
  const { authState } = useAuth();

  // useEffect(() => {
  //   // Insert a new user
  //   insertUser('John Doe', 30);

  //   // Retrieve users
  //   getUsers((users) => {
  //     console.log('Retrieved users:', users);
  //   });
  // }, []);

  // const { showLoading, hideLoading, showErrorAlert, showAlert, showToast } = useRootStore();
  // const {
  //   getLocation,
  //   startLocTracking,
  //   stopLocTracking,
  //   location,
  //   trackingLocStatus,
  // } = useLocationStore();

  // const { t } = useTranslation();

  // return (
  //   <View style={{ padding: 20 }}>
  //     <LanguageSelector />
  //     <Text style={{ marginTop: 20 }}>
  //       {t('welcome', { name: 'John Doe' })}
  //     </Text>
  //     <Text>{t('greeting', { name: 'Alice' })}</Text>
  //     <Text>{t('appNameFull')}</Text>
  //   </View>
  // );

  // return (
  //   <View>
  //     <Button title="Get Location" onPress={getLocation} />
  //     <Button title="Start Tracking" onPress={startLocTracking} />
  //     <Button title="Stop Tracking" onPress={stopLocTracking} />
  //     <Text>Status: {trackingLocStatus}</Text>
  //     {location && (
  //       <Text>
  //         Location: {location.latitude}, {location.longitude}
  //       </Text>
  //     )}
  //   </View>
  // );

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
