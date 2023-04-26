import {useMutation, useQueryClient} from '@tanstack/vue-query'

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
      queryClient.setQueryData<ExpenseCreateOutput>(queryKey.value, data)
    },
  })

  return {
    createExpense,
    createExpenseError,
    isLoadingCreateExpense,
  }
}
