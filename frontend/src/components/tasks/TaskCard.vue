<template>
  <article
    class="rounded-2xl border bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md dark:bg-slate-950"
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
        <BaseBadge :variant="priorityVariant">
          {{ priorityLabel }}
        </BaseBadge>
      </div>
    </div>

    <div class="mt-4 grid gap-3 md:grid-cols-2">
      <div>
        <p class="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
          Status
        </p>

        <BaseSelect
          :model-value="status"
          :options="statusOptions"
          @update:model-value="handleStatusChange"
        />
      </div>

      <div class="flex flex-col justify-end gap-2">
        <p class="text-sm text-slate-500 dark:text-slate-400">
          Due: {{ dueDateText }}
        </p>

        <BaseBadge
          v-if="isOverdue"
          variant="danger"
        >
          Overdue
        </BaseBadge>

        <BaseBadge
          v-else
          :variant="statusVariant"
        >
          {{ statusLabel }}
        </BaseBadge>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseSelect from '@/components/base/BaseSelect.vue'
import BaseBadge from '@/components/base/BaseBadge.vue'

interface Props {
  id: number
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

const emit = defineEmits<{
  'status-change': [payload: { id: number; status: 'todo' | 'in_progress' | 'done' }]
}>()

const statusOptions = [
  { label: 'To do', value: 'todo' },
  { label: 'In progress', value: 'in_progress' },
  { label: 'Done', value: 'done' },
]

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

const statusVariant = computed(() => {
  const variants = {
    todo: 'neutral',
    in_progress: 'warning',
    done: 'success',
  } as const

  return variants[props.status]
})

const priorityVariant = computed(() => {
  const variants = {
    low: 'info',
    medium: 'violet',
    high: 'rose',
  } as const

  return variants[props.priority]
})

const containerClasses = computed(() => {
  if (props.isOverdue) {
    return 'border-red-200 hover:border-red-300 dark:border-red-900/50 dark:hover:border-red-800'
  }

  return 'border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-700'
})

const dueDateText = computed(() => {
  if (!props.dueDate) return 'No due date'
  return props.dueDate
})

function handleStatusChange(value: string) {
  emit('status-change', {
    id: props.id,
    status: value as 'todo' | 'in_progress' | 'done',
  })
}
</script>