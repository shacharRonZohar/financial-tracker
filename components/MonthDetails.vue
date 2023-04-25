<template>
    <div>

        <h1>{{ monthName }}</h1>
        <p>Income: <input type="number" v-model="income"></p>
        <p>Expenses: {{ monthData.expenses.length ? monthData.expenses : 'No expenses yet :)' }}</p>
        <p>Balance: {{ balance }}</p>
        {{ monthData }}
    </div>
</template>

<script setup lang="ts">
import { MonthDataWithExpenses } from '~/models/MonthData'


interface MonthDetailsProps {
    monthData: MonthDataWithExpenses
}
const props = defineProps<MonthDetailsProps>()

interface MonthDetailsEmits {
    (event: 'update-income', monthId: string, newIncome: number): void
}
const emit = defineEmits<MonthDetailsEmits>()

const income = computed({
    get: () => props.monthData.income,
    set: (value) => emit('update-income', props.monthData.id, value)
})

const balance = computed(() => {
    console.log(props.monthData)
    return props.monthData.income - (props.monthData.expenses?.reduce((acc, cur) => acc + cur.amount, 0) ?? 0)
})

const monthName = computed(() => {
    const monthNames = [
        'january',
        'february',
        'march',
        'april',
        'may',
        'june',
        'july',
        'august',
        'september',
        'october',
        'november',
        'december'
    ]
    return monthNames[props.monthData.month - 1]
})

</script>
