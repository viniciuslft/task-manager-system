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
        @create-task="handleCreateTask"
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
import { onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppShell from '@/components/layout/AppShell.vue'
import TaskCard from '@/components/tasks/TaskCard.vue'
import TaskFilters from '@/components/tasks/TaskFilters.vue'
import LoadingState from '@/components/states/LoadingState.vue'
import ErrorState from '@/components/states/ErrorState.vue'
import EmptyState from '@/components/states/EmptyState.vue'
import { fetchProjectTasks, type TaskDto } from '@/services/tasks'

const route = useRoute()

const tasks = ref<TaskDto[]>([])
const loading = ref(false)
const error = ref('')

const filters = reactive({
  status: '',
  priority: '',
})

async function loadTasks() {
  loading.value = true
  error.value = ''

  try {
    const response = await fetchProjectTasks(String(route.params.id), {
      status: filters.status || undefined,
      priority: filters.priority || undefined,
    })
    tasks.value = response.data
  } catch (err) {
    console.error('Failed to fetch tasks:', err)
    error.value = 'Failed to load tasks.'
  } finally {
    loading.value = false
  }
}

function resetFilters() {
  filters.status = ''
  filters.priority = ''
}

function handleCreateTask() {
  console.log('Open task creation modal')
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