<script setup>
import { ref } from 'vue'

const currentPageOne = ref(1)
const currentPageTwo = ref(1)
</script>

<template>
  <m-pagination v-model:current-page="currentPageOne" total="50" page-size="10" />
  <m-pagination v-model:current-page="currentPageTwo" total="100" page-size="10" />
</template>

<style scoped>

</style>
