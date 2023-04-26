<template>
    <div>
        <AppError v-if="error" :retry="emit('refetch')" :error="error" />
        <AppLoader v-else-if="isLoading" />
        <slot v-else-if="data" :value="data"></slot>
        <NothingFound v-else />
    </div>
</template>

<script setup lang="ts" generic="T">
import AppError from './AppError.vue'
import AppLoader from './AppLoader.vue'
import NothingFound from './NothingFound.vue'

defineProps({
    data: {
        type: Object as PropType<T>,
        required: true
    },
    error: {
        type: Object as any,
        required: false
    },
    isLoading: {
        type: Boolean,
        required: true
    },

})

const emit = defineEmits<{
    (event: 'refetch'): void
}>()


</script>
