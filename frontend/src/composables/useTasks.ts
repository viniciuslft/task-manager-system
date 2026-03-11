import { reactive, ref } from 'vue'
import {
  createTask as createTaskRequest,
  fetchProjectTasks,
  type CreateTaskPayload,
  type TaskDto,
  updateTask as updateTaskRequest,
} from '@/services/tasks'

export function useTasks(projectId: string) {
  const tasks = ref<TaskDto[]>([])
  const loading = ref(false)
  const error = ref('')
  const submitting = ref(false)
  const submitError = ref('')
  const successMessage = ref('')

  const filters = reactive({
    status: '',
    priority: '',
  })

  async function loadTasks() {
    loading.value = true
    error.value = ''

    try {
      const response = await fetchProjectTasks(projectId, {
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

  async function createTask(payload: CreateTaskPayload) {
    submitting.value = true
    submitError.value = ''
    successMessage.value = ''

    try {
      await createTaskRequest(projectId, payload)
      successMessage.value = 'Task created successfully.'
      await loadTasks()
      return true
    } catch (err) {
      console.error('Failed to create task:', err)
      submitError.value = 'Failed to create task.'
      return false
    } finally {
      submitting.value = false
    }
  }

  async function updateTaskStatus(payload: {
    id: number
    status: 'todo' | 'in_progress' | 'done'
  }) {
    submitError.value = ''
    successMessage.value = ''

    const originalTasks = tasks.value.map((task) => ({ ...task }))
    const taskIndex = tasks.value.findIndex((task) => task.id === payload.id)

    if (taskIndex === -1) return false

    const currentTask = tasks.value[taskIndex]!

    tasks.value[taskIndex] = {
      ...currentTask,
      status: payload.status,
      is_overdue: currentTask?.due_date
        ? new Date(currentTask.due_date) < new Date(new Date().toDateString()) &&
          payload.status !== 'done'
        : false,
    }

    try {
      await updateTaskRequest(payload.id, {
        status: payload.status,
      })

      successMessage.value = 'Task status updated successfully.'
      return true
    } catch (err) {
      console.error('Failed to update task status:', err)
      tasks.value = originalTasks
      submitError.value = 'Failed to update task status.'
      return false
    }
  }

  function resetFilters() {
    filters.status = ''
    filters.priority = ''
  }

  function clearFeedback() {
    submitError.value = ''
    successMessage.value = ''
  }

  return {
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
    clearFeedback,
  }
}