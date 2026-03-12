import { createI18n } from 'vue-i18n'
import en from './locales/en'
import ptBR from './locales/pt-BR'

export const SUPPORTED_LOCALES = ['en', 'pt-BR'] as const
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]

const STORAGE_KEY = 'task-manager-locale'

function resolveInitialLocale(): SupportedLocale {
  const savedLocale = localStorage.getItem(STORAGE_KEY)

  if (savedLocale === 'en' || savedLocale === 'pt-BR') {
    return savedLocale
  }

  const browserLocale = navigator.language

  if (browserLocale.toLowerCase().startsWith('pt-br')) {
    return 'pt-BR'
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
  },
})

export function setAppLocale(locale: SupportedLocale) {
  i18n.global.locale.value = locale
  localStorage.setItem(STORAGE_KEY, locale)
}