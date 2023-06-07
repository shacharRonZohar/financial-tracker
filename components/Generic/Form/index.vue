<template>
  <form @submit.prevent="handleSubmit">
    <GenericFormInput
      v-for="field in fields"
      :key="field.name"
      v-model="form.fields[field.name].value"
      :field="field"
      :error="form.errors[field.name]"
    />
    <button type="submit">Submit</button>
  </form>
</template>

<script setup lang="ts" generic="T extends FormField">
import {formService} from '~/services/form.service'
import type {FormField} from '~/types/Form'

const props = defineProps<{
  fields: readonly T[]
}>()

const emit = defineEmits<{
  (event: 'submit', formData: Record<string, any>): void
}>()

const form = ref<{
  fields: Record<
    string,
    {
      value: string | number
      hasChanged: boolean
    }
  >
  errors: Record<string, any>
}>({
  fields: {},
  errors: {},
})

const schema = computed(() => formService.getSchemaFromFields(props.fields))

watch(
  () => props.fields,
  (newVal) => {
    // console.log(props.fields)
    form.value.fields = newVal.reduce((acc, field) => {
      acc[field.name] = {
        value: field.defaultValue ?? formService.getDefaultFieldValByType(field.type),
        hasChanged: false,
      }
      return acc
    }, {} as Record<string, any>)
  },
  {immediate: true},
)

watch(
  () => form.value.fields,
  (newVal) => {
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
      if (
        !newVal[key].hasChanged &&
        newVal[key].value !==
          formService.getDefaultFieldValByType(props.fields.find((field) => field.name === key)?.type ?? 'text')
      ) {
        newVal[key].hasChanged = true
      }
      if (form.value.fields[key].hasChanged) {
        form.value.errors[key] = errors[key]
      }
    }
  },
  {deep: true},
)

function handleSubmit() {
  const values = Object.entries(form.value.fields).reduce((acc, field) => {
    acc[field[0]] = field[1].value
    return acc
  }, {} as Record<string, any>)
  emit('submit', values)
}
</script>
