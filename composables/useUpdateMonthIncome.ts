import {MaybeRef} from '~/models/utils'

interface UseUpdateMonthIncomeOptions {
  monthId: string
  newIncome: number
}

export function useUpdateMonthIncome({monthId, newIncome}: UseUpdateMonthIncomeOptions) {
  const {$client} = useNuxtApp()
  console.log('useUpdateMonthIncome', {monthId, newIncome})
  return $client.month.updateIncome.mutate({id: monthId, income: +newIncome})
}
