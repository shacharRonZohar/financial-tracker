<template>
  <div>{{ hello }}</div>
</template>

<script setup lang="ts">
const {$client} = useNuxtApp()

const hello = await $client.hello.useQuery({text: 'Hello World!'})
</script>
