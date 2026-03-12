<template>
  <RouterLink
    :to="to"
    class="inline-flex w-fit items-center gap-2 rounded-lg px-2 py-1 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-violet-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-violet-400"
  >
    <span aria-hidden="true">←</span>
    <span>{{ label }}</span>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

interface Props {
  to: string
  label?: string
}

withDefaults(defineProps<Props>(), {
  label: 'Back',
})
</script>