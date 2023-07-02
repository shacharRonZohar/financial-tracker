<template>
  <div class="slider-selector-container">
    <button @click="changeVisibleRange(-1)">Back</button>
    <div
      v-for="(value, idx) in visibleValues"
      :key="value.actual"
      @click="changeModelValue(value.actual)"
      :style="{border: value.actual === modelValue ? 'red solid 1px' : ''}"
    >
      {{ value.visual }}
    </div>
    <button @click="changeVisibleRange(1)">Forward</button>
  </div>
</template>

<script setup lang="ts" generic="TV extends string | number | symbol,TA extends string | number | symbol">
// import {getYears} from '~/services/utilService'
// type T = string | number | symbol

const props = defineProps<{
  modelValue: TA
  values: {visual: TV; actual: TA}[]
}>()

const emit = defineEmits<{(event: 'update:modelValue', newValue: TA): void}>()
const half = Math.floor(props.values.length / 2)

const visibleRange = ref([half - 5, half + 5])
function changeVisibleRange(dir: 1 | -1) {
  const max = props.values.length - 1
  const min = 0

  const newValues = [visibleRange.value[0] + dir, visibleRange.value[1] + dir]

  if (visibleRange.value[0] + dir < min || visibleRange.value[1] + dir > max) return
  visibleRange.value = newValues
  console.log(visibleRange.value)
}

const visibleValues = computed(() => props.values.slice(visibleRange.value[0], visibleRange.value[1]))

const modelValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

function changeModelValue(val: TA) {
  modelValue.value = val
}
</script>

<style lang="scss" scoped>
.slider-selector-container {
  display: flex;
  gap: 5px;
}
</style>
