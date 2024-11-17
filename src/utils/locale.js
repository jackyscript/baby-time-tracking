import en from '../locales/en.json'
import de from '../locales/de.json'
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

export { appLocale, EN_Language, en, de }
