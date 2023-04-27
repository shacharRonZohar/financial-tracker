import type z from 'zod'

export interface FormField<T = string | number> {
  readonly name: string
  readonly type: 'text' | 'number' | 'email' | 'password' | 'tel' | 'url'
  readonly label: string
  readonly placeholder: string
  readonly defaultValue?: T
  readonly validation?: z.ZodTypeAny
}

export type FormFieldArray = readonly FormField[]
