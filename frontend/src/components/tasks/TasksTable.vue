<template>
  <div
    class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950"
  >
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
        <thead class="bg-slate-50 dark:bg-slate-900">
          <tr>
            <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Title
            </th>
            <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Priority
            </th>
            <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Due date
            </th>
            <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Status
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
          <tr
            v-for="task in tasks"
            :key="task.id"
            class="transition hover:bg-slate-50 dark:hover:bg-slate-900/60"
            :class="task.is_overdue ? 'bg-red-50/40 dark:bg-red-950/10' : ''"
          >
            <td class="px-4 py-4">
              <div class="space-y-1">
                <p class="font-medium text-slate-900 dark:text-slate-100">
                  {{ task.title }}
                </p>
                <p class="text-sm text-slate-500 dark:text-slate-400">
                  {{ task.description || 'No description provided.' }}
                </p>
                <BaseBadge
                  v-if="task.is_overdue"
                  variant="danger"
                >
                  Overdue
                </BaseBadge>
              </div>
            </td>

            <td class="px-4 py-4">
              <BaseBadge :variant="priorityVariant(task.priority)">
                {{ priorityLabel(task.priority) }}
              </BaseBadge>
            </td>

            <td class="px-4 py-4 text-sm text-slate-600 dark:text-slate-300">
              {{ task.due_date || 'No due date' }}
            </td>

            <td class="px-4 py-4">
              <BaseSelect
                :model-value="task.status"
                :options="statusOptions"
                @update:model-value="handleStatusChange(task.id, $event)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseBadge from '@/components/base/BaseBadge.vue'
import BaseSelect from '@/components/base/BaseSelect.vue'
import type { TaskDto } from '@/services/tasks'

interface Props {
  tasks: TaskDto[]
}

defineProps<Props>()

const emit = defineEmits<{
  'status-change': [payload: { id: number; status: 'todo' | 'in_progress' | 'done' }]
}>()

const statusOptions = [
  { label: 'To do', value: 'todo' },
  { label: 'In progress', value: 'in_progress' },
  { label: 'Done', value: 'done' },
]

function priorityLabel(priority: TaskDto['priority']) {
  const labels = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
  }

  return labels[priority]
}

function priorityVariant(priority: TaskDto['priority']) {
  const variants = {
    low: 'info',
    medium: 'violet',
    high: 'rose',
  } as const

  return variants[priority]
}

function handleStatusChange(id: number, value: string) {
  emit('status-change', {
    id,
    status: value as 'todo' | 'in_progress' | 'done',
  })
}
</script>