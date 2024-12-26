<script setup>
import { computed, provide } from 'vue'
import { Props } from './checkbox-group.ts'

const props = defineProps(Props)
const emit = defineEmits(['update:modelValue', 'change'])
const modelValueRef = computed(() => props.modelValue)

// 传入新变化的复选框，如果已经存在则删除，否则添加
function groupModelChange(label) {
  // 更新modelValue
  const newValue = props.modelValue?.includes(label)
    ? props.modelValue.filter(v => v !== label)
    : [...(props.modelValue), label]
  emit('update:modelValue', newValue)
  emit('change', newValue)
}
// 传给checkbox
provide('groupData', {
  modelValueRef,
  groupModelChange,
})
</script>

<template>
  <div class="m-checkbox-group">
    <slot />
  </div>
</template>

<style scoped>

</style>
