<template>
  <li>
    <slot :item="item"></slot>
    <span>
      <button @click="onUpdate">Update</button>
      <button @click="onDelete">Delete</button>
    </span>
  </li>
</template>

<script setup lang="ts" generic="TData extends Item">
import {Item} from '~/types/Generic'

// const slots = defineSlots<{
//   default({item: item: TData},): any
// }>();
const props = defineProps<{
  item: TData
}>()

const emit = defineEmits<{
  (event: 'update-item', itemId: string): void
  (event: 'delete-item', itemId: string): void
}>()

function onUpdate() {
  console.log('update')
  emit('update-item', props.item.id)
}

function onDelete() {
  console.log('delete')
  emit('delete-item', props.item.id)
}
</script>
