import {RoutesNamesList} from '~/.nuxt/typed-router'

export function useParams(routeName: RoutesNamesList) {
  const {params} = toRefs(useRoute(routeName))
  return params
}
