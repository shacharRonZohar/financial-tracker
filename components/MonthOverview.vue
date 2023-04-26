<template>
    <div>
        <DataLoading :error="monthError" :is-pending="isLoadingMonth" :execute="refetchMonth" :data="month"
            v-slot="{ value }">
            <MonthDetails :month-data="value" @update-income="updateIncome" />
        </DataLoading>
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

const updateIncome = (newMonthId: string, newIncome: number) => {
    monthId.value = newMonthId
    income.value = newIncome
    updateMonthIncome()
}
</script>
