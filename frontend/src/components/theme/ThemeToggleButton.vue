<template>
  <button
    type="button"
    class="cursor-pointer group relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-gradient-to-br from-amber-50 to-white text-amber-500 shadow-sm transition duration-200 hover:border-amber-200 hover:from-amber-100 hover:to-white hover:text-amber-600 hover:shadow-md dark:border-slate-700 dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-800 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:from-slate-800 dark:hover:to-slate-700 dark:hover:text-white"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="toggleTheme"
  >
    <svg
      v-if="!isDark"
      xmlns="http://www.w3.org/2000/svg"
      class="h-4 w-4 transition-transform duration-200 group-hover:rotate-12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>

    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      class="h-4 w-4 transition-transform duration-200 group-hover:-rotate-12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
    >
      <path d="M12 3a6 6 0 1 0 9 9 9 9 0 1 1-9-9" />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

const { isDark, toggleTheme } = useTheme()
</script>