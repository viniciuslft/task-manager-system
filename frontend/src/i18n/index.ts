import { createI18n } from 'vue-i18n'
import en from './locales/en'
import ptBR from './locales/pt-BR'
import ptPT from './locales/pt-PT'

export const SUPPORTED_LOCALES = ['en', 'pt-BR', 'pt-PT'] as const
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]

const STORAGE_KEY = 'task-manager-locale'

function isSupportedLocale(value: string): value is SupportedLocale {
  return SUPPORTED_LOCALES.includes(value as SupportedLocale)
}

function resolveInitialLocale(): SupportedLocale {
  const savedLocale = localStorage.getItem(STORAGE_KEY)

  if (savedLocale && isSupportedLocale(savedLocale)) {
    return savedLocale
  }

  const browserLocale = navigator.language.toLowerCase()

  if (browserLocale.startsWith('pt-br')) {
    return 'pt-BR'
  }

  if (browserLocale.startsWith('pt-pt') || browserLocale.startsWith('pt')) {
    return 'pt-PT'
  }

  return 'en'
}

export const i18n = createI18n({
  legacy: false,
  locale: resolveInitialLocale(),
  fallbackLocale: 'en',
  messages: {
    en,
    'pt-BR': ptBR,
    'pt-PT': ptPT,
  },
})

export function setAppLocale(locale: SupportedLocale) {
  i18n.global.locale.value = locale
  localStorage.setItem(STORAGE_KEY, locale)
}