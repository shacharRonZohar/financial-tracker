export function useYearMonthParams() {
  const params = useParams('month-index-year-month')
  const year = computed(() => +params.value.year)
  const month = computed(() => +params.value.month)

  return {
    year,
    month,
  }
}
