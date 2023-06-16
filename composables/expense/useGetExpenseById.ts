import {useQueryClient} from '@tanstack/vue-query'
import type {Expense, MonthDataWithExpenses} from '~/types/MonthData'

interface UseGetExpenseByIdOptions {
  id: string | Ref<string>
}
export function useGetExpenseById({id}: UseGetExpenseByIdOptions) {
  const expense = ref<Expense>()
  const expenseId = ref(id)

  const {month} = useGetMonthByQueryParams()
  // const queryKey = useQueryParamsQueryKey(['month', 'getByNumber'])

  function getExpenseById() {
    // const monthData = queryClient.getQueryData<MonthDataWithExpenses>(queryKey)
    // console.log('monthData', monthData)
    // console.log(month.value)

    console.log('month.value', month.value)
    if (!month.value) return
    console.log('id', id)
    expense.value = month.value.expenses.find((expense: Expense) => expense.id === expenseId.value)
    console.log(expense.value)
    // return expense
  }

  watch(
    month,
    (newMonth, oldMonth) => {
      if (!newMonth) return
      getExpenseById()
    },
    {deep: true},
  )
  return {
    expense,
    getExpenseById,
  }
}
