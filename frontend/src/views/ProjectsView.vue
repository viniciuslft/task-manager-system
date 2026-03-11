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

    <section class="mt-6 space-y-4">
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

      <LoadingState v-if="loading" message="Loading projects..." />

      <ErrorState
        v-else-if="error"
        :message="error"
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

    <ProjectFormModal
      :open="isCreateProjectModalOpen"
      :submitting="submitting"
      @close="isCreateProjectModalOpen = false"
      @submit="handleProjectSubmit"
    />
  </AppShell>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import AppShell from '@/components/layout/AppShell.vue'
import PageHeader from '@/components/shared/PageHeader.vue'
import ProjectCard from '@/components/projects/ProjectCard.vue'
import ProjectFormModal, {
  type ProjectFormPayload,
} from '@/components/projects/ProjectFormModal.vue'
import LoadingState from '@/components/states/LoadingState.vue'
import ErrorState from '@/components/states/ErrorState.vue'
import EmptyState from '@/components/states/EmptyState.vue'
import FeedbackAlert from '@/components/states/FeedbackAlert.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { useProjects } from '@/composables/useProjects'

const isCreateProjectModalOpen = ref(false)

const {
  projects,
  loading,
  error,
  submitting,
  submitError,
  successMessage,
  loadProjects,
  createProject,
} = useProjects()

async function handleProjectSubmit(payload: ProjectFormPayload) {
  const created = await createProject(payload)

  if (created) {
    isCreateProjectModalOpen.value = false
  }
}

onMounted(() => {
  loadProjects()
})
</script>