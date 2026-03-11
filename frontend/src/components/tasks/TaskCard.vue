<template>
  <article
    class="rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-md dark:bg-slate-950"
    :class="containerClasses"
  >
    <div class="flex items-start justify-between gap-4">
      <div class="space-y-1">
        <h3 class="text-base font-semibold text-slate-900 dark:text-slate-100">
          {{ title }}
        </h3>

        <p class="text-sm text-slate-600 dark:text-slate-400">
          {{ description || 'No description provided.' }}
        </p>
      </div>

      <div class="flex flex-col items-end gap-2">
        <span
          class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium"
          :class="statusClasses"
        >
          {{ statusLabel }}
        </span>

        <span
          class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium"
          :class="priorityClasses"
        >
          {{ priorityLabel }}
        </span>
      </div>
    </div>

    <div class="mt-4 flex items-center justify-between">
      <p class="text-sm text-slate-500 dark:text-slate-400">
        Due: {{ dueDateText }}
      </p>

      <span
        v-if="isOverdue"
        class="inline-flex items-center rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-700 dark:bg-red-950/40 dark:text-red-300"
      >
        Overdue
      </span>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  title: string
  description?: string
  status: 'todo' | 'in_progress' | 'done'
  priority: 'low' | 'medium' | 'high'
  dueDate?: string | null
  isOverdue?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  description: '',
  dueDate: null,
  isOverdue: false,
})

const statusLabel = computed(() => {
  const labels = {
    todo: 'To do',
    in_progress: 'In progress',
    done: 'Done',
  }

  return labels[props.status]
})

const priorityLabel = computed(() => {
  const labels = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
  }

  return labels[props.priority]
})

const statusClasses = computed(() => {
  const classes = {
    todo: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    in_progress: 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300',
    done: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300',
  }

  return classes[props.status]
})

const priorityClasses = computed(() => {
  const classes = {
    low: 'bg-sky-100 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300',
    medium: 'bg-violet-100 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300',
    high: 'bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300',
  }

  return classes[props.priority]
})

const containerClasses = computed(() => {
  if (props.isOverdue) {
    return 'border-red-200 dark:border-red-900/50'
  }

  return 'border-slate-200 dark:border-slate-800'
})

const dueDateText = computed(() => {
  if (!props.dueDate) return 'No due date'
  return props.dueDate
})
</script>