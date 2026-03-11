<template>
  <header
    class="border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-950"
  >
    <div class="mx-auto flex max-w-7xl items-center justify-between">
      <div class="flex items-center gap-3">
        <div
          class="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-sm font-bold text-white"
        >
          TM
        </div>

        <div>
          <h1 class="text-base font-semibold text-slate-900 dark:text-slate-100">
            Task Manager
          </h1>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <button
          type="button"
          class="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          EN
        </button>

        <button
          type="button"
          class="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Theme
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts"></script>