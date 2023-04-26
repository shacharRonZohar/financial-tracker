import {z} from 'zod'
import {publicProcedure, router} from '../trpc'

import {monthRouter} from './month'
import {expenseRouter} from './expense'

export const appRouter = router({
  month: monthRouter,
  expense: expenseRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
