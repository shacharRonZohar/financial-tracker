<template>
  <div class="month-details-container">
    <div class="stats-container">
      <h3>Income: <input type="number" v-model="income" /></h3>
      <h3>Balance: {{ balance }}</h3>
    </div>
    <div>
      <h2>Expenses:</h2>
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

<style scoped lang="scss">
.month-details-container {
  display: grid;
  grid-template-columns: 1fr 5fr;
  gap: 2rem;
  .stats-container {
    // grid-column: 1;
    // grid-row: 1 / 12;
  }
  // flex-direction: column;
  // align-items: center;

  // > * {
  //   display: flex;
  //   // flex-direction: column;
  //   align-items: center;
  //   // margin: 0.5rem;
  //   justify-content: space-between;
  // }

  input {
    border: none;
  }
}

.stats-container {
  justify-self: flex-start;
}
</style>
