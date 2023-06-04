export function useParamsQueryKey(prefix: string[]) {
  const params = useParams('month-index-year-month')
  const queryKey = computed(() => [...prefix, {year: params.value.year, monthNum: params.value.month}])
  return queryKey
}
