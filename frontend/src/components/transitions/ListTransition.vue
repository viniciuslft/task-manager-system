<template>
  <TransitionGroup :name="name" :tag="tag" :class="className">
    <slot />
  </TransitionGroup>
</template>

<script setup lang="ts">
interface Props {
  name?: string
  tag?: string
  className?: string
}

withDefaults(defineProps<Props>(), {
  name: 'list',
  tag: 'div',
  className: '',
})
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.25s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>