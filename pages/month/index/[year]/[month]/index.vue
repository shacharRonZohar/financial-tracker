<template>
  <div>
    <GenericDataLoading :data="month" :is-loading="isLoadingMonth" :error="monthError" @refetch="refetchMonth" v-slot="{value}">
      <MonthDetails :month-data="value" @update-income="updateIncome" />
    </GenericDataLoading>
  </div>
</template>

<script setup lang="ts">
// const {year, month: monthNum} = useYearMonthParams()
// const params = useParams('month-index-year-month')
// params.value.

// const monthId = ref('')
// const activeExpenseId = ref('')
const income = ref(0)

const {month, monthError, isLoadingMonth, refetchMonth} = useGetMonthByParams()
// watch(month, (newVal) => {
//   if (!newVal) return
//   monthId.value = newVal.id
// })

const {updateMonthIncome} = useUpdateMonthIncome({
  // monthIdInput: monthId,
  newIncome: income,
})
const updateIncome = (newIncome: number) => {
  income.value = newIncome
  updateMonthIncome({
    income: newIncome,
  })
}

// const {createExpense} = useCreateExpense()
// function handleSubmit({amount, name, id}: {amount: number; name: string; id?: string}) {
//   createExpense({
//     monthId: monthId.value,
//     amount,
//     name,
//   })
// }
</script>
