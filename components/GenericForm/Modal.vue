<template>
    <GenericModal>
        <template #header>
            <h1>Create new expense</h1>
        </template>
        <template #body>
            <GenericForm :fields="fields" @submit="handleSubmit" />
        </template>
        <!-- <template #footer>
             <button @click="onSubmit">Submit</button>
        </template> -->
    </GenericModal>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

import type { FormFieldArray } from '~/types/Form'

const props = defineProps<{
    fields: FormFieldArray
}>()

// This casting is needed because there is a bug in Volar / Vue V3.2.4, is fixed in V3.3.0-beta2
// const castProps = props as unknown as { fields: T }

const emit = defineEmits<{
    (event: 'submit', formData: Record<string, any>): void
}>()

function handleSubmit(formData: Record<string, any>) {
    emit('submit', formData)
}


</script>
