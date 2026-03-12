import { computed } from 'vue'
import { i18n, setAppLocale, SUPPORTED_LOCALES, type SupportedLocale } from '@/i18n'

const LOCALE_DATE_MAP: Record<SupportedLocale, string> = {
  en: 'en-US',
  'pt-BR': 'pt-BR',
  'pt-PT': 'pt-PT',
}

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

  function formatDate(value: string | null | undefined) {
    if (!value) return ''

    const localeCode = LOCALE_DATE_MAP[locale.value]
    const date = new Date(`${value}T00:00:00`)

    return new Intl.DateTimeFormat(localeCode).format(date)
  }

  return {
    locale,
    setLocale,
    toggleLocale,
    supportedLocales: SUPPORTED_LOCALES,
    formatDate,
  }
}