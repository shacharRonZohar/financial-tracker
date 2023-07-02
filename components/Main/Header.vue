<template>
  <header>
    <h1>Header</h1>
    <nav>
      <ul>
        <li><nuxt-link to="/">Home</nuxt-link></li>
        <li><nuxt-link :to="`/overview/`">Overview</nuxt-link></li>
      </ul>
    </nav>
  </header>
</template>
<!--
<script setup lang="ts">
const route = useRoute()
console.log(route)
const router = useRouter()
console.log(router)

function goToOverview() {
  router.push('/overview/')
}
</script> -->
