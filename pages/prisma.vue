<script setup lang="ts">
const {$client} = useNuxtApp()

const {data: examples} = await $client.prisma.useQuery()
</script>

<template>
  <div>
    Prisma ORM Data from the database, received {{ examples?.length || 0 }} records:
    <pre>{{ examples }}</pre>
  </div>
</template>
