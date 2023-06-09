export function useYearMonthParams() {
  const route = useRoute()
  // const yearParams = useParams('overview-year')
  const {params} = toRefs(useRoute('overview-year-index-month'))

  const router = useRouter()

  const year = computed({
    get: () => Number(params.value.year),
    set: (val) =>
      router.push({
        name: params.value.month ? 'overview-year-index-month' : 'overview-year',
        params: {...params.value, year: val},
      }),
  })

  const month = computed({
    get: () => Number(params.value.month),
    set: (val) => router.push({name: 'overview-year-index-month', params: {...params.value, month: val}}),
  })

  onMounted(() => {
    // if (route.name !== 'month-index-year-month' || (params.value.year && params.value.month)) return
    // const newParams = {} as typeof params.value
    // if (!params.value.year) newParams.year = new Date().getFullYear().toString()
    // if (!params.value.month) newParams.month = (new Date().getMonth() + 1).toString()
    // router.push({params: newParams})
  })

  return {
    year,
    month,
  }
}
