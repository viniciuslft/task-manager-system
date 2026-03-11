<template>
  <BaseModal
    :open="open"
    title="Create new project"
    description="Add a new project to your workspace."
    @close="handleClose"
  >
    <form class="space-y-4" @submit.prevent="handleSubmit">
      <BaseInput
        id="project-title"
        v-model="form.name"
        label="Title"
        placeholder="Enter project title"
      />

      <p v-if="errors.name" class="text-sm text-red-600 dark:text-red-400">
        {{ errors.name }}
      </p>

      <BaseTextarea
        id="project-description"
        v-model="form.description"
        label="Description"
        placeholder="Describe the project"
      />

      <BaseSelect
        id="project-status"
        v-model="form.status"
        label="Status"
        :options="statusOptions"
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

export interface ProjectFormPayload {
  name: string
  description: string
  status: 'active' | 'archived'
}

const props = withDefaults(defineProps<Props>(), {
  submitting: false,
})

const emit = defineEmits<{
  close: []
  submit: [payload: ProjectFormPayload]
}>()

const form = reactive<ProjectFormPayload>({
  name: '',
  description: '',
  status: 'active',
})

const errors = reactive({
  name: '',
})

const statusOptions = [
  { label: 'Active', value: 'active' },
  { label: 'Archived', value: 'archived' },
] as const

function resetForm() {
  form.name = ''
  form.description = ''
  form.status = 'active'
  errors.name = ''
}

function validateForm() {
  errors.name = ''

  if (!form.name.trim()) {
    errors.name = 'Project title is required.'
    return false
  }

  return true
}

function handleSubmit() {
  if (!validateForm()) return

  emit('submit', {
    name: form.name.trim(),
    description: form.description.trim(),
    status: form.status,
  })
}

function handleClose() {
  resetForm()
  emit('close')
}

watch(
  () => props.open,
  (isOpen) => {
    if (!isOpen) {
      resetForm()
    }
  },
)
</script>