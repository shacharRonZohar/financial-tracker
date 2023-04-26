import type {RoutesNamesList} from '@typed-router'
// import {TypedRouteFromName} from '~/.nuxt/typed-router/__router'
import {routeDefaultQueryMap, type RouteDefaultQueryMap} from '~/models/routes'
// import { RoutesNamesList } from '~/.nuxt/typed-router/__routes'

interface UseQueryParamsOptions<TRoute extends RoutesNamesList> {
  routeName: TRoute
}

export function useQueryParams<TRoute extends RoutesNamesList>({routeName}: UseQueryParamsOptions<TRoute>) {
  const {query: routeQuery} = toRefs(useRoute(routeName))
  const defaultQueryForRoute = routeDefaultQueryMap[routeName]

  const query = computed<RouteDefaultQueryMap[TRoute]>(() => {
    console.log('hi')
    if (!defaultQueryForRoute) {
      return routeQuery.value
    }
    const query = Object.fromEntries(
      Object.entries(defaultQueryForRoute).map(([key, value]) => {
        const queryValue = routeQuery.value[key]
        if (queryValue === undefined) {
          return [key, value]
        }
        if (typeof queryValue !== typeof value && typeof value === 'number') {
          return [key, Number(queryValue)]
        }

        return [key, queryValue]
      }),
    )
    return query
  })
  return query
}

// const test = useRouteQuery({routeName: 'month', defaultQuery: {yer: () => 2021, monthNum: () => 2}})
