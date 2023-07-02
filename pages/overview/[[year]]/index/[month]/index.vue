<template>
  <!-- <div> -->
  <GenericDataLoading :data="month" :isLoading="isLoadingMonth" :error="monthError" @refetch="refetchMonth" v-slot="{value}">
    <MonthDetails :month-data="value" @update-income="updateIncome" />
    <NuxtPage />
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
</script>
