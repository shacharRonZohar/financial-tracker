<template>
    <div>
        <TypedDataLoading cmp-name="MonthDetails" :error="error" :pending="pending" :execute="execute" :data="month"
            v-slot="data">
            <!-- I used the null assertion operator here since data can not be null at the point where the slot renders, the only reason TS dosen't know this
            is because I used a hack to get around the fact that Vue 3 doesn't support generics in setup() yet.-->
            <MonthDetails :month-data="data!" />
        </TypedDataLoading>
    </div>
</template>

<script setup lang="ts">

import { MonthData } from '~/models/MonthData'
import { useGetMonthByNumber } from '~/composables/trpc/useGetMonthByNumber'

// interface DataLoadingProps {
//     cmpName: string
//     data:
//     error: any
//     pending: boolean
//     execute: () => any
// }

const TypedDataLoading = useGenericDataLoading<MonthData | null>()

interface MonthOverviewProps {
    year: number
    monthNum: number
}

const props = defineProps<MonthOverviewProps>()

const { data: month, error, pending, execute } = useGetMonthByNumber({ yearInput: props.year, monthNumInput: props.monthNum })
</script>
