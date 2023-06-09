<template>
  <main>
    <YearSelector v-model="year" />
    <MonthSelector v-model="month" />
    <!-- <MonthOverview /> -->
    {{ year }} {{ month }}
    <NuxtPage />
  </main>
</template>

<script setup lang="ts">
const route = useRoute('month-index-year-month')

const year = ref(new Date().getFullYear())
const month = ref(new Date().getMonth() + 1)

onMounted(() => {
  if (route.params.year) {
    year.value = +route.params.year
  }
  if (route.params.month) {
    month.value = +route.params.month
  }
})

const router = useRouter()
watchEffect(() => {
  if (year.value && month.value) {
    console.log(year.value, month.value)
    router.push({
      name: 'month-index-year-month',
      params: {
        year: year.value,
        month: month.value,
      },
    })
  }
})
</script>
