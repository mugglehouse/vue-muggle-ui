<script setup>
import { provide, ref } from 'vue'
import Schema from 'async-validator'
import { Props } from './form'

const props = defineProps(Props)

const errorCollection = ref([]) // 错误收集

provide('rules', props.rules) // 校验规则
provide('label-width', props.labelWidth) // 表单项名宽度
provide('error-collection', errorCollection) // 错误收集

// 验证规则
function validate(callback) {
  // 如果规则存在
  if (props.rules) {
    // 创建校验器
    const validator = new Schema(props.rules)
    // validate方法，参数1：校验对象{key:'value'}，参数2：校验完成时调用的回调函数，errors：所有error组成的数组，fields：一个对象，键为field，值为errors数组
    validator.validate(props.model, (errors, fields) => {
      // 收集错误
      errorCollection.value = errors || []
      // 执行自定义回调：成功打印'submit'，失败打印'error'
      callback(!errors, fields)
    })
  }
  // 若规则不存在，直接执行回调
  else {
    callback(true, props.model)
  }
}

// 重置表单
function resetFields() {
  errorCollection.value = []
}

defineExpose({
  validate,
  resetFields,
})
</script>

<template>
  <form class="m-form">
    <slot />
  </form>
</template>

<style scoped>

</style>
