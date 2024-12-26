<script setup>
import { ref } from 'vue'

const checkbox1 = ref(true)
const checkbox2 = ref(false)
const checkbox3 = ref(false)
</script>

<template>
  <!-- 若无插槽内容，默认填充label -->
  <m-checkbox v-model="checkbox1" label="option1" />
  <m-checkbox v-model="checkbox2" label="option2">
    🎉Muggle
  </m-checkbox>
  <m-checkbox v-model="checkbox3" label="option2">
    🎉Wizar
  </m-checkbox>
</template>
