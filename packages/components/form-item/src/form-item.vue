<script setup>
import { computed, inject } from 'vue'
import { Props } from './form-item'

const props = defineProps(Props)

const labelWidth = inject('labelWidth') // 表单项名宽度
const rules = inject('rules') // 表单项校验规则
const errorCollection = inject('error-collection') // 错误收集器

// 是否要求校验
const isRequired = computed(() => {
  const currentRules = props.itemName && rules && rules[props.itemName]
  if (currentRules)
    return currentRules.some(rule => rule.required)
  else
    return false
})
// 获取当前错误信息
const currentError = computed(() => {
  return (
    // errorCollection是error数组
    errorCollection.value.find(v => v.field === props.itemName)?.message || ''
  )
})
</script>

<template>
  <div
    class="m-form-item"
    :class="{ is_error: currentError, is_required: isRequired }"
  >
    <!-- 表单项名 -->
    <div
      v-if="!!label"
      class="m-form-item__label"
      :style="{
        width: labelWidth || '100px',
      }"
    >
      {{ label }}
    </div>
    <!-- 表单项 -->
    <div class="m-form-item__content">
      <slot />
      <!-- 错误信息 -->
      <div
        v-if="currentError"
        class="m-form-item__error-message"
      >
        {{ currentError }}
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
