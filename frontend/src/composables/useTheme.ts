import { computed, ref } from 'vue'

type Theme = 'light' | 'dark'

const STORAGE_KEY = 'task-manager-theme'
const theme = ref<Theme>('light')

function applyTheme(value: Theme) {
  const root = document.documentElement

  if (value === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}

function resolveInitialTheme(): Theme {
  const savedTheme = localStorage.getItem(STORAGE_KEY)

  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme
  }

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

function setTheme(value: Theme) {
  theme.value = value
  localStorage.setItem(STORAGE_KEY, value)
  applyTheme(value)
}

function toggleTheme() {
  setTheme(theme.value === 'dark' ? 'light' : 'dark')
}

function initTheme() {
  const initialTheme = resolveInitialTheme()
  theme.value = initialTheme
  applyTheme(initialTheme)
}

export function useTheme() {
  const isDark = computed(() => theme.value === 'dark')

  return {
    theme,
    isDark,
    initTheme,
    setTheme,
    toggleTheme,
  }
}