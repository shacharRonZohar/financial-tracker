<template>
  <!-- <SaveExpenseModal @submit="emit('submit', $event)" /> -->
  <GenericForm :fields="fields" @submit="onSubmit"></GenericForm>
</template>

<script setup lang="ts">
import {z} from 'zod'
import {FormField} from '~/types/Form'
import {Expense} from '~/types/MonthData'

const props = defineProps<{
  expense?: Expense
}>()

// const emit = defineEmits<{
//   (event: 'submit', formData: {amount: number; name: string}): void
// }>()

const fields = computed<FormField[]>(() => [
  {
    label: 'Name',
    name: 'name',
    placeholder: 'Name',
    type: 'text',
    validation: z.string().min(1),
    defaultValue: props.expense ? props.expense.name : '',
  },
  {
    name: 'amount',
    type: 'number',
    label: 'Amount',
    placeholder: 'Amount',
    validation: z.number().min(1),
    defaultValue: props.expense ? props.expense.amount : '',
  },
])

const {createExpense} = useCreateExpense()
function onSubmit(formData: Record<string, any>) {
  // createExpense({
  //   monthId
  //   name: formData.name,
  //   amount: formData.amount,
  // })
}
</script>
