import {z} from 'zod'
import {publicProcedure, router} from '../trpc'

import {monthRouter} from './month'

export const appRouter = router({

  month: monthRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
