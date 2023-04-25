<template>
  <main>
    <YearSelector />
    <MonthSelector />
    <MonthOverview />
  </main>
</template>

<script setup lang="ts">
import YearSelector from '~/components/YearSelector.vue'
import MonthSelector from '~/components/MonthSelector.vue'
import { useGetMonths } from '~~/composables/trpc/useGetMonths'

const route = useRoute('month')

const year = computed(() => +(route.query?.year || new Date().getFullYear()))

const month = computed(() => +(route.query?.month || new Date().getMonth() + 1))
</script>
