<template>
  <BaseModal
    :open="open"
    title="Create new task"
    description="Add a new task to this project."
    @close="handleClose"
  >
    <form class="space-y-4" @submit.prevent="handleSubmit">
      <BaseInput
        id="task-title"
        v-model="form.title"
        label="Title"
        placeholder="Enter task title"
      />

      <p v-if="errors.title" class="text-sm text-red-600 dark:text-red-400">
        {{ errors.title }}
      </p>

      <BaseTextarea
        id="task-description"
        v-model="form.description"
        label="Description"
        placeholder="Describe the task"
      />

      <BaseSelect
        id="task-status"
        v-model="form.status"
        label="Status"
        :options="statusOptions"
      />

      <BaseSelect
        id="task-priority"
        v-model="form.priority"
        label="Priority"
        :options="priorityOptions"
      />

      <BaseInput
        id="task-due-date"
        v-model="form.due_date"
        label="Due date"
        type="date"
      />
    </form>

    <template #actions>
      <BaseButton variant="secondary" @click="handleClose">
        Cancel
      </BaseButton>

      <BaseButton :disabled="submitting" @click="handleSubmit">
        {{ submitting ? 'Creating...' : 'Create' }}
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseModal from '@/components/base/BaseModal.vue'
import BaseSelect from '@/components/base/BaseSelect.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'

interface Props {
  open: boolean
  submitting?: boolean
}

export interface TaskFormPayload {
  title: string
  description: string
  status: 'todo' | 'in_progress' | 'done'
  priority: 'low' | 'medium' | 'high'
  due_date: string
}

const props = withDefaults(defineProps<Props>(), {
  submitting: false,
})

const emit = defineEmits<{
  close: []
  submit: [payload: TaskFormPayload]
}>()

const form = reactive<TaskFormPayload>({
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  due_date: '',
})

const errors = reactive({
  title: '',
})

const statusOptions = [
  { label: 'To do', value: 'todo' },
  { label: 'In progress', value: 'in_progress' },
  { label: 'Done', value: 'done' },
] as const

const priorityOptions = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
] as const

function resetForm() {
  form.title = ''
  form.description = ''
  form.status = 'todo'
  form.priority = 'medium'
  form.due_date = ''
  errors.title = ''
}

function validateForm() {
  errors.title = ''

  if (!form.title.trim()) {
    errors.title = 'Task title is required.'
    return false
  }

  return true
}

function handleSubmit() {
  if (!validateForm()) return

  emit('submit', {
    title: form.title.trim(),
    description: form.description.trim(),
    status: form.status,
    priority: form.priority,
    due_date: form.due_date,
  })
}

function handleClose() {
  resetForm()
  emit('close')
}

watch(
  () => props.open,
  (isOpen) => {
    if (!isOpen) resetForm()
  },
)
</script>