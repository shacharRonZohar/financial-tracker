<template>
    <div>
        <DataLoading :error="monthError" :is-loading="isLoadingMonth" :data="month" v-slot="{ value }">
            <MonthDetails :month-data="value" @update-income="updateIncome" />
        </DataLoading>
        <FormModal :fields="fields"></FormModal>
    </div>
</template>

<script setup lang="ts">
import z from 'zod'
import type { FormFieldArray } from '~/models/Form'

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
    {
        name: 'Email',
        type: 'email',
        label: 'Email',
        placeholder: 'Email',
        // validation: z.string()
    }
] satisfies {
    name: string
    type: 'text' | 'number' | 'email' | 'password' | 'date' | 'time' | 'datetime-local' | 'month' | 'week' | 'tel' | 'url'
    label: string
    placeholder: string
    validation?: z.ZodTypeAny
}[]

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

function onClick() {
    createExpense({
        monthId: monthId.value,
        amount: 100,
        name: 'test'
    })
}

watch(month, (newVal) => {
    if (!newVal) return
    monthId.value = newVal.id
})


</script>
