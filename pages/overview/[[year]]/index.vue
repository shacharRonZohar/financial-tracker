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
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
