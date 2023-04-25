// See https://logaretm.com/blog/generic-type-components-with-composition-api/ for an explanation of the magic going on here.

import {defineComponent, h, VNode} from 'vue'
import BaseDataLoading from '~/components/DataLoading/BaseDataLoading.vue'
import {ExtractComponentProps} from '~/models/utils'

type NonGenericProps = Omit<ExtractComponentProps<typeof BaseDataLoading>, 'error' | 'pending' | 'execute'>

interface GenericProps<TValue> extends NonGenericProps {
  data: TValue
}

// interface

export function useGenericDataLoading<TValue = unknown>() {
  const wrapper = defineComponent((props: GenericProps<TValue>, {slots}) => {
    // Returning functions in `setup` means this is the render function
    return () => {
      // We pass the slots through
      return h(BaseDataLoading, props, slots)
    }
  })

  return wrapper as typeof wrapper & {
    new (): {
      $slots: {
        default: (test: TValue) => VNode
      }
    }
  }
}
