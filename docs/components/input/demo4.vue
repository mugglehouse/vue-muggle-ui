<script setup>
import { ref } from 'vue'

const inputValue = ref('')
</script>

<template>
  <m-input v-model="inputValue" placeholder="请输入" type="password" style="width: 240px" />
</template>
