export function useParamsQueryKey(prefix: string[]) {
  const {year, month} = useYearMonthParams()
  const queryKey = computed(() => [...prefix, {year: year.value, monthNum: month.value}])
  return queryKey
}
