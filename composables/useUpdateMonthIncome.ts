import {useMutation, useQueryClient} from '@tanstack/vue-query'
import {useDebounceFn} from '@vueuse/core'
import {MaybeRef} from '~/models/utils'
import type {MonthData} from '@prisma/client'
interface UseUpdateMonthIncomeOptions {
  monthIdInput: MaybeRef<string>
  newIncome: Ref<number>
}
export function useUpdateMonthIncome({monthIdInput, newIncome}: UseUpdateMonthIncomeOptions) {
  const {$client} = useNuxtApp()

  const queryKey = useQueryParamsQueryKey(['month', 'getByNumber'])

  const monthId = ref(monthIdInput)

  const debouncedUpdateIncome = useDebounceFn(
    () => $client.month.updateIncome.mutate({monthId: monthId.value, newIncome: newIncome.value}),
    1000,
  )

  const {
    mutateAsync: updateMonthIncome,
    error: monthIncomeError,
    isLoading: isLoadingUpdateMonthIncome,
  } = useOptimisticMutation<
    MonthData,
    {
      income: number
    }
  >({
    mutationFn: async () => await debouncedUpdateIncome(),
    queryKey: queryKey.value,
  })

  return {
    updateMonthIncome,
    monthIncomeError,
    isLoadingUpdateMonthIncome,
  }
}
