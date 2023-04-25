import {z} from 'zod'

import {publicProcedure, router} from '../trpc'

export const monthRouter = router({
  getAll: publicProcedure
    .input(
      z.object({
        year: z.number().int().min(0).max(9999),
      }),
    )
    .query(({input, ctx}) => {
      return ctx.prisma.month.findMany({
        where: {
          year: input.year,
        },
      })
    }),
  getByNumber: publicProcedure
    .input(
      z.object({
        year: z.number().int().min(0).max(9999),
        month: z.number().int().min(1).max(12),
      }),
    )
    .query(({input, ctx}) => {
      return ctx.prisma.month.findFirst({
        where: {
          year: input.year,
          month: input.month,
        },
      })
    }),
  create: publicProcedure
    .input(
      z.object({
        year: z.number().int().min(0).max(9999),
        month: z.number().int().min(1).max(12),
      }),
    )
    .mutation(({input, ctx}) => {
      return ctx.prisma.month.create({
        data: {
          year: input.year,
          month: input.month,
        },
      })
    }),
  updateBudget: publicProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        budget: z.number().int().min(0),
      }),
    )
    .mutation(({input, ctx}) => {
      return ctx.prisma.month.update({
        where: {
          id: input.id,
        },
        data: {
          budget: input.budget,
        },
      })
    }),
})
