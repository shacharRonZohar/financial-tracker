import {useMutation, useQueryClient} from '@tanstack/vue-query'
import {useDebounceFn} from '@vueuse/core'
import {MaybeRef} from '~/types/utils'
import type {MonthDataWithExpenses} from '~/types/MonthData'
interface UseUpdateMonthIncomeOptions {
  monthIdInput: MaybeRef<string>
  newIncome: Ref<number>
}
export function useUpdateMonthIncome({monthIdInput, newIncome}: UseUpdateMonthIncomeOptions) {
  const monthId = ref(monthIdInput)

  const debouncedUpdateIncome = useDebounceFn(
    () => $client.month.updateIncome.mutate({monthId: monthId.value, newIncome: newIncome.value}),
    1000,
  )
  const {$client} = useNuxtApp()
  const queryClient = useQueryClient()
  const queryKey = useQueryParamsQueryKey(['month', 'getByNumber'])

  const {
    mutateAsync: updateMonthIncome,
    error: monthIncomeError,
    isLoading: isLoadingUpdateMonthIncome,
  } = useMutation<MonthDataWithExpenses, unknown, {income: number}, {previousData: unknown}>({
    mutationFn: async () => await debouncedUpdateIncome(),
    onMutate: async (payload) => {
      await queryClient.cancelQueries(queryKey)
      const previousData = queryClient.getQueryData(queryKey)
      queryClient.setQueryData(queryKey, (old: any) => {
        return {
          ...old,
          ...payload,
        }
      })
      return {previousData}
    },
    onError: (err, payload, context) => {
      queryClient.setQueryData(queryKey, context?.previousData)
    },
  })

  return {
    updateMonthIncome,
    monthIncomeError,
    isLoadingUpdateMonthIncome,
  }
}
