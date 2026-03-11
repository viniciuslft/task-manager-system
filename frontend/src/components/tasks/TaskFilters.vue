<template>
  <div
    class="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950 md:flex-row md:items-end"
  >
    <div class="grid flex-1 gap-3 md:grid-cols-2">
      <BaseSelect
        id="task-status-filter"
        label="Status"
        :model-value="status"
        :options="statusOptions"
        @update:model-value="$emit('update:status', $event)"
      />

      <BaseSelect
        id="task-priority-filter"
        label="Priority"
        :model-value="priority"
        :options="priorityOptions"
        @update:model-value="$emit('update:priority', $event)"
      />
    </div>

    <div class="flex items-center gap-2">
      <BaseButton variant="secondary" @click="$emit('reset')">
        Reset
      </BaseButton>

      <BaseButton @click="$emit('create-task')">
        New Task
      </BaseButton>
    </div>
  </div>
</template>

<script setup lang="ts">
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

const statusOptions = [
  { label: 'All statuses', value: '' },
  { label: 'To do', value: 'todo' },
  { label: 'In progress', value: 'in_progress' },
  { label: 'Done', value: 'done' },
]

const priorityOptions = [
  { label: 'All priorities', value: '' },
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
]
</script>