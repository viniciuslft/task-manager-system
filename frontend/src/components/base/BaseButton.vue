<template>
  <button
    :type="type"
    :disabled="disabled"
    class="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 dark:focus:ring-offset-slate-950"
    :class="buttonClasses"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  type: 'button',
  disabled: false,
})

const buttonClasses = computed(() => {
  const variants = {
    primary:
      'bg-violet-600 text-white hover:bg-violet-700 focus:ring-violet-500',
    secondary:
      'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100 focus:ring-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800',
    danger:
      'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    ghost:
      'text-slate-700 hover:bg-slate-100 focus:ring-slate-400 dark:text-slate-200 dark:hover:bg-slate-800',
  }

  return variants[props.variant]
})
</script>