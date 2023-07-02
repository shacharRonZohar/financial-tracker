<template>
  <li class="preview-item">
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

<style lang="scss" scoped>
.preview-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>
