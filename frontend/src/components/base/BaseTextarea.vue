<template>
  <div class="space-y-2">
    <label
      v-if="label"
      :for="id"
      class="block text-sm font-medium text-slate-700 dark:text-slate-300"
    >
      {{ label }}
    </label>

    <textarea
      :id="id"
      :value="modelValue"
      :placeholder="placeholder"
      rows="4"
      class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-violet-400 dark:focus:ring-violet-900/40"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  id?: string
  label?: string
  modelValue: string
  placeholder?: string
}

withDefaults(defineProps<Props>(), {
  id: undefined,
  label: undefined,
  placeholder: '',
})

defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>