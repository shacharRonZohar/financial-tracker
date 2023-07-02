<template>
  <li class="expense-preview">
    <span class="expense-name">{{ expense.name }}</span> - <span class="expense-amount">{{ expense.amount }}</span>
  </li>
</template>

<script setup lang="ts">
import {Expense} from '~/types/MonthData'

defineProps<{
  expense: Expense
}>()
</script>
