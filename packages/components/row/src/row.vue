<script setup>
import { computed } from 'vue'
import { Props } from './row.ts'

const props = defineProps(Props)

const style = computed(() => {
  const { gutter, justify, align } = props // 解构
  // 返回自定义style
  return {
    gap: `${gutter || 0}px`,
    justifyContent: justify || 'start',
    alignItem: align || 'flex-start',
  }
})
</script>

<template>
  <div class="m-row" :style="style">
    <slot />
  </div>
</template>

<style scoped>

</style>
