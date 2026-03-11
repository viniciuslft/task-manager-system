import { api } from './api'

export interface TaskDto {
  id: number
  project_id: number
  title: string
  description: string | null
  status: 'todo' | 'in_progress' | 'done'
  priority: 'low' | 'medium' | 'high'
  due_date: string | null
  is_overdue?: boolean
  created_at: string
  updated_at: string
}

interface PaginatedResponse<T> {
  data: T[]
}

export interface TaskFilters {
  status?: string
  priority?: string
}

export interface CreateTaskPayload {
  title: string
  description: string
  status: 'todo' | 'in_progress' | 'done'
  priority: 'low' | 'medium' | 'high'
  due_date: string
}

export async function fetchProjectTasks(projectId: number | string, filters?: TaskFilters) {
  const { data } = await api.get<PaginatedResponse<TaskDto>>(`/projects/${projectId}/tasks`, {
    params: filters,
  })

  return data
}

export async function createTask(projectId: number | string, payload: CreateTaskPayload) {
  const { data } = await api.post<{ data: TaskDto }>(`/projects/${projectId}/tasks`, payload)
  return data
}