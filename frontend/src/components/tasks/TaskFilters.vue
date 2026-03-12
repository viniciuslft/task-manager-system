<template>
  <div
    class="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-lg dark:border-slate-800 dark:bg-slate-950 md:flex-row md:items-end"
  >
    <div class="grid flex-1 gap-3 md:grid-cols-2">
      <BaseSelect
        id="task-status-filter"
        :label="t('tasks.statusField')"
        :model-value="status"
        :options="statusOptions"
        @update:model-value="$emit('update:status', $event)"
      />

      <BaseSelect
        id="task-priority-filter"
        :label="t('tasks.priorityField')"
        :model-value="priority"
        :options="priorityOptions"
        @update:model-value="$emit('update:priority', $event)"
      />
    </div>

    <div class="flex items-center gap-2">
      <BaseButton variant="secondary" @click="$emit('reset')">
        {{ t('common.reset') }}
      </BaseButton>

      <BaseButton @click="$emit('create-task')">
        {{ t('tasks.newTask') }}
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseSelect from '@/components/base/BaseSelect.vue'

interface Props {
  status: string
  priority: string
}

defineProps<Props>()

defineEmits<{
  'update:status': [value: string]
  'update:priority': [value: string]
  reset: []
  'create-task': []
}>()

const { t } = useI18n()

const statusOptions = computed(() => [
  { label: t('tasks.allStatuses'), value: '' },
  { label: t('tasks.todo'), value: 'todo' },
  { label: t('tasks.inProgress'), value: 'in_progress' },
  { label: t('tasks.done'), value: 'done' },
])

const priorityOptions = computed(() => [
  { label: t('tasks.allPriorities'), value: '' },
  { label: t('tasks.low'), value: 'low' },
  { label: t('tasks.medium'), value: 'medium' },
  { label: t('tasks.high'), value: 'high' },
])
</script>