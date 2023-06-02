import type {MonthGetAllOutput} from '~/types/trpc'

export type MonthDataWithExpenses = MonthGetAllOutput[number]

export type Expense = MonthDataWithExpenses['expenses'][number]
