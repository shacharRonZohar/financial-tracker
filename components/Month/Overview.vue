<template>
  <div>
    <GenericDataLoading :error="monthError" :is-loading="isLoadingMonth" :data="month" @refetch="refetchMonth" v-slot="{value}">
      <MonthDetails :month-data="value" @update-income="updateIncome" />
    </GenericDataLoading>
    <SaveExpenseModal @submit="handleSubmit" />
  </div>
</template>

<script setup lang="ts">
// import z from 'zod'

const monthId = ref('')
const activeExpenseId = ref('')
const income = ref(0)

// const editableExpense = computed({
//   get: () => {
//     if (!month.value) return
//     if (!activeExpenseId.value)
//       return {
//         amount: 0,
//         name: '',
//       }
//     const expense = month.value.expenses.find((expense) => expense.id === activeExpenseId.value)
//     if (!expense)
//       return {
//         amount: 0,
//         name: '',
//       }
//     const {amount, name} = expense
//     return {
//       amount,
//       name,
//     }
//   },
//   set: (val) => {
//     if (!month.value || !val) return
//     const input = {
//       monthId: monthId.value,
//       amount: val.amount,
//       name: val.name,
//     }
//     if (activeExpenseId.value) {
//       updateExpense({
//         id: activeExpenseId.value,
//         ...input,
//       })
//     } else {
//       createExpense(input)
//     }
//   },
// })
const {month, monthError, isLoadingMonth, refetchMonth} = useGetMonthByQueryParams()
watch(month, (newVal) => {
  if (!newVal) return
  monthId.value = newVal.id
})

const {updateMonthIncome} = useUpdateMonthIncome({
  monthIdInput: monthId,
  newIncome: income,
})
const updateIncome = (newIncome: number) => {
  income.value = newIncome
  updateMonthIncome({
    income: newIncome,
  })
}

const {createExpense} = useCreateExpense()
function handleSubmit({amount, name}: {amount: number; name: string}) {
  createExpense({
    monthId: monthId.value,
    amount,
    name,
  })
}
</script>
