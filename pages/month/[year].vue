<template>
  {{ months }}
  {{ year }}
  <!-- <button @click="changeMonth(5)">Change</button> -->
</template>

<script setup lang="ts">
import {useGetMonths} from '~~/composables/trpc/useGetMonths'

const route = useRoute('month-year')

const year = computed(() => +route.params.year)

const {data:months} = useGetMonths({year})

</script>
