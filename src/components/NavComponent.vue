<script setup>
import { useI18n } from 'vue-i18n'
import { ref, computed } from "vue";

const { t, availableLocales, locale } = useI18n()
const supportedLocales = {
  en: { name: 'English' },
  de: { name: 'Deutsch' }
}

function darken() {
  currentTheme.value = "dark";
  document.documentElement.setAttribute("data-theme", "dark");
}

function brighten() {
  currentTheme.value = "light";
  document.documentElement.setAttribute("data-theme", "light");
}

const preferredTheme = computed(() => {
  if (import.meta.client) {
    // Check if the client supports prefers-color-scheme
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }
  return "light"; // Default to light if not in client context
});

const currentTheme = ref(preferredTheme.value);

if (import.meta.client) {
  watchEffect(() => {
    document.documentElement.setAttribute("class", currentTheme.value);
  });
}


function changeLocale(locale) {
  document.documentElement.setAttribute('lang', locale)
}
</script>
<template>
  <nav>
    <ul>
      <li>
      </li>
    </ul>
    <ul>
      <li v-if="currentTheme === 'light'">
        <button role="button" :title="t('nav.toolbar.darken')" class="primary" @click="darken">
          <img
            aria-hidden="true"
            src="../assets/icons/darken.svg"
            :alt="t('nav.toolbar.darken')"
          />
          <span hidden>Darken</span>
        </button>
      </li>
      <li v-else>
        <button role="button" :title="t('nav.toolbar.brighten')" class="primary" @click="brighten">
          <img
            aria-hidden="true"
            src="../assets/icons/brighten.svg"
            :alt="t('nav.toolbar.brighten')"
          />
          <span hidden>Brighten</span>
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

button {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 2rem;
  min-height: 2rem;
  border-radius: 1rem;
}

nav {
  padding-left: var(--pico-spacing);
  padding-right: var(--pico-spacing);
}
</style>
