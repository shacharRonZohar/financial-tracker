<template>
    <div>
        <label :for="castProps.field.name">{{ castProps.field.label }}</label>
        <input v-model="computedModelValue" :type="castProps.field.type" :name="castProps.field.name"
            :placeholder="castProps.field.placeholder" />
        <div v-if="error">{{ error }}</div>
    </div>
</template>

<script setup lang="ts" generic="TValue extends number | string">
import { FormField } from '~/types/Form'


const props = defineProps<{
    field: FormField<TValue>
    modelValue: TValue
    error?: string[]
}>()

// This casting is needed because there is a bug in Volar / Vue, should be fixed in Vue 3.3.0
const castProps = props as unknown as {
    field: FormField<TValue>
    modelValue: TValue
    error: string[]
}

const emit = defineEmits<{
    (event: 'update:modelValue', value: TValue): void
}>()

const computedModelValue = computed({
    get: () => castProps.modelValue,
    set: (val) => emit('update:modelValue', val)
})


</script>
