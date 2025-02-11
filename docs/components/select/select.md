# Select 选择器

Select 选择器用于在一组选项中进行单选。

## 基础用法

适用广泛的基础单选。

```vue
<script setup>
import { ref } from 'vue'
import { MSelect } from 'muggle-ui'

const value = ref('')
const options = [
  {
    value: '选项1',
    label: '黄金糕'
  },
  {
    value: '选项2',
    label: '双皮奶'
  },
  {
    value: '选项3',
    label: '蚵仔煎'
  },
  {
    value: '选项4',
    label: '龙须面'
  },
  {
    value: '选项5',
    label: '北京烤鸭'
  }
]
</script>

<template>
  <MSelect v-model="value" :option="options" placeholder="请选择" />
</template>
```

## 有禁用选项

在 `option` 数组中设置 `disabled` 字段来声明此选项是禁用的。

```vue
<script setup>
import { ref } from 'vue'
import { MSelect } from 'muggle-ui'

const value = ref('')
const options = [
  {
    value: '选项1',
    label: '黄金糕'
  },
  {
    value: '选项2',
    label: '双皮奶',
    disabled: true
  },
  {
    value: '选项3',
    label: '蚵仔煎'
  },
  {
    value: '选项4',
    label: '龙须面'
  },
  {
    value: '选项5',
    label: '北京烤鸭'
  }
]
</script>

<template>
  <MSelect v-model="value" :option="options" placeholder="请选择" />
</template>
```

## 可搜索

可以利用搜索功能快速查找选项。

```vue
<script setup>
import { ref } from 'vue'
import { MSelect } from 'muggle-ui'

const value = ref('')
const options = [
  {
    value: '选项1',
    label: '黄金糕'
  },
  {
    value: '选项2',
    label: '双皮奶'
  },
  {
    value: '选项3',
    label: '蚵仔煎'
  },
  {
    value: '选项4',
    label: '龙须面'
  },
  {
    value: '选项5',
    label: '北京烤鸭'
  }
]
</script>

<template>
  <MSelect v-model="value" :option="options" search placeholder="请选择" />
</template>
```

## API

### Select Props

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| v-model | 选中项绑定值 | string/number | — | — |
| option | 选项数组 | array | — | [] |
| placeholder | 占位符 | string | — | 请选择 |
| search | 是否可搜索 | boolean | — | false |

### Option 数据结构

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
|------|------|------|------|------|
| value | 选项的值 | string/number | — | — |
| label | 选项的标签 | string | — | — |
| disabled | 是否禁用 | boolean | — | false | 