<template>
  <!-- <SaveExpenseModal @submit="emit('submit', $event)" /> -->
  <GenericForm :fields="fields" :waitForValue="expense" @submit="onSubmit"></GenericForm>
</template>

<script setup lang="ts">
import {z} from 'zod'
import {FormField} from '~/types/Form'
import {Expense} from '~/types/MonthData'

const route = useRoute('overview-year-index-month-index-edit-id')

const expense = ref<Expense | null>(null)
if (route.params.id) {
  const {month} = useGetMonthByParams()

  watchEffect(() => {
    if (!month.value) return
    expense.value = month.value.expenses.find((expense) => expense.id === route.params.id) ?? null
  })
}

const fields = computed<FormField[]>(() => [
  {
    label: 'Name',
    name: 'name',
    placeholder: 'Name',
    type: 'text',
    validation: z.string().min(1),
    defaultValue: expense.value ? expense.value.name : '',
  },
  {
    name: 'amount',
    type: 'number',
    label: 'Amount',
    placeholder: 'Amount',
    validation: z.number().min(1),
    defaultValue: expense.value ? expense.value.amount : '',
  },
])

const {createExpense} = useCreateExpense()
const {updateExpense} = useUpdateExpense()
function onSubmit(formData: Record<string, any>) {
  if (route.params.id) {
    updateExpense({
      expenseId: route.params.id,
      name: formData.name,
      amount: formData.amount,
    })
    return
  }
  createExpense({
    monthNum: +route.params.month,
    year: +route.params.year!,
    name: formData.name,
    amount: formData.amount,
  })
}
</script>
