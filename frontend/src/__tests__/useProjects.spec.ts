import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useProjects } from '@/composables/useProjects'
import * as projectsService from '@/services/projects'

vi.mock('@/services/projects', () => ({
  fetchProjects: vi.fn(),
  createProject: vi.fn(),
}))

describe('useProjects', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('loads projects successfully', async () => {
    vi.mocked(projectsService.fetchProjects).mockResolvedValue({
      data: [
        {
          id: 1,
          name: 'Website Redesign',
          description: 'Redesign the company website',
          status: 'active',
          tasks_count: 5,
          created_at: '2026-03-10T00:00:00.000000Z',
          updated_at: '2026-03-10T00:00:00.000000Z',
        },
      ],
    })

    const { projects, loading, error, loadProjects } = useProjects()

    expect(projects.value).toEqual([])
    expect(loading.value).toBe(false)
    expect(error.value).toBe('')

    const promise = loadProjects()

    expect(loading.value).toBe(true)

    await promise

    expect(loading.value).toBe(false)
    expect(error.value).toBe('')
    expect(projects.value).toHaveLength(1)
    expect(projects.value[0]?.name).toBe('Website Redesign')
  })
})