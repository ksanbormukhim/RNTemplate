import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n, { LanguageDetectorAsyncModule } from 'i18next';
import { initReactI18next } from 'react-i18next';
import as from '../translations/as.json';
import en from '../translations/en.json';

const languageMap = {
  en: 'English',
  as: 'Assamese',
};

const languageDetector: LanguageDetectorAsyncModule = {
  type: 'languageDetector',
  async: true,
  detect: (callback: (lng: string) => void) => {
    AsyncStorage.getItem('user-language').then((lng) => {
      callback(lng || 'en');
    });
  },
  init: () => {},
  cacheUserLanguage: (lng: string) => {
    AsyncStorage.setItem('user-language', lng);
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: en,
      },
      as: {
        translation: as,
      },
    },
    react: {
      useSuspense: false,
    },
  });

i18n.languageMap = languageMap;

export default i18n;
