<template>
  <span
    class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium"
    :class="badgeClasses"
  >
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?:
    | 'neutral'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'violet'
    | 'rose'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'neutral',
})

const badgeClasses = computed(() => {
  const variants = {
    neutral:
      'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
    success:
      'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300',
    warning:
      'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300',
    danger:
      'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300',
    info:
      'bg-sky-100 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300',
    violet:
      'bg-violet-100 text-violet-700 dark:bg-violet-950/40 dark:text-violet-300',
    rose:
      'bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300',
  }

  return variants[props.variant]
})
</script>