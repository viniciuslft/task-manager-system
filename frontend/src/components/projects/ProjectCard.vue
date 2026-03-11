<template>
  <article
    class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700"
  >
    <div class="flex items-start justify-between gap-4">
      <div class="space-y-1">
        <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
          {{ name }}
        </h3>

        <p class="text-sm text-slate-600 dark:text-slate-400">
          {{ description || 'No description provided.' }}
        </p>
      </div>

      <BaseBadge :variant="statusVariant">
        {{ statusLabel }}
      </BaseBadge>
    </div>

    <div class="mt-4 flex items-center justify-between">
      <p class="text-sm text-slate-500 dark:text-slate-400">
        {{ tasksCount }} tasks
      </p>

      <RouterLink
        :to="`/projects/${id}`"
        class="text-sm font-medium text-violet-600 transition hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
      >
        View details
      </RouterLink>
    </div>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import BaseBadge from '@/components/base/BaseBadge.vue'

interface Props {
  id: number
  name: string
  description?: string
  status: 'active' | 'archived'
  tasksCount: number
}

const props = defineProps<Props>()

const statusLabel = computed(() => {
  return props.status === 'active' ? 'Active' : 'Archived'
})

const statusVariant = computed(() => {
  return props.status === 'active' ? 'success' : 'neutral'
})
</script>