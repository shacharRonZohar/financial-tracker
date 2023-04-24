import {MaybeRef} from '~~/models/utils'

export function useGetMonths({searchYear}: {searchYear: MaybeRef<number>}) {
  const year = ref(searchYear)
  const {$client} = useNuxtApp()

  return useAsyncData(() => $client.month.getMonths.query({year: year.value}), {
    lazy: true,
    server: false,
    watch: [year],
  })
}
