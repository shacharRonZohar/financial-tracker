import {MaybeRef} from '~/models/utils'

interface UseUpdateMonthIncomeOptions {
  monthId: string
  newIncome: number
}

export function useUpdateMonthIncome({monthId, newIncome}: UseUpdateMonthIncomeOptions) {
  const {$client} = useNuxtApp()
  return $client.month.updateIncome.mutate({id: monthId, income: +newIncome})
}
