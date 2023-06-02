import {useMutation, useQueryClient} from '@tanstack/vue-query'
import {useOptimisticMutation} from '../../useOptimisticUpdate'
import type {ExpenseUpdateInput} from '~/types/trpc'
import {MonthDataWithExpenses} from '~/types/MonthData'
// import {Expense} from '@prisma/client'

// interface UseUpdateExpenseOptions {
//   monthIdInput: string | Ref<string>
// }

export function useUpdateExpense() {
  const {$client} = useNuxtApp()
  const queryClient = useQueryClient()
  const queryKey = useQueryParamsQueryKey(['month', 'getByNumber'])

  const {
    mutateAsync: updateExpense,
    error: expenseError,
    isLoading: isLoadingUpdateExpense,
  } = useMutation({
    mutationFn: (payload: ExpenseUpdateInput) => $client.expense.update.mutate(payload),
    onMutate: async (payload) => {
      await queryClient.cancelQueries(queryKey.value)
      const previousMonth = queryClient.getQueryData<MonthDataWithExpenses>(queryKey.value)
      if (previousMonth) {
        const previousMonthExpenses = previousMonth.expenses
        const newMonthExpenses = previousMonthExpenses.map((expense) => {
          if (expense.id === payload.expenseId) {
            return {
              ...expense,
              ...payload,
            }
          }
          return expense
        })
        queryClient.setQueryData<MonthDataWithExpenses>(queryKey.value, {
          ...previousMonth,
          expenses: newMonthExpenses,
        })
      }
      return {previousMonth}
    },
    onError: (err, payload, context) => {
      if (context?.previousMonth) {
        queryClient.setQueryData<MonthDataWithExpenses>(queryKey.value, context.previousMonth)
      }
    },
  })

  return {
    updateExpense,
    expenseError,
    isLoadingUpdateExpense,
  }
}
