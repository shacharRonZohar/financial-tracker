import {useMutation, useQueryClient} from '@tanstack/vue-query'

interface UseOptimisticMutationOptions<TData> {
  mutationFn: (payload: any) => Promise<TData>
  queryKey: any[]
}

export function useOptimisticMutation<TData, TPayload>({mutationFn, queryKey}: UseOptimisticMutationOptions<TData>) {
  const queryClient = useQueryClient()
  return useMutation<TData, unknown, TPayload, {previousData: unknown}>({
    mutationFn,
    onMutate: async (payload) => {
      await queryClient.cancelQueries(queryKey)
      const previousData = queryClient.getQueryData(queryKey)
      queryClient.setQueryData(queryKey, (old: any) => {
        return {
          ...old,
          ...payload,
        }
      })
      return {previousData}
    },
    onError: (err, payload, context) => {
      queryClient.setQueryData(queryKey, context?.previousData)
    },
  })
}
