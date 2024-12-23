<script setup>
import { getCurrentInstance } from 'vue'
import { Props } from './message'

defineProps(Props)
const emit = defineEmits(['close'])

// 针对不同状态的消息，显示不同的图标
const MESSAGE_ICON_NAME = {
  success: 'success-filling',
  info: 'prompt-filling',
  warning: 'warning-filling',
  error: 'delete-filling',
}

// 关闭消息函数
const instance = getCurrentInstance()
function close() {
  emit('close', instance.vnode.el.parentElement)
}
</script>

<template>
  <div class="m-message" :class="`m-message__${type}`">
    <i :class="`m-icon icon-${MESSAGE_ICON_NAME[type]}`" />
    <span class="m-message__text">{{ message }}</span>
    <i v-if="showClose" class="m-icon icon-close-bold m-message_close_icon" @click="close" />
  </div>
</template>
