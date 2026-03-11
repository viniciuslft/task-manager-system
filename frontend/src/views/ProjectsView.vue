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

    <section class="mt-6">
      <h2 class="text-sm text-slate-500 dark:text-slate-400">Project list placeholder</h2>
    </section>
  </AppShell>
</template>

<script setup lang="ts">
import AppShell from '@/components/layout/AppShell.vue'
import PageHeader from '@/components/shared/PageHeader.vue'
</script>