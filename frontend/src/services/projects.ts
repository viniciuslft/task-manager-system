import { api } from './api'

export interface ProjectDto {
  id: number
  name: string
  description: string | null
  status: 'active' | 'archived'
  tasks_count: number
  created_at: string
  updated_at: string
}

interface PaginatedResponse<T> {
  data: T[]
}

export interface CreateProjectPayload {
  name: string
  description: string
  status: 'active' | 'archived'
}

export async function fetchProjects() {
  const { data } = await api.get<PaginatedResponse<ProjectDto>>('/projects')
  return data
}

export async function createProject(payload: CreateProjectPayload) {
  const { data } = await api.post<{ data: ProjectDto }>('/projects', payload)
  return data
}