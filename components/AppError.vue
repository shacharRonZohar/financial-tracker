<template>
    <div>
        <span>Had an error :c</span>
        <button @click="retry">Press to retry</button>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    retry: () => any
}>()
</script>
