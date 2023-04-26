<template>
    <div>
        <DataLoading :error="monthError" :is-pending="isLoadingMonth" :execute="refetchMonth" :data="month"
            v-slot="{ value }">
            <MonthDetails :month-data="value" @update-income="updateIncome" />
        </DataLoading>
        <button @click="onClick">
            Click
        </button>
    </div>
</template>

<script setup lang="ts">
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
