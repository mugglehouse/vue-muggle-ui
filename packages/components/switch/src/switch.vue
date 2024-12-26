<script setup>
import { Props } from './switch.ts'

const props = defineProps(Props)
const emit = defineEmits(['update:modelValue'])
function handleClick() {
  emit('update:modelValue', !props.modelValue)
}
</script>

<template>
  <div class="m-switch" :class="`m-switch__${type}`">
    <!-- inactiveText -->
    <div v-if="!inlinePrompt" class="m-switch__label" :class="{ active: !modelValue }">
      {{ inactiveText }}
    </div>
    <!-- siwtch_core -->
    <div
      class="m-switch__core"
      :class="{ 'is-checked': modelValue }"
      @click="handleClick"
    >
      <!-- 滑动层 -->
      <div class="m-switch__action" />
      <!-- 文本层 -->
      <div class="m-switch__inner">
        {{ inlinePrompt ? (modelValue ? activeText : inactiveText) : "" }}
      </div>
    </div>
    <!-- activeText -->
    <div v-if="!inlinePrompt" class="m-switch__label" :class="{ active: modelValue }">
      {{ activeText }}
    </div>
  </div>
</template>

<style scoped>

</style>
