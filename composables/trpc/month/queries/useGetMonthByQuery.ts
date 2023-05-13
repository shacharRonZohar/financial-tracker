import {useGetMonthByNumber} from './useGetMonthByNumber'

export function useGetMonthByQuery() {
  const query = useQueryParams({routeName: 'month'})
  const queryKey = useQueryParamsQueryKey(['month', 'getByNumber'])
  return useGetMonthByNumber({queryKey, yearInput: query.value.year, monthNumInput: query.value.monthNum})
}
