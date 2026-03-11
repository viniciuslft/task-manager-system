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
        name="Website Redesign"
        description="Redesign the company website with a modern UI."
        status="active"
        :tasks-count="12"
      />

      <ProjectCard
        name="Mobile App Launch"
        description="Prepare launch tasks for the mobile application."
        status="active"
        :tasks-count="8"
      />

      <ProjectCard
        name="Legacy Cleanup"
        description="Archive and clean up old project assets."
        status="archived"
        :tasks-count="4"
      />
    </section>
  </AppShell>
</template>

<script setup lang="ts">
import AppShell from '@/components/layout/AppShell.vue'
import PageHeader from '@/components/shared/PageHeader.vue'
import ProjectCard from '@/components/projects/ProjectCard.vue'
</script>