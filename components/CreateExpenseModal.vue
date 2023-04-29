<template>
    <GenericFormModal :fields="fields" @submit="handleSubmit"></GenericFormModal>
</template>

<script setup lang="ts">
import z from 'zod'
const fields = [
    {
        label: 'Name',
        name: 'name',
        placeholder: 'Name',
        type: 'text',
        validation: z.string().min(1)
    },
    {
        name: 'amount',
        type: 'number',
        label: 'Amount',
        placeholder: 'Amount',
        validation: z.number().min(1)
    },
] as const

const emit = defineEmits<{
    (event: 'submit', formData: { amount: number, name: string }): void
}>()

function handleSubmit({ amount, name }: Record<string, any>) {
    emit('submit', { amount, name })
}

</script>
