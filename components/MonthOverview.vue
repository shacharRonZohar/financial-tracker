<template>
    <div>
        <DataLoading :error="error" :pending="pending" :data="month" :execute="execute">
            <MonthDetails :month-data="month" />
        </DataLoading>
    </div>
</template>

<script setup lang="ts">

import { useGetMonthByNumber } from '~/composables/trpc/useGetMonthByNumber'


interface MonthOverviewProps {
    year: number
    monthNum: number
}

const props = defineProps<MonthOverviewProps>()

const { data: month, error, pending, execute } = useGetMonthByNumber({ yearInput: props.year, monthNumInput: props.monthNum })
</script>
