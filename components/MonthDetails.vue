<template>
    <div>
        <h1>{{ monthName }}</h1>
        <p>Income: <input type="number" v-model="income"></p>
        <p>Expenses: {{ props.monthData.expenses || 'No expenses yet :)' }}</p>
        <p>Balance: {{ balance }}</p>
    </div>
</template>

<script setup lang="ts">
import { MonthData } from '~/models/MonthData'


interface MonthDetailsProps {
    monthData: MonthData
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
