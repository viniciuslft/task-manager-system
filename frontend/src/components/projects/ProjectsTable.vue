<template>
  <div
    class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950"
  >
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
        <thead class="bg-slate-50 dark:bg-slate-900">
          <tr>
            <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Name
            </th>
            <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Status
            </th>
            <th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Tasks
            </th>
            <th class="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
              Actions
            </th>
          </tr>
        </thead>

        <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
          <tr
            v-for="project in projects"
            :key="project.id"
            class="transition hover:bg-slate-50 dark:hover:bg-slate-900/60"
          >
            <td class="px-4 py-4">
              <div class="space-y-1">
                <p class="font-medium text-slate-900 dark:text-slate-100">
                  {{ project.name }}
                </p>
                <p class="text-sm text-slate-500 dark:text-slate-400">
                  {{ project.description || 'No description provided.' }}
                </p>
              </div>
            </td>

            <td class="px-4 py-4">
              <BaseBadge :variant="project.status === 'active' ? 'success' : 'neutral'">
                {{ project.status === 'active' ? 'Active' : 'Archived' }}
              </BaseBadge>
            </td>

            <td class="px-4 py-4 text-sm text-slate-600 dark:text-slate-300">
              {{ project.tasks_count }}
            </td>

            <td class="px-4 py-4 text-right">
              <RouterLink
                :to="`/projects/${project.id}`"
                class="text-sm font-medium text-violet-600 transition hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300"
              >
                View details
              </RouterLink>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import BaseBadge from '@/components/base/BaseBadge.vue'
import type { ProjectDto } from '@/services/projects'

interface Props {
  projects: ProjectDto[]
}

defineProps<Props>()
</script>