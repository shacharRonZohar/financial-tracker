<template>
    <div>
        <DataLoading :error="monthError" :is-loading="isLoadingMonth" :data="month" v-slot="{ value }">
            <MonthDetails :month-data="value" @update-income="updateIncome" />
        </DataLoading>
        <GenericFormModal :fields="fields" @submit="handleSubmit"></GenericFormModal>
    </div>
</template>

<script setup lang="ts">
import z from 'zod'
import type { FormFieldArray } from '~/types/Form'

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

const monthId = ref('')
const income = ref(0)

const { month, monthError, isLoadingMonth, refetchMonth } = useGetMonthByQuery()
const { updateMonthIncome } = useUpdateMonthIncome({
    monthIdInput: monthId,
    newIncome: income
})

const {
    createExpense
} = useCreateExpense()

const updateIncome = (newIncome: number) => {
    income.value = newIncome
    updateMonthIncome({
        income: newIncome
    })
}

function handleSubmit({ amount, name }: Record<string, any>) {
    console.log(amount, name)
    createExpense({
        monthId: monthId.value,
        amount,
        name
    })
}

watch(month, (newVal) => {
    if (!newVal) return
    monthId.value = newVal.id
})


</script>
