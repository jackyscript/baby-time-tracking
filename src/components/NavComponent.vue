<script setup>
import { useI18n } from 'vue-i18n'
import { ref, computed, watchEffect } from 'vue'

const { t, availableLocales, locale } = useI18n()
const supportedLocales = {
  en: { name: 'English' },
  de: { name: 'Deutsch' }
}

function darken() {
  currentTheme.value = 'dark'
  document.documentElement.setAttribute('data-theme', 'dark')
}

function brighten() {
  currentTheme.value = 'light'
  document.documentElement.setAttribute('data-theme', 'light')
}

const preferredTheme = computed(() => {
  if (import.meta.client) {
    // Check if the client supports prefers-color-scheme
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return 'light' // Default to light if not in client context
})

const currentTheme = ref(preferredTheme.value)

if (import.meta.client) {
  watchEffect(() => {
    document.documentElement.setAttribute('class', currentTheme.value)
  })
}

// Theme switch computed: true when theme is light, false when dark.
const themeSwitch = computed({
  get: () => currentTheme.value === 'light',
  set: (val) => {
    if (val) brighten()
    else darken()
  }
})

function changeLocale(locale) {
  document.documentElement.setAttribute('lang', locale)
}
</script>
<template>
  <nav>
    <ul>
      <li></li>
    </ul>
    <ul>
      <li>
        {{t('nav.toolbar.darken')}}
        <input name="mode" type="checkbox" role="switch" v-model="themeSwitch" />
        {{t('nav.toolbar.brighten')}}
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
nav {
  padding-left: var(--pico-spacing);
  padding-right: var(--pico-spacing);
}

/* Make spacing around the theme switch equal */
input[role="switch"] {
  margin: 0 0.5rem;
  vertical-align: middle;
}

/* Keep the list item contents aligned */
ul > li {
  display: inline-flex;
  align-items: center;
}
</style>
