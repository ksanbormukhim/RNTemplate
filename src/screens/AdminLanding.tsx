import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Text, View } from 'react-native';
import { authStore } from '../store/authStore';
import LanguageSelector from '../components/LanguageSelector';

export default function AdminLanding() {
  const { logout } = authStore();
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
