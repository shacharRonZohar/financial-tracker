<template>
  <GenericSliderSelector v-model="month" :values="months" />
</template>

<script setup lang="ts">
const props = defineProps<{modelValue: number}>()
const emit = defineEmits<{(event: 'update:modelValue', newMonth: number): void}>()

const months = [
  {visual: 'Jan', actual: 1},
  {visual: 'Feb', actual: 2},
  {visual: 'Mar', actual: 3},
  {visual: 'Apr', actual: 4},
  {visual: 'May', actual: 5},
  {visual: 'Jun', actual: 6},
  {visual: 'Jul', actual: 7},
  {visual: 'Aug', actual: 8},
  {visual: 'Sep', actual: 9},
  {visual: 'Oct', actual: 10},
  {visual: 'Nov', actual: 11},
  {visual: 'Dec', actual: 12},
]

const month = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>
