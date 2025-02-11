# Message 消息提示

Message 消息提示组件用于在页面中展示重要的提示信息。

## 基础用法

从顶部出现，3 秒后自动消失。

```vue
<script setup>
import { MMessage } from 'muggle-ui'

function showMessage() {
  MMessage({
    message: '这是一条消息提示',
    type: 'info'
  })
}
</script>

<template>
  <m-button @click="showMessage">
    显示消息
  </m-button>
</template>
```

## 不同状态

用来显示「成功、警告、消息、错误」类的操作反馈。

```vue
<script setup>
import { MMessage } from 'muggle-ui'

function showMessage(type) {
  MMessage({
    message: '这是一条消息提示',
    type
  })
}
</script>

<template>
  <m-button @click="showMessage('success')">
    成功
  </m-button>
  <m-button @click="showMessage('warning')">
    警告
  </m-button>
  <m-button @click="showMessage('info')">
    消息
  </m-button>
  <m-button @click="showMessage('error')">
    错误
  </m-button>
</template>
```

## 可关闭的消息提示

可以添加关闭按钮。

```vue
<script setup>
import { MMessage } from 'muggle-ui'

function showMessage() {
  MMessage({
    message: '这是一条消息提示',
    type: 'info',
    showClose: true
  })
}
</script>

<template>
  <m-button @click="showMessage">
    显示可关闭消息
  </m-button>
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| message | 消息文字 | string | — | — |
| type | 消息类型 | string | success/warning/info/error | info |
| duration | 显示时间，单位为毫秒。设为 0 则不会自动关闭 | number | — | 3000 |
| showClose | 是否显示关闭按钮 | boolean | — | false |

### Events

| 事件名称 | 说明 | 回调参数 |
|---------|------|---------|
| close | 关闭时触发的事件 | — | 