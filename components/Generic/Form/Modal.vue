<template>
  <GenericModal>
    <template #btn-open="{open}">
      <button @click="open">{{ title }}</button>
    </template>
    <template #btn-close="{close}">
      <button @click="close">Close</button>
    </template>
    <template #header>
      <h1>{{ title }}</h1>
    </template>
    <template #body>
      <GenericForm :fields="fields" @submit="handleSubmit" />
    </template>
  </GenericModal>
</template>

<script setup lang="ts" generic="T extends FormField">
import type {FormField} from '~/types/Form'

const props = defineProps<{
  title: string
  fields: T[]
}>()

const emit = defineEmits<{
  (event: 'submit', formData: Record<string, any>): void
}>()

function handleSubmit(formData: Record<string, any>) {
  emit('submit', formData)
}
</script>
