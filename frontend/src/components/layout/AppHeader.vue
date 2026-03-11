<template>
  <header
    class="p-4 sticky top-0 z-40 border-b border-slate-200/80 bg-white/90 backdrop-blur dark:border-slate-800/80 dark:bg-slate-950/90"
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

        <button
          type="button"
          class="group relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-gradient-to-br from-amber-50 to-white text-amber-500 shadow-sm transition duration-200 hover:border-amber-200 hover:from-amber-100 hover:to-white hover:text-amber-600 hover:shadow-md dark:border-slate-700 dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-800 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:from-slate-800 dark:hover:to-slate-700 dark:hover:text-white"
          aria-label="Toggle theme"
        >
          <svg
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
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts"></script>