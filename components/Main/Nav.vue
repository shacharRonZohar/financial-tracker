<template>
  <nav>
    <ul class="main-nav">
      <li><NuxtLink to="/">Home</NuxtLink></li>
      <li><NuxtLink :to="`/overview/`">Overview</NuxtLink></li>
    </ul>
  </nav>
</template>

<style lang="scss">
.main-nav {
  display: flex;
  justify-content: space-between;

  li {
    padding: 0.5rem;
  }
}
</style>
