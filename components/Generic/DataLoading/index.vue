<template>
  <div>
    <GenericDataLoadingError v-if="error" @retry="emit('refetch')" :error="error" />
    <GenericDataLoadingLoader v-else-if="isLoading" />
    <slot v-else-if="data" :value="data"></slot>
    <GenericDataLoadingNothingFound v-else />
  </div>
</template>

<script setup lang="ts" generic="T">
defineProps<{
  data: T
  error: unknown
  isLoading: boolean
}>()

const emit = defineEmits<{
  (event: 'refetch'): void
}>()
</script>
