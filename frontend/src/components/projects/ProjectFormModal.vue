<template>
  <BaseModal
    :open="open"
    title="Create new project"
    description="Add a new project to your workspace."
    @close="$emit('close')"
  >
    <p class="text-sm text-slate-600 dark:text-slate-400">
      Project form placeholder
    </p>

    <template #actions>
      <BaseButton variant="secondary" @click="$emit('close')">
        Cancel
      </BaseButton>

      <BaseButton>
        Create
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue'
import BaseModal from '@/components/base/BaseModal.vue'

interface Props {
  open: boolean
}

defineProps<Props>()

defineEmits<{
  close: []
}>()
</script>