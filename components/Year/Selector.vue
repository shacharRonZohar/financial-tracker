<template>
  <GenericSliderSelector v-model="year" :values="years" />
</template>

<script setup lang="ts">
import {getYears} from '~/services/utilService'

const props = defineProps<{modelValue: number}>()
const emit = defineEmits<{(event: 'update:modelValue', newYear: number): void}>()

const years = getFormattedYears()

const year = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

function getFormattedYears() {
  const years = getYears()
  return years.map((year) => ({visual: year.toString(), actual: year}))
}
</script>
