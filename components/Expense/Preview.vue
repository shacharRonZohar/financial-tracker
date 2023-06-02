<template>
  <li>{{ expense.name }} - {{ expense.amount }}</li>
</template>

<script setup lang="ts">
import {Expense} from '~/types/MonthData'

const props = defineProps<{
  expense: Expense
}>()
</script>
