<script setup>
import { ref } from 'vue'

const options = [
  {
    label: 'option1',
    value: '1',
  },
  {
    label: 'option2',
    value: '2',
  },
  {
    label: 'option3',
    value: '3',
  },
  {
    label: 'option4',
    value: '4',
  },
]
const selectValue = ref('')
</script>

<template>
  <m-select
    v-model="selectValue"
    style="width: 240px"
    :option="options"
    search
  />
</template>
