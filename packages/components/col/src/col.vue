<script setup>
import { Props } from './col.ts'

defineProps(Props)
</script>

<template>
  <i class="m-icon" :class="`m-col-${span}`"><slot /></i>
</template>

<style scoped>

</style>
