<template>
  <div class="app-container">
    <MainHeader />
    <NuxtPage />
  </div>
</template>

<style lang="scss">
@import '@/styles/base.scss';
.app-container {
  display: grid;
  grid-template: 100px 1fr / minmax(20px, 1fr) minmax(200px, 6fr) minmax(20px, 1fr);
  gap: 1rem;
  > * {
    grid-column: 2;
  }
  min-height: 100dvh;
}
</style>
