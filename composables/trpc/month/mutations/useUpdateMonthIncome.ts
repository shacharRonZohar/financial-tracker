import {useMutation, useQueryClient} from '@tanstack/vue-query'
import {useDebounceFn} from '@vueuse/core'
import {MaybeRef} from '~/types/utils'
import type {MonthDataWithExpenses} from '~/types/MonthData'
import {MonthData} from '@prisma/client'
interface UseUpdateMonthIncomeOptions {
  // monthIdInput: MaybeRef<string>
  newIncome: Ref<number>
}
export function useUpdateMonthIncome({newIncome}: UseUpdateMonthIncomeOptions) {
  const {$client} = useNuxtApp()
  const queryClient = useQueryClient()
  const queryKey = useParamsQueryKey(['month', 'getByNumber'])
  const {year, month: monthNum} = useYearMonthParams()
  const debouncedUpdateIncome = useDebounceFn(
    () => $client.month.updateIncome.mutate({year: year.value, monthNum: monthNum.value, newIncome: newIncome.value}),
    1000,
  )

  const {
    mutateAsync: updateMonthIncome,
    error: monthIncomeError,
    isLoading: isLoadingUpdateMonthIncome,
  } = useMutation<MonthData, unknown, {income: number}, {previousData: unknown}>({
    mutationFn: async () => await debouncedUpdateIncome(),
    onMutate: async (payload) => {
      await queryClient.cancelQueries(queryKey)
      const previousData = queryClient.getQueryData(queryKey)
      queryClient.setQueryData(queryKey, (old: any) => {
        console.log(payload)
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
