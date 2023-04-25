import { MaybeRef } from '~~/models/utils'

export function useUpdateBudget({id}:{id:MaybeRef<string>}) {
  const {$client} = useNuxtApp()
  const isIdRef = isRef(id)

  function updateBudget(budget:number) {
    return useAsyncData(()=>$client.month.updateBudget.mutate({id:isIdRef? id.value : id,budget}))
  }

  return {
    updateBudget,
  }
}
