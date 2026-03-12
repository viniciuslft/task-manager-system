<template>
  <div
    ref="containerRef"
    class="space-y-2"
  >
    <label
      v-if="label"
      :for="id"
      class="block text-sm font-medium text-slate-700 dark:text-slate-300"
    >
      {{ label }}
    </label>

    <div class="relative">
      <button
        :id="id"
        type="button"
        class="cursor-pointer inline-flex w-full items-center justify-between gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 focus:border-violet-500 focus:ring-2 focus:ring-violet-200 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-100 dark:focus:border-violet-400 dark:focus:ring-violet-900/40"
        :aria-expanded="isOpen"
        aria-haspopup="listbox"
        @click="toggleDropdown"
      >
        <span class="truncate">
          {{ selectedOption?.label ?? placeholder }}
        </span>

        <svg
          class="h-4 w-4 shrink-0 text-slate-400 transition"
          :class="{ 'rotate-180': isOpen }"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <Transition
        enter-active-class="transition ease-out duration-150"
        enter-from-class="opacity-0 translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-100"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-1"
      >
        <div
          v-if="isOpen"
          class="absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900"
        >
          <ul
            class="max-h-60 overflow-y-auto py-1"
            role="listbox"
          >
            <li
              v-for="option in options"
              :key="option.value"
            >
              <button
                type="button"
                class="cursor-pointer flex w-full items-center gap-3 px-3 py-2 text-left text-sm transition hover:bg-slate-50 dark:hover:bg-slate-800"
                :class="option.value === modelValue
                  ? 'bg-slate-50 text-slate-900 dark:bg-slate-800 dark:text-slate-100'
                  : 'text-slate-700 dark:text-slate-200'"
                role="option"
                :aria-selected="option.value === modelValue"
                @click="handleSelect(option.value)"
              >
                <span class="min-w-0 flex-1 truncate">
                  {{ option.label }}
                </span>

                <svg
                  v-if="option.value === modelValue"
                  class="h-4 w-4 shrink-0 text-violet-600 dark:text-violet-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.704 5.29a1 1 0 010 1.42l-7.2 7.2a1 1 0 01-1.415 0l-3.2-3.2a1 1 0 111.414-1.42l2.493 2.494 6.493-6.494a1 1 0 011.415 0z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

interface SelectOption {
  label: string
  value: string
}

interface Props {
  id?: string
  label?: string
  modelValue: string
  options: SelectOption[]
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  id: undefined,
  label: undefined,
  placeholder: 'Selecione uma opção',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const isOpen = ref(false)
const containerRef = ref<HTMLElement | null>(null)

const selectedOption = computed(() =>
  props.options.find((option) => option.value === props.modelValue),
)

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function handleSelect(value: string) {
  emit('update:modelValue', value)
  isOpen.value = false
}

function handleClickOutside(event: MouseEvent) {
  if (!containerRef.value) return

  const target = event.target as Node

  if (!containerRef.value.contains(target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>