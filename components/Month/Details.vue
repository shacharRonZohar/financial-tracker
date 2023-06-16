<template>
  <div>
    <h1>{{ monthName }}</h1>
    <p>Income: <input type="number" v-model="income" /></p>
    <div>
      <h1>Expenses:</h1>
      <GenericList :items="monthData.expenses">
        <template #default="{item: expense}">
          <GenericListPreview :item="expense" @delete-item="onRemoveExpense" @update-item="onUpdateExpense">
            <template #default="{item: expenseItem}">
              <ExpensePreview :expense="expenseItem" />
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

const router = useRouter()
interface route {
  params: {
    year: string
    month: string
  }
}
const route = useRoute() as route // nuxt-typed-router has a bug with nested routes, so I manually made the types for now

function onUpdateExpense(expenseId: string) {
  console.log('update expense', expenseId)
  router.push({
    name: 'overview-year-index-month-index-edit-id',
    params: {
      ...route.params,
      id: expenseId,
    },
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
