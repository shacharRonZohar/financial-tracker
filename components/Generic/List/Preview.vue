<template>
  <li>
    <slot :item="item"></slot>
  </li>
</template>

<script setup lang="ts" generic="TData">
const props = defineProps<{
  item: TData
}>()
</script>
