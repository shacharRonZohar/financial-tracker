import type z from 'zod'

export interface FormField {
  name: string
  type: 'text' | 'number' | 'email' | 'password' | 'tel' | 'url'
  label: string
  placeholder: string
  defaultValue?: string | number
  validation?: z.ZodTypeAny
}

export type FormFieldArray = FormField[]
