<template>
  <AppShell>
    <PageHeader
      title="Projects"
      description="Manage your projects and track task progress."
    >
      <template #actions>
        <BaseButton @click="isCreateProjectModalOpen = true">
          New Project
        </BaseButton>
      </template>
    </PageHeader>

    <section class="mt-6">
      <LoadingState v-if="loading" message="Loading projects..." />

      <ErrorState
        v-else-if="error"
        message="Failed to load projects."
      />

      <EmptyState
        v-else-if="projects.length === 0"
        title="No projects found"
        message="Create your first project to get started."
      />

      <div v-else class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <ProjectCard
          v-for="project in projects"
          :key="project.id"
          :name="project.name"
          :description="project.description ?? undefined"
          :status="project.status"
          :tasks-count="project.tasks_count"
        />
      </div>
    </section>

    <BaseModal
      :open="isCreateProjectModalOpen"
      title="Create new project"
      description="Add a new project to your workspace."
      @close="isCreateProjectModalOpen = false"
    >
      <p class="text-sm text-slate-600 dark:text-slate-400">
        Modal content placeholder
      </p>

      <template #actions>
        <BaseButton variant="secondary" @click="isCreateProjectModalOpen = false">
          Cancel
        </BaseButton>

        <BaseButton>
          Create
        </BaseButton>
      </template>
    </BaseModal>
  </AppShell>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import AppShell from '@/components/layout/AppShell.vue'
import PageHeader from '@/components/shared/PageHeader.vue'
import ProjectCard from '@/components/projects/ProjectCard.vue'
import LoadingState from '@/components/states/LoadingState.vue'
import ErrorState from '@/components/states/ErrorState.vue'
import EmptyState from '@/components/states/EmptyState.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseModal from '@/components/base/BaseModal.vue'
import { fetchProjects, type ProjectDto } from '@/services/projects'

const projects = ref<ProjectDto[]>([])
const loading = ref(false)
const error = ref('')
const isCreateProjectModalOpen = ref(false)

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

onMounted(() => {
  loadProjects()
})
</script>