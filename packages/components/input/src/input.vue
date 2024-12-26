<script setup>
import { reactive, toRefs, useSlots } from 'vue'
import { Props } from './input.ts'

const props = defineProps(Props)
const emit = defineEmits(['update:modelValue'])
const slot = useSlots()

// 统一管理状态(变化的数据)
const state = reactive({
  isFocus: false,
  inputType: props.type,
  eyeClass: 'icon-eye-close',
})

// 在标签里使用了单独的变量名,reactive对象解构会失去响应式，所以需要加上toRefs，与下面的state.isFocus不冲突
const { isFocus, inputType, eyeClass } = toRefs(state)

// 1. 正在输入，更新modelValue
function inputChange(e) {
  emit('update:modelValue', e.target.value)
}

// 2. 聚焦
function handleFocus() {
  state.isFocus = true
}

// 3. 失焦
function handleBlur() {
  state.isFocus = false
}

// 4. 清空输入框
function clearInput() {
  emit('update:modelValue', '')
}

// 5. 切换密码可见性
function changeEye() {
  if (state.eyeClass === 'icon-eye-close') {
    state.eyeClass = 'icon-browse'
    state.inputType = 'text'
  }
  else {
    state.eyeClass = 'icon-eye-close'
    state.inputType = 'password'
  }
}
</script>

<template>
  <div class="m-input" :class="{ focus: isFocus }">
    <div v-if="slot['pre-icon']" class="pre-icon">
      <slot name="pre-icon" />
    </div>
    <div class="m-input-box">
      <input
        :type="inputType"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        class="m-input__inner"
        @input="inputChange"
        @focus="handleFocus"
        @blur="handleBlur"
      >
      <!-- eye -->
      <i
        v-if="type === 'password'"
        class="eye m-icon"
        :class="eyeClass"
        @click.stop="changeEye"
      />
      <!-- clear -->
      <i
        v-show="clearable && modelValue"
        class="clear m-icon icon-delete-filling"
        :style="{
          right: type === 'password' ? '30px' : '4px',
        }"
        @click="clearInput"
      />
    </div>
    <div v-if="slot['suffix-icon']" class="suffix-icon">
      <slot name="suffix-icon" />
    </div>
  </div>
</template>

<style scoped>

</style>
