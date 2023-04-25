import type {AsyncDataOptions} from 'nuxt/app'
import type {MonthGetByNumberInput} from '~/models/trpc'
import type {MapToMaybeRefInputs, MaybeRef} from '~/models/utils'

type UseGetMonthByNumberOptions = MapToMaybeRefInputs<MonthGetByNumberInput>

export function useGetMonthByNumber({yearInput, monthNumInput}: UseGetMonthByNumberOptions) {
  const {$client} = useNuxtApp()
  const year = ref(yearInput)
  const monthNum = ref(monthNumInput)

  return $client.month.getByNumber.useQuery(
    {year: year.value, monthNum: monthNum.value},
    {
      lazy: true,
      server: false,
      watch: [year, monthNum],
    },
  )
}
