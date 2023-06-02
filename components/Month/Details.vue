<template>
  <div>
    <button @click="onClick">Test</button>
    <h1>{{ monthName }}</h1>
    <p>Income: <input type="number" v-model="income" /></p>
    <div>
      <h1>Expenses:</h1>
      <GenericList :items="monthData.expenses">
        <template #default="{item}">
          <GenericListPreview :item="item" @delete-item="onRemoveExpense">
            <template #default="{item}">
              <ExpensePreview :expense="item" />
            </template>
          </GenericListPreview>
        </template>
      </GenericList>
    </div>
    <p>Balance: {{ balance }}</p>
  </div>
</template>

<script setup lang="ts">
import {MonthDataWithExpenses} from '~/types/MonthData'

interface MonthDetailsProps {
  monthData: MonthDataWithExpenses
}

const props = defineProps<MonthDetailsProps>()

interface MonthDetailsEmits {
  (event: 'update-income', newIncome: number): void
}
const emit = defineEmits<MonthDetailsEmits>()
// For Test:
const newAmount = ref(0)
const {updateExpense} = useUpdateExpense()
const onClick = () => {
  newAmount.value++

  updateExpense({
    expenseId: 'b9335d78-d00d-498f-b7d9-ec040fafc8f1',
    amount: newAmount.value,
  })
}
const {removeExpense} = useRemoveExpense()

function onRemoveExpense(expenseId: string) {
  removeExpense(expenseId)
}
const income = computed({
  get: () => props.monthData.income,
  set: (value) => emit('update-income', value),
})

const balance = computed(() => {
  return props.monthData.income - (props.monthData.expenses?.reduce((acc, cur) => acc + cur.amount, 0) ?? 0)
})

const monthName = computed(() => {
  const monthNames = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december',
  ]
  return monthNames[props.monthData.month - 1]
})
</script>
