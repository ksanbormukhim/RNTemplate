import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Text, View } from 'react-native';
import LanguageSelector from '../components/LanguageSelector';
import { useAuthStore } from '../store/authStore';

export default function AdminLanding() {
  const { logout } = useAuthStore();
  const { t } = useTranslation();

  return (
    <View>
      <Text>AdminApp</Text>

      <View style={{ padding: 20 }}>
        <LanguageSelector />
        <Text style={{ marginTop: 20 }}>
          {t('welcome', { name: 'John Doe' })}
        </Text>
        <Text>{t('greeting', { name: 'Alice' })}</Text>
        <Text>{t('appNameFull')}</Text>
      </View>

      <Button
        title="Log Out"
        onPress={() => {
          logout();
        }}
      />
    </View>
  );
}
