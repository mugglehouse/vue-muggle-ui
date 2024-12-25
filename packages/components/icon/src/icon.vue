<script setup>
import { computed } from 'vue'
import { Props } from './icon.ts'

const { size, color } = defineProps(Props)

const style = computed(() => {
  return {
    ...(size ? { 'font-size': `${size}px` } : {}),
    ...(color ? { color } : {}),
  }
})
</script>

<template>
  <i class="m-icon" :class="[`icon-${name}`]" :style="style" />
</template>

<style scoped>

</style>
