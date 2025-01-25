<script setup>
const column = [
  {
    key: 'name',
    label: '姓名',
    width: 150,
  },
  {
    key: 'age',
    label: '年龄',
    width: 100,
  },
  {
    key: 'college',
    label: '学院',
    width: 120,
  },
]

const tableData = [
  {
    name: 'muggle',
    age: '23',
    college: '斯莱特林',
  },
  {
    name: 'harry',
    age: '24',
    college: '格兰芬多',
  },
  {
    name: 'hermione',
    age: '25',
    college: '拉文克劳',
  },
  {
    name: 'ron',
    age: '23',
    college: '赫奇帕奇',
  },
]
</script>

<template>
  <m-table :column="column" :data="tableData">
    <!-- 具名作用域插槽,指定具体的列,填入自定义内容 -->
    <template #name="{ row }">
      👍{{ row.name }}
    </template>
    <template #college="{ row }">
      🏫{{ row.college }}
    </template>
  </m-table>
</template>
