<template>
  <li>
    {{ expense.name }} - {{ expense.amount }}
    <pre>{{ expense.id }}</pre>
  </li>
</template>

<script setup lang="ts">
import {Expense} from '~/types/MonthData'

defineProps<{
  expense: Expense
}>()
</script>
