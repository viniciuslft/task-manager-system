<template>
  <div
    class="inline-flex items-center rounded-xl border border-slate-200 bg-white p-1 shadow-sm dark:border-slate-700 dark:bg-slate-900"
  >
    <button
      type="button"
      class="rounded-lg px-3 py-1.5 text-sm font-medium transition"
      :class="modelValue === 'cards'
        ? 'bg-violet-600 text-white shadow-sm'
        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'"
      @click="$emit('update:modelValue', 'cards')"
    >
      Cards
    </button>

    <button
      type="button"
      class="rounded-lg px-3 py-1.5 text-sm font-medium transition"
      :class="modelValue === 'table'
        ? 'bg-violet-600 text-white shadow-sm'
        : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'"
      @click="$emit('update:modelValue', 'table')"
    >
      Table
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: 'cards' | 'table'
}

defineProps<Props>()

defineEmits<{
  'update:modelValue': [value: 'cards' | 'table']
}>()
</script>