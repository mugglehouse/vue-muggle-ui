<script setup>
import { computed, inject, useSlots } from 'vue'
import { Props } from './checkbox.ts'

const props = defineProps(Props)
const emit = defineEmits(['update:modelValue', 'change'])
const slots = useSlots()
const groupData = inject('groupData', undefined)

// 1. :value 底层input的value由上层的modelValue决定
const isCheck = computed(() => {
  // 若单独使用，直接传递props.modelValue，否则传递groupData.modelValueRef.value
  return groupData
    ? (groupData.modelValueRef.value).includes(props.label)
    : props.modelValue
})

// 2. @change 底层的change事件触发，需要处理两件事
function handleChange(e) {
  // 提取底层input的value
  const value = (e.target).checked
  // 单独使用
  emit('update:modelValue', value)
  emit('change', {
    label: props.label,
    value,
  })
  // 群组使用
  groupData && groupData.groupModelChange(props.label)
}
</script>

<template>
  <!-- label绑定ischecked  isdisabled的类 -->
  {{ groupData && groupData.groupModelValue }}
  <label class="m-checkbox" :class="{ 'is-checked': isCheck, 'is-disabled': disabled }">
    <input
      type="checkbox" class="m-checkbox__inner"
      :name="lable"
      :value="isCheck"
      :disabled="disabled"
      @change="handleChange"
    >
    <span class="m-checkbox__label">
      <!-- 若无插槽内容，则展示label标签内容 -->
      <template v-if="!slots.default">{{ label }}</template>
      <template v-else><slot /></template>
    </span>
  </label>
</template>

<style scoped>

</style>
