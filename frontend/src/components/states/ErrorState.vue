<template>
  <div
    class="rounded-2xl border border-red-200 bg-red-50 px-6 py-5 text-sm text-red-700 shadow-sm dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-300"
  >
    <p class="font-medium">{{ resolvedTitle }}</p>
    <p class="mt-1 text-sm opacity-90">
      {{ props.message }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

interface Props {
  title?: string
  message: string
}

const props = defineProps<Props>()
const { t } = useI18n()

const resolvedTitle = computed(() => props.title || t('feedback.somethingWentWrong'))
</script>