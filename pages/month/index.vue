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
const year = ref(new Date().getFullYear())
const month = ref(new Date().getMonth() + 1)

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
// const yearNum = ref(new Date().getFullYear())
// function onChangeYear(year: number) {
//   console.log(year)
//   yearNum.value = year
// }

// const monthNum = ref(new Date().getMonth())
// function onChangeMonth(month: number) {
//   console.log(month)
//   monthNum.value = month
// }

// const router = useRouter()
// watch(
//   [yearNum, monthNum],
//   ([year, month]) => {
//     console.log(year, month)
//     router.push({
//       name: 'month-index-id',
//       params: {
//         id: `${year}-${month}`,
//       },
//     })
//     })
//     //   router.push({
//     //     name: 'month-index-id',
//     //     params: {
//     //       id: `${year}-${month}`,
//     //     },
//     //   })
//   },
//   {immediate: true},
// )
</script>
