<script setup>
import { ref } from 'vue'

const inputValue1 = ref('')
const inputValue2 = ref('')
</script>

<template>
  <!-- 前嵌入 -->
  <m-input v-model="inputValue1" placeholder="请输入" type="text" style="width: 240px">
    <template #pre-icon>
      <i class="m-icon icon-user" />
    </template>
  </m-input>
  <!-- 后嵌入 -->
  <m-input v-model="inputValue2" placeholder="请输入" type="text" style="width: 240px">
    <template #suffix-icon>
      <i class="m-icon icon-setting" />
    </template>
  </m-input>
</template>
