import z from 'zod'

import type {FormField, FormFieldArray} from '~/types/Form'

export const formService = {
  getSchemaFromFields,
  getDefaultFieldValByType,
}

function getSchemaFromFields<T extends FormFieldArray>(fields: T) {
  const defaultValidations = {
    text: z.string(),
    number: z.number(),
    email: z.string().email(),
    password: z.string(),
    tel: z.string(),
    url: z.string().url(),
  } as const

  const schemaObject = fields.reduce((acc, field) => {
    acc[field.name] = field.validation ?? defaultValidations[field.type]
    return acc
  }, {} as Record<string, z.ZodTypeAny>)

  return z.object(schemaObject)
}

function getDefaultFieldValByType(type: FormField['type']) {
  const defaultValues = {
    text: '',
    number: 0,
    email: '',
    password: '',
    tel: '',
    url: '',
  } as const
  return defaultValues[type]
}
