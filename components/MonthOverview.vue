<template>
    <div>
        <TypedDataLoading cmp-name="MonthDetails" :error="error" :pending="pending" :execute="execute" :data="month"
            v-slot="{ data }">
            <!-- I used the null assertion operator here since data can not be null at the point where the slot renders,
            the only reason TS dosen't know this is null is because I used a hack to get around the fact that Vue 3 doesn't support generics in setup() yet.-->
            <MonthDetails :month-data="data!" @update-income="updateIncome" />
        </TypedDataLoading>
    </div>
</template>

<script setup lang="ts">
import { MonthDataWithExpenses } from '~/models/MonthData'

const TypedDataLoading = useGenericDataLoading<MonthDataWithExpenses | null>()

interface MonthOverviewProps {
    year: number
    monthNum: number
}

const props = defineProps<MonthOverviewProps>()

const { data: month, error, pending, execute } = useGetMonthByNumber({ yearInput: props.year, monthNumInput: props.monthNum })

const updateIncome = (monthId: string, newIncome: number) => {
    console.log('updateIncome', monthId, newIncome)
    useUpdateMonthIncome({ monthId, newIncome })
}
</script>
