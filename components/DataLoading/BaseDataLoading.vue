<template>
    <div>
        <AppError v-if="error" :retry="execute" />
        <AppLoader v-else-if="pending" />
        <slot v-else-if="data" :data="data"></slot>
        <NothingFound v-else />
    </div>
</template>

<script setup lang="ts">
import AppError from './AppError.vue'
import AppLoader from './AppLoader.vue'
import NothingFound from './NothingFound.vue'


interface DataLoadingProps {
    data: PropType<unknown>
    error: any
    pending: boolean
    execute: () => any
}
defineProps<DataLoadingProps>()
// defineProps({
//     data: {
//         type: null as unknown as PropType<unknown>,
//         required: true
//     },
//     error: {
//         type: Object,
//         required: true
//     },
//     pending: {
//         type: Boolean,
//         required: true
//     },
//     execute: {
//         type: Function as PropType<() => any>,
//         required: true
//     }
// })

</script>
