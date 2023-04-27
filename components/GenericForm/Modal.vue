<template>
    <GenericModal>
        <template #header>
            <h1>Create new expense</h1>
        </template>
        <template #body>
            <GenericForm :fields="castProps.fields" @submit="handleSubmit" />
        </template>
        <!-- <template #footer>
             <button @click="onSubmit">Submit</button>
        </template> -->
    </GenericModal>
</template>

<script setup lang="ts" generic="T extends FormFieldArray">
import { defineProps } from 'vue'

import type { FormFieldArray } from '~/types/Form'

// type TSubmitValue = T[number]['defaultValue'] extends number ? number : string
const props = defineProps<{
    fields: T
}>()

// This casting is needed because there is a bug in Volar / Vue V3.2.4, is fixed in V3.3.0-beta2
const castProps = props as unknown as { fields: T }

const emit = defineEmits<{
    (event: 'submit', formData: Record<string, any>): void
}>()

function handleSubmit(formData: Record<string, any>) {
    emit('submit', formData)
}


</script>
