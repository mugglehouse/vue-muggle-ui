<script setup>
import { ref } from 'vue'

const checkbox1 = ref(false)
const checkbox2 = ref(false)
</script>

<template>
  <m-checkbox v-model="checkbox1" label="option2" disabled>
    🎉Muggle
  </m-checkbox>
  <m-checkbox v-model="checkbox2" label="option2" disabled>
    🎉Wizar
  </m-checkbox>
</template>
