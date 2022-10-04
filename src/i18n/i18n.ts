import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enTranslations from './locales/en.json'
import srTranslations from './locales/sr.json'

export type TranslationKey = keyof typeof enTranslations

const supportedLocales = ['en', 'sr']

i18n
    .use(initReactI18next) // pass the i18n instance to react-i18next.
    .init({
        debug: false,
        interpolation: { escapeValue: false }, // React already does escaping
        lng: 'en',
        resources: {
            en: { translation: enTranslations },
            sr: { translation: srTranslations }
        },
        fallbackLng: 'en',
        returnEmptyString: true,
        supportedLngs: supportedLocales,
        keySeparator: false // we are working with a flat json translations file, it's recommended to set keySeparator to false
    })

export default i18n
