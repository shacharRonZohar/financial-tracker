<template>
    <div>
        <DataLoading :error="monthError" :is-loading="isLoadingMonth" :data="month" @refetch="refetchMonth"
            v-slot="{ value }">
            <MonthDetails :month-data="value" @update-income="updateIncome" />
        </DataLoading>
        <CreateExpenseModal @submit="handleSubmit" />
    </div>
</template>

<script setup lang="ts">
// import z from 'zod'


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

function handleSubmit({ amount, name }: { amount: number, name: string }) {
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
