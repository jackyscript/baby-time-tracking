import './assets/pico.indigo.min.css'

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import Notifications from '@kyvg/vue3-notification'
import App from './App.vue'

import en from './locales/en.json'
import de from './locales/de.json'
// client language
const clientLocale =
  navigator.languages && navigator.languages.length > 0 ? navigator.languages[0] : 'en'

// configure i18n
const i18n = createI18n({
  locale: clientLocale,
  legacy: false,
  fallbackLocale: 'en',
  messages: { en, de }
})
const app = createApp(App)
app.use(i18n)
app.use(Notifications)
app.mount('#app')
