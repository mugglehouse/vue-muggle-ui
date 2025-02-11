# Tree 树形控件

Tree 树形控件用于展示具有层级关系的数据，支持展开/收起、复选框等功能。

## 基础用法

基础的树形结构展示。

```vue
<script setup>
import { MTree } from 'muggle-ui'

const data = [
  {
    id: 1,
    label: '一级 1',
    showChild: true,
    children: [
      {
        id: 4,
        label: '二级 1-1',
        children: [
          {
            id: 9,
            label: '三级 1-1-1'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    label: '一级 2',
    showChild: true,
    children: [
      {
        id: 5,
        label: '二级 2-1'
      },
      {
        id: 6,
        label: '二级 2-2'
      }
    ]
  }
]
</script>

<template>
  <MTree :data="data" />
</template>
```

## 可选择

适用于需要选择层级时使用。

```vue
<script setup>
import { MTree } from 'muggle-ui'

const data = [
  {
    id: 1,
    label: '一级 1',
    showChild: true,
    isChecked: false,
    children: [
      {
        id: 4,
        label: '二级 1-1',
        isChecked: false,
        children: [
          {
            id: 9,
            label: '三级 1-1-1',
            isChecked: false
          }
        ]
      }
    ]
  },
  {
    id: 2,
    label: '一级 2',
    showChild: true,
    isChecked: false,
    children: [
      {
        id: 5,
        label: '二级 2-1',
        isChecked: false
      },
      {
        id: 6,
        label: '二级 2-2',
        isChecked: false
      }
    ]
  }
]
</script>

<template>
  <MTree :data="data" show-checkbox />
</template>
```

## API

### Tree Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| data | 展示数据 | array | — | [] |
| show-checkbox | 节点是否可被选择 | boolean | — | false |

### Tree 节点数据格式

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| id | 节点唯一标识 | string/number | — | — |
| label | 节点标签 | string | — | — |
| children | 子节点 | array | — | — |
| showChild | 是否展示子节点 | boolean | — | false |
| isChecked | 节点是否被选中 | boolean | — | false | 