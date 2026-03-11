<template>
  <div
    class="rounded-2xl border px-4 py-3 text-sm shadow-sm"
    :class="alertClasses"
  >
    {{ message }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  type?: 'success' | 'error'
  message: string
}

const props = withDefaults(defineProps<Props>(), {
  type: 'success',
})

const alertClasses = computed(() => {
  if (props.type === 'error') {
    return 'border-red-200 bg-red-50 text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300'
  }

  return 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-300'
})
</script>