import {MaybeRef} from '~~/models/utils'

export function useCreateMonth({year}: {year: MaybeRef<number>}) {
  const {$client} = useNuxtApp()
  const isYearRef = isRef(year)

  function createMonth(month:number) {
    return useAsyncData(()=>$client.month.create.mutate({year: isYearRef ? year.value : year,month}))
  }

  return {
    createMonth,
  }
}
