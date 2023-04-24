import {z} from 'zod'

import {publicProcedure, router} from '../trpc'

export const monthRouter = router({
  getMonths: publicProcedure
    .input(
      z.object({
        year: z.number().int().min(0).max(9999),
      }),
    )
    .query(({input}) => {
      // throw new Error()
      // setTimeout(() => {
      return input.year * 5
      // }, 1000)
      // return [Math.random()]
    }),
})
