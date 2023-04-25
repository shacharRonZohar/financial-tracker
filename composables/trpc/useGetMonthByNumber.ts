import type {AsyncDataOptions} from 'nuxt/app'
import type {MonthGetByNumberInput} from '~/models/trpc'
import type {MapToMaybeRefInputs, MaybeRef} from '~/models/utils'

type UseGetMonthByNumberOptions = MapToMaybeRefInputs<MonthGetByNumberInput>

export function useGetMonthByNumber({yearInput, monthInput}: UseGetMonthByNumberOptions) {
  const {$client} = useNuxtApp()
  const year = ref(yearInput)
  const month = ref(monthInput)

  return $client.month.getByNumber.useQuery(
    {year: year.value, month: month.value},
    {
      lazy: true,
      server: false,
      watch: [year, month],
    },
  )
}
