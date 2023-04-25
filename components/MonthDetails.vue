<template>
    <div>
        <h1>{{ monthName }}</h1>
        <p>Income: {{ props.monthData.income }}</p>
        <p>Expenses: {{ props.monthData.expenses || 'No expenses yet :)' }}</p>
    </div>
</template>

<script setup lang="ts">
import { MonthData } from '~/models/MonthData'


interface MonthDetailsProps {
    monthData: MonthData
}

const props = defineProps<MonthDetailsProps>()

const monthName = computed(() => {
    if (!props.monthData) return ''
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
