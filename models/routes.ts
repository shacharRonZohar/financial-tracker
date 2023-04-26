export const routeDefaultQueryMap = {
  index: null,
  month: {
    year: new Date().getFullYear(),
    monthNum: new Date().getMonth() + 1,
  },
} as const

export type RouteDefaultQueryMap = typeof routeDefaultQueryMap
