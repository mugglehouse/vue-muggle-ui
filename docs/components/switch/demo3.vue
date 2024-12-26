<script setup>
import { ref } from 'vue'

const switchValue = ref(true)
</script>

<template>
  <m-switch v-model="switchValue" active-text="Open" inactive-text="Close" />
  <p />
  <m-switch v-model="switchValue" active-text="Open" inactive-text="Close" inline-prompt />
</template>
