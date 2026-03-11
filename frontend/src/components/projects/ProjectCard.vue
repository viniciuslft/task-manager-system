<template>
  <article
    class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-950"
  >
    <div class="flex items-start justify-between gap-4">
      <div class="space-y-1">
        <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
          {{ name }}
        </h3>

        <p class="text-sm text-slate-600 dark:text-slate-400">
          {{ description || 'No description provided.' }}
        </p>
      </div>

      <span
        class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium"
        :class="statusClasses"
      >
        {{ statusLabel }}
      </span>
    </div>

    <div class="mt-4 flex items-center justify-between">
      <p class="text-sm text-slate-500 dark:text-slate-400">
        {{ tasksCount }} tasks
      </p>

      <button
        type="button"
        class="text-sm font-medium text-violet-600 transition hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
      >
        View details
      </button>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  name: string
  description?: string
  status: 'active' | 'archived'
  tasksCount: number
}

const props = defineProps<Props>()

const statusLabel = computed(() => {
  if (props.status === 'active') return 'Active'
  return 'Archived'
})

const statusClasses = computed(() => {
  if (props.status === 'active') {
    return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
  }

  return 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
})
</script>