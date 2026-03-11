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
            Task Manager
          </p>
          <p class="truncate text-xs text-slate-500 dark:text-slate-400">
            Project workspace
          </p>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-100"
        >
          <span class="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Lang
          </span>
          <span>EN</span>
        </button>

        <ThemeToggleButton />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
  import ThemeToggleButton from '@/components/theme/ThemeToggleButton.vue'
</script>