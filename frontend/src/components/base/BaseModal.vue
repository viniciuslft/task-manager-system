<template>
  <Teleport to="body">
    <transition name="fade">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 py-6 backdrop-blur-sm"
        @click.self="$emit('close')"
      >
        <div
          class="w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-950"
        >
          <div class="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
            <div>
              <h2 class="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {{ title }}
              </h2>
              <p
                v-if="description"
                class="mt-1 text-sm text-slate-600 dark:text-slate-400"
              >
                {{ description }}
              </p>
            </div>

            <button
              type="button"
              class="cursor-pointer rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              @click="$emit('close')"
            >
              ✕
            </button>
          </div>

          <div class="px-6 py-5">
            <slot />
          </div>

          <div
            v-if="$slots.actions"
            class="flex items-center justify-end gap-3 border-t border-slate-200 px-6 py-4 dark:border-slate-800"
          >
            <slot name="actions" />
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  open: boolean
  title: string
  description?: string
}

defineProps<Props>()

defineEmits<{
  close: []
}>()
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>