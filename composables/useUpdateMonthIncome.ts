import {useMutation, useQueryClient} from '@tanstack/vue-query'
import {useDebounceFn} from '@vueuse/core'
import {MaybeRef} from '~/models/utils'

interface UseUpdateMonthIncomeOptions {
  monthIdInput: MaybeRef<string>
  newIncome: Ref<number>
}
export function useUpdateMonthIncome({monthIdInput, newIncome}: UseUpdateMonthIncomeOptions) {
  const {$client} = useNuxtApp()
  const queryClient = useQueryClient()

  const queryParams = useQueryParams({routeName: 'month'})

  const monthId = ref(monthIdInput)

  const debouncedUpdateIncome = useDebounceFn(() => {
    return $client.month.updateIncome.mutate({monthId: monthId.value, newIncome: newIncome.value})
  }, 1000)

  const queryKey = ['month', 'getByNumber', {year: queryParams.value.year, monthNum: queryParams.value.monthNum}]
  const {
    mutate: updateMonthIncome,
    error: monthIncomeError,
    isLoading: isLoadingUpdateMonthIncome,
  } = useMutation({
    mutationFn: debouncedUpdateIncome,
    onMutate: async () => {
      await queryClient.cancelQueries(['month', 'getByNumber', queryKey])
      const previousMonth = queryClient.getQueryData(queryKey)
      queryClient.setQueryData(queryKey, (old: any) => {
        return {
          ...old,
          income: newIncome.value,
        }
      })
      return {previousMonth}
    },
    onError: (err, payload, context) => {
      queryClient.setQueryData(queryKey, context?.previousMonth)
    },
  })

  return {
    updateMonthIncome,
    monthIncomeError,
    isLoadingUpdateMonthIncome,
  }
}
