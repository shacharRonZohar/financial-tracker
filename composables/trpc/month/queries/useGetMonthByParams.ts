import {useGetMonthByNumber} from './useGetMonthByNumber'

export function useGetMonthByParams() {
  const {year, month} = useYearMonthParams()
  const queryKey = useParamsQueryKey(['month', 'getByNumber'])
  return useGetMonthByNumber({queryKey, year, monthNum: month})
}
