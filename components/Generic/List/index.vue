<template>
  <ul>
    <slot v-for="item in items" :key="item.id" :item="item" />
  </ul>
</template>

<script setup lang="ts" generic="TData extends Item">
import type {Item} from '@/types/Generic'

const props = defineProps<{
  items: TData[]
}>()

// props.items.forEach((item) => {
//   console.log(item.id)
// })
</script>
