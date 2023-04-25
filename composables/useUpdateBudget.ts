import {MaybeRef} from '~~/models/utils'

interface UseUpdateBudgetOptions {
  inputId: MaybeRef<string>
}

export function useUpdateBudget({inputId}: UseUpdateBudgetOptions) {
  const {$client} = useNuxtApp()
  const id = ref(inputId)

  function updateBudget(budget: number) {
    return useAsyncData(() => $client.month.updateIncome.mutate({id: id.value, budget}))
  }

  return {
    updateBudget,
  }
}
