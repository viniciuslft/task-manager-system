<template>
  <RouterLink
    class="cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700 flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-400/10 text-violet-600 shadow-sm ring-1 ring-violet-500/20 dark:bg-white dark:text-violet-500 dark:ring-white/20"
    to="/"
  >
    <img
      :src="logoMark"
      alt="Task Manager logo"
      class="h-5 w-5 object-contain"
    />
  </RouterLink>
</template>

<script setup lang="ts">
import logoMark from '@/assets/logo-mark.svg'

import { RouterLink } from 'vue-router'

interface Props {
  to: string
  label?: string
}

withDefaults(defineProps<Props>(), {
  label: 'Back',
})
</script>