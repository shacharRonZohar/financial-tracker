<template>
  <div>
    <div v-for="(month, idx) in months" :key="month" @click="changeMonth(idx + 1)">{{ month }}</div>
  </div>
</template>

<script setup lang="ts">
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

// const month = defineModel<number>()
const props = defineProps<{modelValue: number}>()
const emit = defineEmits<{(event: 'update:modelValue', newMonth: number): void}>()

const month = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

// const route = useRoute('month-index-year-month')
// const router = useRouter()

function changeMonth(newMonth: number) {
  month.value = newMonth
}

// onMounted(() => {
// if (!route.params.month) {
// changeMonth(new Date().getMonth() + 1)
// }
// })
</script>
