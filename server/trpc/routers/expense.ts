import {z} from 'zod'

import {publicProcedure, router} from '../trpc'

const newExpenseSchema = z.object({
  name: z.string(),
  amount: z.number().int().min(0),
  monthId: z.string(),
})

export const expenseRouter = router({
  // getAll: publicProcedure
  //   .input(
  //     z.object({
  //       year: z.number().int().min(0).max(9999),
  //     }),
  //   )
  //   .query(({input, ctx}) => {
  //     return ctx.prisma.monthData.findMany({
  //       where: {
  //         year: input.year,
  //       },
  //       include: {
  //         expenses: true,
  //       },
  //     })
  //   }),
  // getByNumber: publicProcedure
  //   .input(
  //     z.object({
  //       year: z.number().int().min(0).max(9999),
  //       monthNum: z.number().int().min(1).max(12),
  //     }),
  //   )
  //   .query(({input, ctx}) => {
  //     return ctx.prisma.monthData.findFirst({
  //       where: {
  //         year: input.year,
  //         month: input.monthNum,
  //       },
  //       include: {
  //         expenses: true,
  //       },
  //     })
  //   }),
  create: publicProcedure.input(newExpenseSchema).mutation(({input, ctx}) => {
    console.log('input', input)
    return ctx.prisma.expense.create({
      data: {
        name: input.name,
        amount: input.amount,
        MonthData: {
          connect: {
            id: input.monthId,
          },
        },
      },
    })
  }),
  update: publicProcedure
    .input(
      z.object({
        expenseId: z.string(),
        newName: z.string(),
        newAmount: z.number().int().min(0),
      }),
    )
    .mutation(({input, ctx}) => {
      return ctx.prisma.expense.update({
        where: {
          id: input.expenseId,
        },
        data: {
          name: input.newName,
          amount: input.newAmount,
        },
      })
    }),
  delete: publicProcedure.input(z.string()).mutation(({input, ctx}) => {
    return ctx.prisma.expense.delete({
      where: {
        id: input,
      },
    })
  }),
  // updateIncome: publicProcedure
  //   .input(
  //     z.object({
  //       monthId: z.string(),
  //       newIncome: z.number().int().min(0),
  //     }),
  //   )
  //   .mutation(({input, ctx}) => {
  //     return ctx.prisma.monthData.update({
  //       where: {
  //         id: input.monthId,
  //       },
  //       data: {
  //         income: input.newIncome,
  //       },
  //     })
  //   }),
})
