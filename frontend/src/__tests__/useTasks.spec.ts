import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useTasks } from '@/composables/useTasks'
import * as tasksService from '@/services/tasks'

vi.mock('@/services/tasks', () => ({
  fetchProjectTasks: vi.fn(),
  createTask: vi.fn(),
  updateTask: vi.fn(),
}))

describe('useTasks', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('loads tasks successfully', async () => {
    vi.mocked(tasksService.fetchProjectTasks).mockResolvedValue({
      data: [
        {
          id: 1,
          project_id: 10,
          title: 'Implement login flow',
          description: 'Create login UI and integrate API',
          status: 'todo',
          priority: 'high',
          due_date: '2026-03-15',
          is_overdue: false,
          created_at: '2026-03-10T00:00:00.000000Z',
          updated_at: '2026-03-10T00:00:00.000000Z',
        },
      ],
    })

    const { tasks, loading, error, loadTasks, filters } = useTasks('10')

    expect(tasks.value).toEqual([])
    expect(loading.value).toBe(false)
    expect(error.value).toBe('')
    expect(filters.status).toBe('')
    expect(filters.priority).toBe('')

    const promise = loadTasks()

    expect(loading.value).toBe(true)

    await promise

    expect(tasks.value).toHaveLength(1)
    expect(tasks.value[0]?.title).toBe('Implement login flow')
    expect(tasks.value[0]?.status).toBe('todo')
    expect(loading.value).toBe(false)
    expect(error.value).toBe('')
    expect(tasksService.fetchProjectTasks).toHaveBeenCalledWith('10', {
      status: undefined,
      priority: undefined,
    })
  })
})