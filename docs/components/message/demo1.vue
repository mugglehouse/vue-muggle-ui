<script setup>
import { MMessage } from '@muggle-ui/components'

// 点击事件触发，创建函数组件，并传递config(props)参数
function openMesaage(type) {
  MMessage({
    type,
    message: `This is a ${type} message`,
  })
}
</script>

<template>
  <m-button type="success" @click="openMesaage('success')">
    success
  </m-button>
  <m-button type="info" @click="openMesaage('info')">
    info
  </m-button>
  <m-button type="warning" @click="openMesaage('warning')">
    warning
  </m-button>
  <m-button type="danger" @click="openMesaage('error')">
    error
  </m-button>
</template>
