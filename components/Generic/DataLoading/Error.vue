<template>
  <div>
    <span>Had an error :c</span>
    {{ error }}
    <button @click="emit('retry')">Press to retry</button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  error: unknown
}>()

const emit = defineEmits<{
  (event: 'retry'): void
}>()
</script>
