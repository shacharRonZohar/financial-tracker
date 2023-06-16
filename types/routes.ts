// THIS FILE IS DEPRACTED FOR NOW
import {RoutesNamesList} from '~/.nuxt/typed-router'

// interface RouteDefaultQueryShape {
//   [index: RoutesNamesList]: any
// }

// a mapped object type that takes a union of strings and returns an object with those strings as keys and null as values
type MapTest<T extends string> = {
  [K in T]: any
}

export const routeDefaultQueryMap = {
  index: null,

  'month-index-year-month': {
    year: new Date().getFullYear(),
    monthNum: new Date().getMonth() + 1,
  },
  'month-index-create': null,
  'month-index-year-month-update': null,
} satisfies MapTest<RoutesNamesList>

export type RouteDefaultQueryMap = typeof routeDefaultQueryMap
