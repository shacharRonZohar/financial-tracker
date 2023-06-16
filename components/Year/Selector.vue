<template>
  <div>
    <div v-for="(year, idx) in years" :key="year" @click="changeYear(year)">{{ year }}</div>
  </div>
</template>

<script setup lang="ts">
const years = [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032]

const props = defineProps<{modelValue: number}>()
const emit = defineEmits<{(event: 'update:modelValue', newYear: number): void}>()

const year = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

function changeYear(newYear: number) {
  year.value = newYear
}
</script>
