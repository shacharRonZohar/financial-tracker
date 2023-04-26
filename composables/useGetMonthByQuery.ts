import {useGetMonthByNumber} from './useGetMonthByNumber'

export function useGetMonthByQuery() {
  const query = useQueryParams({routeName: 'month'})
  return useGetMonthByNumber({yearInput: query.value.year, monthNumInput: query.value.monthNum})
}
