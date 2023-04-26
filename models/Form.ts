import type z from 'zod'

export interface FormField {
  name: string
  type: 'text' | 'number' | 'email' | 'password' | 'date' | 'time' | 'datetime-local' | 'month' | 'week' | 'tel' | 'url'
  label: string
  placeholder: string
  validation?: z.ZodTypeAny
}

export type FormFieldArray = FormField[]
