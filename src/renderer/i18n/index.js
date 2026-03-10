import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import ur from './locales/ur.json'
import ar from './locales/ar.json'
import fa from './locales/fa.json'

const i18n = createI18n({
  legacy: false, 
  locale: 'en', // default
  fallbackLocale: 'en',
  messages: {
    en,
    ur,
    ar,
    fa
  }
})

export default i18n
