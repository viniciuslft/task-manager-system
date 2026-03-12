import { computed } from 'vue'
import { i18n, setAppLocale, SUPPORTED_LOCALES, type SupportedLocale } from '@/i18n'

export function useLocale() {
  const locale = computed(() => i18n.global.locale.value as SupportedLocale)

  function setLocale(value: SupportedLocale) {
    setAppLocale(value)
  }

  function toggleLocale() {
    const currentIndex = SUPPORTED_LOCALES.indexOf(locale.value)
    const nextIndex = (currentIndex + 1) % SUPPORTED_LOCALES.length
    const nextLocale = SUPPORTED_LOCALES[nextIndex] as SupportedLocale

    setLocale(nextLocale)
  }

  return {
    locale,
    setLocale,
    toggleLocale,
    supportedLocales: SUPPORTED_LOCALES,
  }
}