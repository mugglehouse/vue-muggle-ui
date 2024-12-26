<script setup>
import { ref } from 'vue'

const checkboxGroup = ref(['option1'])
</script>

<template>
  <m-checkbox-group v-model="checkboxGroup">
    <m-checkbox label="option1">
      🎉muggle
    </m-checkbox>
    <m-checkbox label="option2">
      🎉wizar
    </m-checkbox>
  </m-checkbox-group>
  <p style="font-size: 13px">
    目前选中：{{ checkboxGroup }}
  </p>
</template>

<style scoped>

</style>
