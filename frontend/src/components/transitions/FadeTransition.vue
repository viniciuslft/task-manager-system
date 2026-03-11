<template>
  <Transition :name="name" :mode="mode">
    <slot />
  </Transition>
</template>

<script setup lang="ts">
interface Props {
  name?: string
  mode?: 'in-out' | 'out-in' | 'default'
}

withDefaults(defineProps<Props>(), {
  name: 'fade',
  mode: 'out-in',
})
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

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.25s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>