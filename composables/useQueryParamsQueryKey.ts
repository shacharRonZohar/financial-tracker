export function useQueryParamsQueryKey(prefix: string[]) {
  const query = useQueryParams({routeName: 'month'})
  const queryKey = computed(() => [...prefix, {year: query.value.year, monthNum: query.value.monthNum}])
  return queryKey
}
