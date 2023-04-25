import {MaybeRef} from '~~/models/utils'

export function useGetMonths({year}: {year: MaybeRef<number>}) {
  const {$client} = useNuxtApp()
  const isYearRef = isRef(year)

  return useAsyncData(() => $client.month.get.query({year: isYearRef ? year.value : year}), {
    lazy: true,
    server: false,
    watch: isYearRef ? [year] : [],
  })
}
