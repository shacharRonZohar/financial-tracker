import {useMutation, useQueryClient} from '@tanstack/vue-query'
import type {MonthDataWithExpenses} from '~/types/MonthData'
import type {ExpenseDeleteInput} from '~/types/trpc'

export function useRemoveExpense() {
  const {$client} = useNuxtApp()
  const queryClient = useQueryClient()
  const queryKey = useQueryParamsQueryKey(['month', 'getByNumber'])

  const {
    mutateAsync: removeExpense,
    error: expenseError,
    isLoading: isLoadingRemoveExpense,
  } = useMutation({
    mutationFn: (payload: ExpenseDeleteInput) => $client.expense.delete.mutate(payload),
    onMutate: async (payload) => {
      await queryClient.cancelQueries(queryKey)
      const previousValue = queryClient.getQueryData<MonthDataWithExpenses>(queryKey)
      queryClient.setQueryData<MonthDataWithExpenses>(queryKey, (old) => {
        if (!old) return old
        return {
          ...old,
          expenses: old.expenses.filter((expense) => expense.id !== payload),
        }
      })
      return {previousValue}
    },
  })

  return {
    removeExpense,
    expenseError,
    isLoadingRemoveExpense,
  }
}
