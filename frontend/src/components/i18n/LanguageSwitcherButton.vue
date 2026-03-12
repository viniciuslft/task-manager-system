<template>
  <button
    type="button"
    class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-100"
    :aria-label="ariaLabel"
  >
    <span class="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
      Lang
    </span>
    <span>{{ locale }}</span>
  </button>
</template>

<script setup lang="ts">
interface Props {
  locale?: string
  ariaLabel?: string
}

withDefaults(defineProps<Props>(), {
  locale: 'EN',
  ariaLabel: 'Change language',
})
</script>