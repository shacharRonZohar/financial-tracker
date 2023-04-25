import {MaybeRef} from '~~/models/utils'

interface UseCreateMonthOptions {
  yearInput: MaybeRef<number>
}

export function useCreateMonth({yearInput}: UseCreateMonthOptions) {
  const {$client} = useNuxtApp()
  const year = ref(yearInput)

  function createMonth(month: number) {
    return useAsyncData(() => $client.month.create.mutate({year: year.value, month}))
  }

  return {
    createMonth,
  }
}
