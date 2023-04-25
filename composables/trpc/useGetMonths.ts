import type {MonthGetAllInput} from '~/models/trpc'
import type {MapToMaybeRefInputs} from '~~/models/utils'

type UseGetMonthsOptions = MapToMaybeRefInputs<MonthGetAllInput>

export function useGetMonths({yearInput}: UseGetMonthsOptions) {
  const {$client} = useNuxtApp()
  const year = ref(yearInput)

  return $client.month.getAll.useQuery(
    {year: year.value},
    {
      lazy: true,
      server: false,
      watch: [year],
    },
  )
}
