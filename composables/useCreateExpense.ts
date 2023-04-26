import {useMutation, useQueryClient} from '@tanstack/vue-query'
import {MonthDataWithExpenses} from '~/models/MonthData'

import type {ExpenseCreateInput, ExpenseCreateOutput} from '~/models/trpc'

export function useCreateExpense() {
  const {$client} = useNuxtApp()
  const queryClient = useQueryClient()

  const queryKey = useQueryParamsQueryKey(['month', 'getByNumber'])

  const {
    mutateAsync: createExpense,
    error: createExpenseError,
    isLoading: isLoadingCreateExpense,
  } = useMutation({
    mutationFn: (payload: ExpenseCreateInput) => $client.expense.create.mutate(payload),
    onSuccess: (data) => {
      const currentData = queryClient.getQueryData<MonthDataWithExpenses>(queryKey.value)
      if (currentData) {
        queryClient.setQueryData<MonthDataWithExpenses>(queryKey.value, {
          ...currentData,
          expenses: [...currentData.expenses, data],
        })
      }
    },
  })

  return {
    createExpense,
    createExpenseError,
    isLoadingCreateExpense,
  }
}
