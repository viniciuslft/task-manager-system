<template>
  <AppShell>
    <div class="space-y-6">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 dark:text-slate-100">
          Project details
        </h1>

        <p class="text-sm text-slate-600 dark:text-slate-400">
          View project tasks and progress.
        </p>
      </div>

      <LoadingState v-if="loading" message="Loading tasks..." />

      <ErrorState
        v-else-if="error"
        :message="error"
      />

      <EmptyState
        v-else-if="tasks.length === 0"
        title="No tasks found"
        message="Create the first task for this project."
      />

      <div v-else class="grid gap-4 md:grid-cols-2">
        <TaskCard
          v-for="task in tasks"
          :key="task.id"
          :title="task.title"
          :description="task.description ?? undefined"
          :status="task.status"
          :priority="task.priority"
          :due-date="task.due_date"
          :is-overdue="task.is_overdue ?? false"
        />
      </div>
    </div>
  </AppShell>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import AppShell from '@/components/layout/AppShell.vue'
import TaskCard from '@/components/tasks/TaskCard.vue'
import LoadingState from '@/components/states/LoadingState.vue'
import ErrorState from '@/components/states/ErrorState.vue'
import EmptyState from '@/components/states/EmptyState.vue'
import { fetchProjectTasks, type TaskDto } from '@/services/tasks'

const route = useRoute()

const tasks = ref<TaskDto[]>([])
const loading = ref(false)
const error = ref('')

async function loadTasks() {
  loading.value = true
  error.value = ''

  try {
    const response = await fetchProjectTasks(String(route.params.id))
    tasks.value = response.data
  } catch (err) {
    console.error('Failed to fetch tasks:', err)
    error.value = 'Failed to load tasks.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadTasks()
})
</script>