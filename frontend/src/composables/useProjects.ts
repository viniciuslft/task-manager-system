import { ref } from 'vue'
import  { i18n } from '@/i18n'
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

  const t = i18n.global.t

  async function loadProjects() {
    loading.value = true
    error.value = ''

    try {
      const response = await fetchProjects()
      projects.value = response.data
    } catch (err) {
      console.error('Failed to fetch projects:', err)
      error.value = t('projects.loadError')
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
      successMessage.value = t('projects.createdSuccess')
      await loadProjects()
      return true
    } catch (err) {
      console.error('Failed to create project:', err)
      submitError.value = t('projects.createdError')
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