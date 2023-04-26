import {useQuery} from '@tanstack/vue-query'
import type {MonthGetByNumberInput} from '~/models/trpc'
import type {MapToMaybeRefInputs, MaybeRef} from '~/models/utils'

type UseGetMonthByNumberOptions = MapToMaybeRefInputs<MonthGetByNumberInput>

export function useGetMonthByNumber({yearInput, monthNumInput}: UseGetMonthByNumberOptions) {
  const {$client} = useNuxtApp()
  const year = ref(yearInput)
  const monthNum = ref(monthNumInput)

  const queryKey = ['month', 'getByNumber', {year: year.value, monthNum: monthNum.value}]
  const queryFn = () => $client.month.getByNumber.query({year: year.value, monthNum: monthNum.value})

  const {data: month, error: monthError, isLoading: isLoadingMonth, refetch: refetchMonth} = useQuery(queryKey, queryFn)

  return {
    month,
    monthError,
    isLoadingMonth,
    refetchMonth,
  }
}
