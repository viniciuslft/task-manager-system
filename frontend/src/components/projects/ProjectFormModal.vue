<template>
  <BaseModal
    :open="open"
    title="Create new project"
    description="Add a new project to your workspace."
    @close="$emit('close')"
  >
    <form class="space-y-4" @submit.prevent="handleSubmit">
      <BaseInput
        id="project-title"
        v-model="form.name"
        label="Title"
        placeholder="Enter project title"
      />

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
      <BaseButton variant="secondary" @click="$emit('close')">
        Cancel
      </BaseButton>

      <BaseButton @click="handleSubmit">
        Create
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseModal from '@/components/base/BaseModal.vue'
import BaseSelect from '@/components/base/BaseSelect.vue'
import BaseTextarea from '@/components/base/BaseTextarea.vue'

interface Props {
  open: boolean
}

interface ProjectFormPayload {
  name: string
  description: string
  status: 'active' | 'archived'
}

defineProps<Props>()

const emit = defineEmits<{
  close: []
  submit: [payload: ProjectFormPayload]
}>()

const form = reactive<ProjectFormPayload>({
  name: '',
  description: '',
  status: 'active',
})

const statusOptions = [
  { label: 'Active', value: 'active' },
  { label: 'Archived', value: 'archived' },
] as const

function handleSubmit() {
  emit('submit', {
    name: form.name,
    description: form.description,
    status: form.status,
  })
}
</script>