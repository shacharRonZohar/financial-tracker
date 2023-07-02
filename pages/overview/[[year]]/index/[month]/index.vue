<template>
  <!-- <div> -->
  <GenericDataLoading :data="month" :isLoading="isLoadingMonth" :error="monthError" @refetch="refetchMonth" v-slot="{value}">
    <MonthDetails :month-data="value" @update-income="updateIncome" />
    <Teleport to=".app-container">
      <NuxtPage />
    </Teleport>
  </GenericDataLoading>
  <!-- </div> -->
</template>

<script setup lang="ts">
const income = ref(0)

const {month, monthError, isLoadingMonth, refetchMonth} = useGetMonthByParams()

const {updateMonthIncome} = useUpdateMonthIncome({
  newIncome: income,
})
const updateIncome = (newIncome: number) => {
  income.value = newIncome
  updateMonthIncome({
    income: newIncome,
  })
}
const route = useRoute()
console.log(route.params, route.name)
</script>
