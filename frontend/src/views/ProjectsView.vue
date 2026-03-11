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
      <FadeTransition name="fade-slide">
        <FeedbackAlert
          v-if="successMessage"
          type="success"
          :message="successMessage"
        />
      </FadeTransition>

      <FadeTransition name="fade-slide">
        <FeedbackAlert
          v-if="submitError"
          type="error"
          :message="submitError"
        />
      </FadeTransition>

      <FadeTransition>
        <LoadingState
          v-if="loading"
          message="Loading projects..."
        />
      </FadeTransition>

      <FadeTransition>
        <ErrorState
          v-if="!loading && !!error"
          :message="error"
        />
      </FadeTransition>

      <FadeTransition>
        <EmptyState
          v-if="!loading && !error && projects.length === 0"
          title="No projects found"
          message="Create your first project to get started."
        />
      </FadeTransition>
      <FadeTransition>
        <ListTransition
          v-if="!loading && !error && projects.length > 0"
          class-name="grid gap-4 md:grid-cols-2 xl:grid-cols-3"
        >
          <ProjectCard
            v-for="project in projects"
            :key="project.id"
            :id="project.id"
            :name="project.name"
            :description="project.description ?? undefined"
            :status="project.status"
            :tasks-count="project.tasks_count"
          />
        </ListTransition>
      </FadeTransition>
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
import FadeTransition from '@/components/transitions/FadeTransition.vue'
import ListTransition from '@/components/transitions/ListTransition.vue'

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