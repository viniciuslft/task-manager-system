<template>
  <AppShell>
    <PageHeader
      title="Projects"
      description="Manage your projects and track task progress."
    >
      <template #actions>
        <button
          type="button"
          class="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-700"
        >
          New Project
        </button>
      </template>
    </PageHeader>

    <section class="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      <ProjectCard
        v-for="project in projects"
        :key="project.id"
        :name="project.name"
        :description="project.description ?? undefined"
        :status="project.status"
        :tasks-count="project.tasks_count"
      />
    </section>
  </AppShell>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import AppShell from '@/components/layout/AppShell.vue'
import PageHeader from '@/components/shared/PageHeader.vue'
import ProjectCard from '@/components/projects/ProjectCard.vue'
import { fetchProjects, type ProjectDto } from '@/services/projects'

const projects = ref<ProjectDto[]>([])

async function loadProjects() {
  try {
    const response = await fetchProjects()
    projects.value = response.data
  } catch (error) {
    console.error('Failed to fetch projects:', error)
  }
}

onMounted(() => {
  loadProjects()
})
</script>