<template>
  <div
    class="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-950"
  >
    <div
      class="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-violet-600 dark:border-slate-700 dark:border-t-violet-400"
    />
    <p class="mt-4 text-sm text-slate-600 dark:text-slate-400">
      {{ message }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  message?: string
}

withDefaults(defineProps<Props>(), {
  message: 'Loading...',
})
</script>