<template>
  <main>
    <YearSelector v-model="year" />
    <MonthSelector v-if="year" v-model="month"></MonthSelector>
    <NuxtPage />
  </main>
</template>

<script setup lang="ts">
const {year, month} = useYearMonthParams()
</script>
