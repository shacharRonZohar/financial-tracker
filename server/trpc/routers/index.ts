import {z} from 'zod'
import {publicProcedure, router} from '../trpc'

import {monthRouter} from './month'

export const appRouter = router({
  month: monthRouter,
  hello: publicProcedure
    .input(
      z.object({
        text: z.string().nullish(),
      }),
    )
    .query(({input}) => {
      return {
        greeting: `hello ${input?.text ?? 'world'}`,
        time: new Date(),
      }
    }),
})

// export type definition of API
export type AppRouter = typeof appRouter
