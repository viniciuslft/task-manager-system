<template>
  <div
    class="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center shadow-sm dark:border-slate-700 dark:bg-slate-950"
  >
    <p class="text-base font-medium text-slate-900 dark:text-slate-100">
      {{ title }}
    </p>
    <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">
      {{ message }}
    </p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  message?: string
}

withDefaults(defineProps<Props>(), {
  title: 'No data found',
  message: 'There is nothing to display right now.',
})
</script>