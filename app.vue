<template>
  <div class="app-container">
    <MainHeader />
    <NuxtPage />
  </div>
</template>

<style lang="scss">
.app-container {
  display: grid;
  grid-template-columns: minmax(20px, 1fr) minmax(200px, 6fr) minmax(20px, 1fr);

  > * {
    grid-column: 2;
  }
}
</style>
