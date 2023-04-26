<template>
    <div>
        <AppError v-if="error" :retry="execute" :error="error" />
        <AppLoader v-else-if="isPending" />
        <slot v-else-if="data" :value="data"></slot>
        <NothingFound v-else />
    </div>
</template>

<script setup lang="ts" generic="TData">
import AppError from './AppError.vue'
import AppLoader from './AppLoader.vue'
import NothingFound from './NothingFound.vue'


interface GenericDataLoadingProps {
    data: TData | null
    error: unknown
    isPending: boolean
    execute: () => any
}

const props = defineProps<GenericDataLoadingProps>()


</script>
