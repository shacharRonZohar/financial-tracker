<template>
  <div class="edit-expense-modal-container" @click="goBack">
    <GenericForm @click.stop :fields="fields" @submit="onSubmit"></GenericForm>
  </div>
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
    goBack()
    return
  }
  createExpense({
    monthNum: +route.params.month,
    year: +route.params.year!,
    name: formData.name,
    amount: formData.amount,
  })

  goBack()
}

const router = useRouter()
function goBack() {
  router.push({
    path: `/overview/${route.params.year}/${route.params.month}`,
  })
}
</script>

<style lang="scss" scoped>
.edit-expense-modal-container {
  // position: absolute;
  grid-row: 1 / span 2;
  grid-column: 1 / span 3;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: black;

  form {
    background-color: gray;
    border: 1px solid black;
    padding: 2rem;
  }
}
</style>
