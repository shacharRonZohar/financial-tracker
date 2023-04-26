<template>
    <div>
        <form @submit="emit('submit', form.fields)">
            <div v-for="field in castProps.fields" :key="field.name">
                <label :for="field.name">{{ field.label }}</label>
                <input v-model="form.fields[field.name].value" :type="field.type" :name="field.name"
                    :placeholder="field.placeholder" />
                <div v-if="form.errors[field.name]">{{ form.errors[field.name] }}</div>
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script setup lang="ts" generic="T extends {
    name: string
    type: 'text' | 'number' | 'email' | 'password'  | 'tel' | 'url'
    label: string
    placeholder: string
    validation?: z.ZodTypeAny
  }[]"
>
import { useDebounce } from '@vueuse/core'
import { defineProps, computed, ref, watch } from 'vue'

import z from 'zod'
const defaultValues = {
    text: '',
    number: 0,
    email: '',
    password: '',
    tel: '',
    url: ''
} as const

const props = defineProps<{
    fields: T
}>()

// This casting is needed because there is a bug in Volar / Vue, should be fixed in Vue 3.3.0
const castProps = props as unknown as { fields: T }

const emit = defineEmits<{
    (event: 'submit', formData: Record<string, any>): void
}>()

const schema = computed(() => getSchemaFromFields(castProps.fields))

const form = ref<{
    fields: Record<string, {
        value: any
        hasChanged: boolean
    }>
    errors: Record<string, any>
}>({
    fields: {},
    errors: {}
})

watch(() => castProps.fields, (newVal) => {
    form.value.fields = newVal.reduce((acc, field) => {
        acc[field.name] = {
            value: getDefaultFieldValByType(field.type),
            hasChanged: false
        }
        return acc
    }, {} as Record<string, any>)
}, { immediate: true })

watch(() => form.value.fields, (newVal) => {
    for (const key in newVal) {
        if (!newVal[key].hasChanged && newVal[key].value !== getDefaultFieldValByType(castProps.fields.find((field) => field.name === key)?.type ?? 'text')) {
            newVal[key].hasChanged = true
        }
    }
    const values = Object.entries(newVal).reduce((acc, field) => {
        if (field[1].hasChanged) acc[field[0]] = field[1].value
        return acc
    }, {} as Record<string, any>)
    const result = schema.value.safeParse(values)
    form.value.errors = {}
    if (!result.success) {
        const errors = result.error.flatten().fieldErrors
        for (const key in errors) {
            if (form.value.fields[key].hasChanged) {
                form.value.errors[key] = errors[key]
            }
        }
    }
}, { deep: true })

function getSchemaFromFields(fields: T) {
    const defaultValidations = {
        text: z.string(),
        number: z.number(),
        email: z.string().email(),
        password: z.string(),
        date: z.date(),
        time: z.string(),
        'datetime-local': z.string(),
        month: z.string(),
        week: z.string(),
        tel: z.string(),
        url: z.string().url()
    } as const
    // const schemaObject: Record<string, z.ZodTypeAny> = {}
    const schemaObject = fields.reduce((acc, field) => {
        acc[field.name] = field.validation ?? defaultValidations[field.type] ?? z.any()
        return acc
    }, {} as Record<string, z.ZodTypeAny>)
    return z.object(schemaObject)
}

function getDefaultFieldValByType(type: keyof typeof defaultValues) {
    return defaultValues[type]
}
</script>
