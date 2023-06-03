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

const route = useRoute('month-index-year-month')
const router = useRouter()

function changeMonth(month: number) {
  router.push({
    name: 'month-index-year-month',
    params: {
      ...route.params,
      month,
    },
  })
}
</script>
