<template>
  <main>
    <YearSelector />
    <MonthSelector />
    <MonthOverview :year="year" :month-num="month" />
  </main>
</template>

<script setup lang="ts">
import YearSelector from '~/components/YearSelector.vue'
import MonthSelector from '~/components/MonthSelector.vue'

const route = useRoute('month')

const year = computed(() => +(route.query?.year || new Date().getFullYear()))

const month = computed(() => +(route.query?.monthNum || new Date().getMonth() + 1))
</script>
