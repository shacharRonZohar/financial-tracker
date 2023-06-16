<template>
  <div>
    <div v-for="(month, idx) in months" :key="month" @click="changeMonth(idx + 1)">{{ month }}</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{modelValue: number}>()
const emit = defineEmits<{(event: 'update:modelValue', newMonth: number): void}>()

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'Auguest',
  'September',
  'October',
  'November',
  'December',
]

const month = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

function changeMonth(newMonth: number) {
  month.value = newMonth
}
</script>
