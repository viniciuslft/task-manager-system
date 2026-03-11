import { ref } from 'vue'
import {
  createProject as createProjectRequest,
  fetchProjects,
  type CreateProjectPayload,
  type ProjectDto,
} from '@/services/projects'

export function useProjects() {
  const projects = ref<ProjectDto[]>([])
  const loading = ref(false)
  const error = ref('')
  const submitting = ref(false)
  const submitError = ref('')
  const successMessage = ref('')

  async function loadProjects() {
    loading.value = true
    error.value = ''

    try {
      const response = await fetchProjects()
      projects.value = response.data
    } catch (err) {
      console.error('Failed to fetch projects:', err)
      error.value = 'Failed to load projects.'
    } finally {
      loading.value = false
    }
  }

  async function createProject(payload: CreateProjectPayload) {
    submitting.value = true
    submitError.value = ''
    successMessage.value = ''

    try {
      await createProjectRequest(payload)
      successMessage.value = 'Project created successfully.'
      await loadProjects()
      return true
    } catch (err) {
      console.error('Failed to create project:', err)
      submitError.value = 'Failed to create project.'
      return false
    } finally {
      submitting.value = false
    }
  }

  function clearFeedback() {
    submitError.value = ''
    successMessage.value = ''
  }

  return {
    projects,
    loading,
    error,
    submitting,
    submitError,
    successMessage,
    loadProjects,
    createProject,
    clearFeedback,
  }
}