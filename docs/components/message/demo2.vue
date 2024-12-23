<script setup>
import { MMessage } from '@muggle-ui/components'

// 点击事件触发，创建函数组件，并传递config(props)参数
function openMesaage(type) {
  MMessage({
    type,
    message: `This is a ${type} message`,
    showClose: true, // 显示关闭按钮
  })
}
</script>

<template>
  <m-button type="success" @click="openMesaage('success')">
    success
  </m-button>
</template>
