<template>
  <div
    class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950"
  >
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
        <thead class="bg-slate-50 dark:bg-slate-900">
          <tr>
            <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {{ t('table.title') }}
            </th>
            <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {{ t('table.priority') }}
            </th>
            <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {{ t('table.dueDate') }}
            </th>
            <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              {{ t('table.status') }}
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
                  {{ task.description || t('common.noDescription') }}
                </p>
                <BaseBadge
                  v-if="task.is_overdue"
                  variant="danger"
                >
                  {{ t('tasks.overdue') }}
                </BaseBadge>
              </div>
            </td>

            <td class="px-4 py-4">
              <BaseBadge :variant="priorityVariant(task.priority)">
                {{ priorityLabel(task.priority) }}
              </BaseBadge>
            </td>

            <td class="px-4 py-4 text-sm text-slate-600 dark:text-slate-300">
              {{ task.due_date ? formatDate(task.due_date) : t('common.noDueDate') }}
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
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseBadge from '@/components/base/BaseBadge.vue'
import BaseSelect from '@/components/base/BaseSelect.vue'
import type { TaskDto } from '@/services/tasks'
import { useLocale } from '@/composables/useLocale'

const { formatDate } = useLocale()

interface Props {
  tasks: TaskDto[]
}

defineProps<Props>()

const emit = defineEmits<{
  'status-change': [payload: { id: number; status: 'todo' | 'in_progress' | 'done' }]
}>()

const { t } = useI18n()

const statusOptions = computed(() => [
  { label: t('tasks.todo'), value: 'todo' },
  { label: t('tasks.inProgress'), value: 'in_progress' },
  { label: t('tasks.done'), value: 'done' },
])

function priorityLabel(priority: TaskDto['priority']) {
  const labels = {
    low: t('tasks.low'),
    medium: t('tasks.medium'),
    high: t('tasks.high'),
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