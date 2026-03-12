import { computed } from 'vue'
import { i18n, setAppLocale, type SupportedLocale } from '@/i18n'

export function useLocale() {
  const locale = computed(() => i18n.global.locale.value as SupportedLocale)

  function setLocale(value: SupportedLocale) {
    setAppLocale(value)
  }

  function toggleLocale() {
    setLocale(locale.value === 'en' ? 'pt-BR' : 'en')
  }

  return {
    locale,
    setLocale,
    toggleLocale,
  }
}