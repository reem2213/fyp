import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

const resources = {
  en: {
    translation: {
      welcome: 'Welcome',
      // Add other keys and translations here
    },
  },
  fr: {
    translation: {
      welcome: 'Bienvenue',
      // Add other keys and translations here
    },
  },
  // Add more languages here
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: RNLocalize.getLocales()[0].languageTag, // Detect device language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
