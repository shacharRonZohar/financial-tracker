<template>
  <!-- <div> -->
  <GenericDataLoadingError v-if="error" @retry="emit('refetch')" :error="error" />
  <GenericDataLoadingLoader v-else-if="isLoading" />
  <slot v-else-if="data" :value="data"></slot>
  <GenericDataLoadingNothingFound v-else />
  <!-- </div> -->
</template>

<!-- This type extension is meaningless, but nuxt wasent happy without an extends for some reason -->
<script setup lang="ts" generic="T extends any">
defineProps<{
  data: T
  error: unknown
  isLoading: boolean
}>()

const emit = defineEmits<{
  (event: 'refetch'): void
}>()
</script>
