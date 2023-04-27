<template>
    <form @submit.prevent="handleSubmit">
        <GenericFormInput v-for="field in castProps.fields" :key="field.name" v-model="form.fields[field.name].value"
            :field="field" :error="form.errors[field.name]" />
        <button type="submit">Submit</button>
    </form>
</template>


<script setup lang="ts" generic="T extends FormFieldArray">
import { formService } from '~/services/form.service'
import type { FormField, FormFieldArray } from '~/types/Form'

const props = defineProps<{
    fields: T
}>()
// This casting is needed because there is a bug in Volar / Vue V3.2.4, is fixed in V3.3.0-beta2
const castProps = props as unknown as { fields: T }

const emit = defineEmits<{
    (event: 'submit', formData: Record<string, any>): void
}>()


const form = ref<{
    fields: Record<string, {
        value: string | number
        hasChanged: boolean
    }>
    errors: Record<string, any>
}>({
    fields: {},
    errors: {}
})

const schema = computed(() => formService.getSchemaFromFields(castProps.fields))

watch(() => castProps.fields, (newVal) => {
    console.log(castProps.fields)
    form.value.fields = newVal.reduce((acc, field) => {
        acc[field.name] = {
            value: field.defaultValue ?? formService.getDefaultFieldValByType(field.type),
            hasChanged: false
        }
        return acc
    }, {} as Record<string, any>)
}, { immediate: true })

watch(() => form.value.fields, (newVal) => {
    const values = Object.entries(newVal).reduce((acc, field) => {
        if (field[1].hasChanged) acc[field[0]] = field[1].value
        return acc
    }, {} as Record<string, any>)
    const result = schema.value.safeParse(values)
    form.value.errors = {}
    if (result.success) return
    const errors = result.error.flatten().fieldErrors
    for (const key in errors) {
        // TODO: This first if is really bad, need to find a good way to do it
        if (!newVal[key].hasChanged && newVal[key].value !== formService.getDefaultFieldValByType(castProps.fields.find((field) => field.name === key)?.type ?? 'text')) {
            newVal[key].hasChanged = true
        }
        if (form.value.fields[key].hasChanged) {
            form.value.errors[key] = errors[key]
        }
    }

}, { deep: true })

function handleSubmit() {
    const values = Object.entries(form.value.fields).reduce((acc, field) => {
        acc[field[0]] = field[1].value
        return acc
    }, {} as Record<string, any>)
    emit('submit', values)
}
</script>
