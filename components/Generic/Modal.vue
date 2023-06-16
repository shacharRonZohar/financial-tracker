<template>
  <div class="modal-cotnainer">
    <div class="btn-open-modal-container" v-if="!isOpen">
      <slot name="btn-open" :open="open"></slot>
    </div>
    <div class="modal" v-else>
      <slot name="btn-close" :close="close"></slot>
      <slot name="header"></slot>
      <slot name="body"></slot>
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const isOpen = ref(false)

function open() {
  isOpen.value = true
}

function close() {
  isOpen.value = false
}
</script>
