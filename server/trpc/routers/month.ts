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
      return ctx.prisma.monthData.findMany({
        where: {
          year: input.year,
        },
        include: {
          expenses: true,
        },
      })
    }),
  getByNumber: publicProcedure
    .input(
      z.object({
        year: z.number().int().min(0).max(9999),
        monthNum: z.number().int().min(1).max(12),
      }),
    )
    .query(({input, ctx}) => {
      return ctx.prisma.monthData.findFirst({
        where: {
          year: input.year,
          month: input.monthNum,
        },
      })
    }),
  create: publicProcedure
    .input(
      z.object({
        year: z.number().int().min(0).max(9999),
        monthNum: z.number().int().min(1).max(12),
      }),
    )
    .mutation(({input, ctx}) => {
      return ctx.prisma.monthData.create({
        data: {
          year: input.year,
          month: input.monthNum,
        },
      })
    }),
  updateBudget: publicProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        income: z.number().int().min(0),
      }),
    )
    .mutation(({input, ctx}) => {
      return ctx.prisma.monthData.update({
        where: {
          id: input.id,
        },
        data: {
          income: input.income,
        },
      })
    }),
})
