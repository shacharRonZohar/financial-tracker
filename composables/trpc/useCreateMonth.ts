import {MonthCreateInput} from '~/models/trpc'
import {MapToMaybeRefInputs, MaybeRef} from '~~/models/utils'

type UseCreateMonthOptions = MapToMaybeRefInputs<MonthCreateInput>

export function useCreateMonth({yearInput, monthNumInput}: UseCreateMonthOptions) {
  const {$client} = useNuxtApp()
  const year = ref(yearInput)
  const monthNum = ref(monthNumInput)

  return useAsyncData(() => $client.month.create.mutate({year: year.value, monthNum: monthNum.value}))
}
