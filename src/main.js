import './assets/pico.indigo.min.css'

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import Notifications from '@kyvg/vue3-notification'
import App from './App.vue'

import { appLocale, EN_Language as fallbackLocale, en, de } from './utils/locale.js'

// configure i18n
const i18n = createI18n({
  locale: appLocale ? appLocale : fallbackLocale,
  legacy: false,
  fallbackLocale: fallbackLocale,
  messages: { en, de }
})
const app = createApp(App)
app.use(i18n)
app.use(Notifications)
app.mount('#app')
