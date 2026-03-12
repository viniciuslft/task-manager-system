<template>
  <BaseModal
    :open="open"
    :title="t('tasks.createTitle')"
    :description="t('tasks.createDescription')"
    @close="handleClose"
  >
    <form class="space-y-4" @submit.prevent="handleSubmit">
      <BaseInput
        id="task-title"
        v-model="form.title"
        :label="t('tasks.titleField')"
        :placeholder="t('tasks.titlePlaceholder')"
      />

      <p v-if="errors.title" class="text-sm text-red-600 dark:text-red-400">
        {{ errors.title }}
      </p>

      <BaseTextarea
        id="task-description"
        v-model="form.description"
        :label="t('tasks.descriptionField')"
        :placeholder="t('tasks.descriptionPlaceholder')"
      />

      <BaseSelect
        id="task-status"
        v-model="form.status"
        :label="t('tasks.statusField')"
        :options="statusOptions"
      />

      <BaseSelect
        id="task-priority"
        v-model="form.priority"
        :label="t('tasks.priorityField')"
        :options="priorityOptions"
      />

      <BaseInput
        id="task-due-date"
        v-model="form.due_date"
        :label="t('tasks.dueDateField')"
        type="date"
      />
    </form>

    <template #actions>
      <BaseButton variant="secondary" @click="handleClose">
        {{ t('common.cancel') }}
      </BaseButton>

      <BaseButton :disabled="submitting" @click="handleSubmit">
        {{ submitting ? t('common.creating') : t('common.create') }}
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { reactive, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'
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

const { t } = useI18n()

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

const statusOptions = computed(() => [
  { label: t('tasks.todo'), value: 'todo' },
  { label: t('tasks.inProgress'), value: 'in_progress' },
  { label: t('tasks.done'), value: 'done' },
])

const priorityOptions = computed(() => [
  { label: t('tasks.low'), value: 'low' },
  { label: t('tasks.medium'), value: 'medium' },
  { label: t('tasks.high'), value: 'high' },
])

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
    errors.title = t('tasks.titleRequired')
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