<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import LanguageSwitcherButton from '@/components/i18n/LanguageSwitcherButton.vue'
import ThemeToggleButton from '@/components/theme/ThemeToggleButton.vue'

const { t } = useI18n()
</script>

<template>
  <header
    class="sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/90"
  >
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
      <div class="flex items-center gap-3">
        <div
          class="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-600 text-sm font-bold text-white shadow-sm ring-1 ring-violet-500/20"
        >
          TM
        </div>

        <div class="min-w-0">
          <p class="truncate text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            {{ t('app.title') }}
          </p>
          <p class="truncate text-xs text-slate-500 dark:text-slate-400">
            {{ t('app.subtitle') }}
          </p>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <LanguageSwitcherButton />
        <ThemeToggleButton />
      </div>
    </div>
  </header>
</template>