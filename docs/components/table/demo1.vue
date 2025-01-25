<script setup>
const column = [
  {
    key: 'name',
    label: '姓名',
    width: 150,
    align: 'center',
  },
  {
    key: 'age',
    label: '年龄',
    width: 100,
    align: 'center',
  },
  {
    key: 'college',
    label: '学院',
    width: 120,
    align: 'center',
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
  <m-table :column="column" :data="tableData" />
</template>
