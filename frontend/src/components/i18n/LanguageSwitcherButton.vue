<template>
  <div
    ref="containerRef"
    class="relative"
  >
    <button
      type="button"
      class="cursor-pointer inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-100"
      :aria-label="t('common.language')"
      :aria-expanded="isOpen"
      aria-haspopup="listbox"
      @click="toggleDropdown"
    >
      <span class="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
        {{ t('common.language') }}
      </span>

      <img
        :src="currentFlagSrc"
        :alt="currentLocaleMeta.label"
        class="h-4 w-4 rounded-sm object-cover"
      />

      <span>{{ currentLocaleMeta.shortLabel }}</span>

      <svg
        class="h-4 w-4 text-slate-400 transition"
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
        class="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900"
      >
        <ul
          class="py-1"
          role="listbox"
        >
          <li
            v-for="supportedLocale in supportedLocales"
            :key="supportedLocale"
          >
            <button
              type="button"
              class="cursor-pointer flex w-full items-center gap-3 px-3 py-2 text-left text-sm transition hover:bg-slate-50 dark:hover:bg-slate-800"
              :class="supportedLocale === locale
                ? 'bg-slate-50 text-slate-900 dark:bg-slate-800 dark:text-slate-100'
                : 'text-slate-700 dark:text-slate-200'"
              role="option"
              :aria-selected="supportedLocale === locale"
              @click="handleSelectLocale(supportedLocale)"
            >
              <img
                :src="getFlagSrc(supportedLocale)"
                :alt="LOCALE_META[supportedLocale].label"
                class="h-4 w-4 rounded-sm object-cover"
              />

              <div class="flex min-w-0 flex-1 flex-col">
                <span class="truncate font-medium">
                  {{ LOCALE_META[supportedLocale].label }}
                </span>
                <span class="text-xs text-slate-500 dark:text-slate-400">
                  {{ LOCALE_META[supportedLocale].shortLabel }}
                </span>
              </div>

              <svg
                v-if="supportedLocale === locale"
                class="h-4 w-4 text-violet-600 dark:text-violet-400"
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
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLocale } from '@/composables/useLocale'
import { LOCALE_META } from '@/i18n/locales/locale-meta'
import type { SupportedLocale } from '@/i18n'

import usFlag from '@/assets/flags/us.svg'
import brFlag from '@/assets/flags/br.svg'
import ptFlag from '@/assets/flags/pt.svg'

const { t } = useI18n()
const { locale, setLocale, supportedLocales } = useLocale()

const isOpen = ref(false)
const containerRef = ref<HTMLElement | null>(null)

const FLAG_MAP = {
  us: usFlag,
  br: brFlag,
  pt: ptFlag,
} as const

const currentLocaleMeta = computed(() => LOCALE_META[locale.value])
const currentFlagSrc = computed(() => FLAG_MAP[currentLocaleMeta.value.flag])

function getFlagSrc(localeValue: SupportedLocale) {
  return FLAG_MAP[LOCALE_META[localeValue].flag]
}

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function handleSelectLocale(selectedLocale: SupportedLocale) {
  setLocale(selectedLocale)
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