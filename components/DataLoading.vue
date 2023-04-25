<template>
    <div>
        <AppError v-if="error" :retry="execute" />
        <AppLoader v-else-if="pending" />
        <slot v-else-if="data"></slot>
        <NothingFound v-else />
    </div>
</template>

<script setup lang="ts">
import AppError from './AppError.vue'
import AppLoader from './AppLoader.vue'
import NothingFound from './NothingFound.vue'

defineProps<{
    data: any
    error: any
    pending: boolean
    execute: () => any
}>()
</script>
