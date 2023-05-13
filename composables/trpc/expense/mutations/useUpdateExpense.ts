import {useQueryClient} from '@tanstack/vue-query'
import {useOptimisticMutation} from '../../useOptimisticUpdate'
import type {ExpenseUpdateInput} from '~/types/trpc'
import {Expense} from '@prisma/client'

export function useUpdateExpense() {
  const {$client} = useNuxtApp()

  const queryKey = useQueryParamsQueryKey(['month', 'getByNumber'])

  const {
    mutateAsync: updateExpense,
    error: expenseError,
    isLoading: isLoadingUpdateExpense,
  } = useOptimisticMutation<
    Expense,
    {
      expenseId: string
      newName: string
      newAmount: number
    }
  >({
    mutationFn: (payload) => $client.expense.update.mutate(payload),
    queryKey: queryKey.value,
  })
  return {
    updateExpense,
    expenseError,
    isLoadingUpdateExpense,
  }
}
