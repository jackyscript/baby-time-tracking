import './assets/pico.indigo.min.css'

import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'

import en from './locales/en.json'
// configure i18n
const i18n = createI18n({
  locale: 'en',
  legacy: false,
  fallbackLocale: 'en',
  messages: { en }
})
const app = createApp(App)
app.use(i18n)
app.mount('#app')
