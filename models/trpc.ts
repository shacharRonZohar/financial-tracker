import type {inferRouterInputs, inferRouterOutputs} from '@trpc/server'
import type {AppRouter} from '~~/server/trpc/routers/index'

type RouterInputs = inferRouterInputs<AppRouter>
type RouterOutputs = inferRouterOutputs<AppRouter>

export type MonthGetAllInput = RouterInputs['month']['getAll']
export type MonthGetAllOutput = RouterOutputs['month']['getAll']

export type MonthGetByNumberInput = RouterInputs['month']['getByNumber']
export type MonthGetByNumberOutput = RouterOutputs['month']['getByNumber']

export type MonthCreateInput = RouterInputs['month']['create']
export type MonthCreateOutput = RouterOutputs['month']['create']

export type MonthUpdateBudgetInput = RouterInputs['month']['updateIncome']
export type MonthUpdateBudgetOutput = RouterOutputs['month']['updateIncome']
