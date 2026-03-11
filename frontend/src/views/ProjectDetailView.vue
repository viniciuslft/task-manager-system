<template>
  <AppShell>
    <div class="space-y-6">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Project details page
        </h1>
        <p class="text-sm text-slate-600 dark:text-slate-400">
          Tasks and project details will be rendered here.
        </p>
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        <TaskCard
          title="Design login screen"
          description="Create the first version of the login page UI."
          status="todo"
          priority="high"
          due-date="2026-03-12"
          :is-overdue="false"
        />

        <TaskCard
          title="Fix API integration"
          description="Review the project detail endpoint integration."
          status="in_progress"
          priority="medium"
          due-date="2026-03-01"
          :is-overdue="true"
        />
      </div>
    </div>
  </AppShell>
</template>

<script setup lang="ts">
import AppShell from '@/components/layout/AppShell.vue'
import TaskCard from '@/components/tasks/TaskCard.vue'
</script>