import './assets/pico.indigo.min.css'

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import Notifications from '@kyvg/vue3-notification'
import App from './App.vue'

import en from './locales/en.json'
import de from './locales/de.json'
const DE_Language = 'de'
const EN_Language = 'en'
// supported languages
const supportedLanguages = [DE_Language, EN_Language]
// client language
const clientLocale =
  navigator.languages && navigator.languages.length > 0 ? navigator.languages[0] : EN_Language

const appLocale = supportedLanguages.find((supportedLanguage) =>
  clientLocale.includes(supportedLanguage)
)
// configure i18n
const i18n = createI18n({
  locale: appLocale ? appLocale : EN_Language,
  legacy: false,
  fallbackLocale: EN_Language,
  messages: { en, de }
})
const app = createApp(App)
app.use(i18n)
app.use(Notifications)
app.mount('#app')
