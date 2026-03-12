<template>
  <button
    type="button"
    class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-100"
    :aria-label="t('common.language')"
    @click="toggleLocale"
  >
    <span class="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
      {{ t('common.language') }}
    </span>
    <span>{{ localeLabel }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocale } from '@/composables/useLocale'

const { t } = useI18n()
const { locale, toggleLocale } = useLocale()

const localeLabel = computed(() => (locale.value === 'en' ? 'EN' : 'PT-BR'))
</script>