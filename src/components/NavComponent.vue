<script setup>
import { useI18n } from 'vue-i18n'
const { t, availableLocales, locale } = useI18n()
const supportedLocales = {
  en: { name: 'English' },
  de: { name: 'Deutsch' }
}
</script>
<template>
  <nav>
    <ul>
      <li>
        <strong>{{ t('nav.title') }}</strong>
      </li>
    </ul>
    <ul>
      <li>
        <select name="locales" id="locales" v-model="locale">
          <option
            v-for="(availableLocale, index) in availableLocales"
            :key="index"
            :value="availableLocale"
            :selected="availableLocale === locale"
          >
            {{ supportedLocales[availableLocale]['name'] }}
          </option>
        </select>
      </li>
    </ul>
  </nav>
</template>
