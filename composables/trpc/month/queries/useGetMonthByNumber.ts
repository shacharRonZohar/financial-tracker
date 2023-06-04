import {UseMutationOptions, useQuery, useQueryClient} from '@tanstack/vue-query'
import type {MonthGetByNumberInput} from '~/types/trpc'
import type {MapToMaybeRefInputs, MapToRef} from '~/types/utils'

type UseGetMonthByNumberOptions = MapToRef<MonthGetByNumberInput> & {
  queryKey: Ref<any[]>
}

export function useGetMonthByNumber({queryKey, year, monthNum}: UseGetMonthByNumberOptions) {
  const {$client} = useNuxtApp()
  const queryFn = () => $client.month.getByNumber.query({year: year.value, monthNum: monthNum.value})
  const {data: month, error: monthError, isLoading: isLoadingMonth, refetch: refetchMonth} = useQuery(queryKey.value, queryFn)

  return {
    queryKey,
    month,
    monthError,
    isLoadingMonth,
    refetchMonth,
  }
}
