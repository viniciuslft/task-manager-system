<template>
  <div
    class="rounded-2xl border border-red-200 bg-red-50 px-6 py-5 text-sm text-red-700 shadow-sm dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300"
  >
    <p class="font-medium">{{ title }}</p>
    <p class="mt-1 text-sm opacity-90">
      {{ message }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  message: string
}

withDefaults(defineProps<Props>(), {
  title: 'Something went wrong',
})
</script>