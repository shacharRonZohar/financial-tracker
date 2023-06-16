import {RoutesNamesList} from '~/.nuxt/typed-router'

export function useYearMonthParams() {
  // nuxt-typed-router has a bug with nested routes, so I do some bad type coercion in this file until it's fixed
  interface Route {
    params: {
      year: string
      month: string
    }
  }
  const {params} = toRefs(useRoute('overview-year-index-month-index-edit-id') as Route)

  const router = useRouter()

  const year = computed({
    get: () => Number(params.value.year),
    set: (val) =>
      router.push({
        name: (params.value.month ? 'overview-year-index-month' : 'overview-year') as RoutesNamesList,
        params: {...params.value, year: val},
      }),
  })

  const month = computed({
    get: () => Number(params.value.month),
    set: (val) => router.push({name: 'overview-year-index-month' as RoutesNamesList, params: {...params.value, month: val}}),
  })

  return {
    year,
    month,
  }
}
