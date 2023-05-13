import type {MonthGetAllInput} from '~/types/trpc'
import type {MapToMaybeRefInputs} from '~/types/utils'

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
