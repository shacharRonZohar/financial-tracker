<template>
    <div>
        MonthDetails
        {{ monthName }}
        {{ monthData }}
    </div>
</template>

<script setup lang="ts">
import { Month } from '@prisma/client'


interface MonthDetailsProps {
    monthData: Month | null
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
