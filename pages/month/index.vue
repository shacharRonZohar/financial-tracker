<template>
  {{ data }}
  {{ searchYear }}
  <button @click="changeMonth(5)">Change</button>
</template>

<script setup lang="ts">
import {useGetMonths} from '~~/composables/trpc/useGetMonths'

const searchYear = ref(1)
const {data} = useGetMonths({searchYear: searchYear})

function changeMonth(month: number) {
  searchYear.value = month
}
</script>
