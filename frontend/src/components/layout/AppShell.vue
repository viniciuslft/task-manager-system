<template>
  <div class="min-h-screen bg-slate-50 dark:bg-slate-900">
    <AppHeader />

    <main class="mx-auto max-w-7xl px-4 py-6 md:px-6">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
</script>