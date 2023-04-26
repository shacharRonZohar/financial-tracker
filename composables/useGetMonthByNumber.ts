import {UseMutationOptions, useQuery, useQueryClient} from '@tanstack/vue-query'
import type {MonthGetByNumberInput} from '~/models/trpc'
import type {MapToMaybeRefInputs, MaybeRef} from '~/models/utils'

type UseGetMonthByNumberOptions = MapToMaybeRefInputs<MonthGetByNumberInput> & {
  queryKey: Ref<any[]>
}

export function useGetMonthByNumber({queryKey, yearInput, monthNumInput}: UseGetMonthByNumberOptions) {
  const {$client} = useNuxtApp()

  const year = ref(yearInput)
  const monthNum = ref(monthNumInput)

  const queryFn = () => $client.month.getByNumber.query({year: year.value, monthNum: monthNum.value})

  const {
    data: month,
    error: monthError,
    isLoading: isLoadingMonth,
    refetch: refetchMonth,
  } = useQuery(queryKey.value, queryFn)

  return {
    queryKey,
    month,
    monthError,
    isLoadingMonth,
    refetchMonth,
  }
}
