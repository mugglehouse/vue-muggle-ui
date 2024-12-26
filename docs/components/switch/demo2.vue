<script setup>
import { ref } from 'vue'

const switchValue = ref(true)
</script>

<template>
  <m-switch v-model="switchValue" type="primary" />
  <m-switch v-model="switchValue" type="success" />
  <m-switch v-model="switchValue" type="info" />
  <m-switch v-model="switchValue" type="warning" />
  <m-switch v-model="switchValue" type="danger" />
</template>
