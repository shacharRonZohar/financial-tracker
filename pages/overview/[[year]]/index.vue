<template>
  <main class="main-content">
    <YearSelector v-model="year" />
    <MonthSelector v-if="year" v-model="month"></MonthSelector>
    <NuxtPage />
  </main>
</template>

<script setup lang="ts">
const {year, month} = useYearMonthParams()
</script>

<style lang="scss" scoped>
.main-content {
  display: grid;
  // flex-direction: column;
  grid-template-rows: 1fr 1fr 10fr;
  gap: 2rem;
}
</style>
