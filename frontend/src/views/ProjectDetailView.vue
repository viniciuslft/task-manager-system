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

      <TaskFilters
        :status="filters.status"
        :priority="filters.priority"
        @update:status="filters.status = $event"
        @update:priority="filters.priority = $event"
        @reset="resetFilters"
        @create-task="isCreateTaskModalOpen = true"
      />

      <FeedbackAlert
        v-if="successMessage"
        type="success"
        :message="successMessage"
      />

      <FeedbackAlert
        v-if="submitError"
        type="error"
        :message="submitError"
      />

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
          :id="task.id"
          :title="task.title"
          :description="task.description ?? undefined"
          :status="task.status"
          :priority="task.priority"
          :due-date="task.due_date"
          :is-overdue="task.is_overdue ?? false"
          @status-change="updateTaskStatus"
        />
      </div>
    </div>

    <TaskFormModal
      :open="isCreateTaskModalOpen"
      :submitting="submitting"
      @close="isCreateTaskModalOpen = false"
      @submit="handleTaskSubmit"
    />
  </AppShell>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppShell from '@/components/layout/AppShell.vue'
import TaskCard from '@/components/tasks/TaskCard.vue'
import TaskFilters from '@/components/tasks/TaskFilters.vue'
import TaskFormModal, {
  type TaskFormPayload,
} from '@/components/tasks/TaskFormModal.vue'
import LoadingState from '@/components/states/LoadingState.vue'
import ErrorState from '@/components/states/ErrorState.vue'
import EmptyState from '@/components/states/EmptyState.vue'
import FeedbackAlert from '@/components/states/FeedbackAlert.vue'
import { useTasks } from '@/composables/useTasks'

const route = useRoute()
const isCreateTaskModalOpen = ref(false)

const {
  tasks,
  loading,
  error,
  submitting,
  submitError,
  successMessage,
  filters,
  loadTasks,
  createTask,
  updateTaskStatus,
  resetFilters,
} = useTasks(String(route.params.id))

async function handleTaskSubmit(payload: TaskFormPayload) {
  const created = await createTask(payload)

  if (created) {
    isCreateTaskModalOpen.value = false
  }
}

watch(
  () => [filters.status, filters.priority],
  () => {
    loadTasks()
  },
)

onMounted(() => {
  loadTasks()
})
</script>