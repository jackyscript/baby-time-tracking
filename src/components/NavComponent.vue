<script setup>
import { useI18n } from 'vue-i18n'
const { t, availableLocales, locale } = useI18n()
const supportedLocales = {
  en: { name: 'English' },
  de: { name: 'Deutsch' }
}

const colorThemeAttribute = 'data-theme'

function darken() {
  document.documentElement.setAttribute(colorThemeAttribute, 'dark')
}

function brighten() {
  document.documentElement.setAttribute(colorThemeAttribute, 'light')
}

function changeLocale(locale) {
  document.documentElement.setAttribute('lang', locale)
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
        <button role="button" :title="t('nav.toolbar.darken')" @click="darken">
          <img aria-hidden="true" src="../assets/icons/darken.svg" :alt="t('nav.toolbar.darken')" />
          <span hidden>{{ t('nav.toolbar.darken') }}</span>
        </button>
      </li>
      <li>
        <button role="button" :title="t('nav.toolbar.brighten')" @click="brighten">
          <img
            aria-hidden="true"
            src="../assets/icons/brighten.svg"
            :alt="t('nav.toolbar.brighten')"
          />
          <span hidden>{{ t('nav.toolbar.brighten') }}</span>
        </button>
      </li>
      <li>
        <select name="locales" id="locales" v-model="locale" @change="changeLocale(locale)">
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

<style scoped>
button > img {
  width: 20px;
  height: 20px;
}

nav {
  padding-left: var(--pico-spacing);
  padding-right: var(--pico-spacing);
}
</style>
