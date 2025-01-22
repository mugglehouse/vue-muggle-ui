<script setup>
import { ref } from 'vue'

const currentPage = ref(1)
</script>

<template>
  <m-pagination v-model:current-page="currentPage" total="1000" page-size="20" show-jump />
</template>

<style scoped>

</style>
