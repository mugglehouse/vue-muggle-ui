<script setup>
import { ref } from 'vue'

const switchValue = ref(true)
</script>

<template>
  <m-switch v-model="switchValue" />
</template>
