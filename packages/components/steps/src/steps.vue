<script setup>
import { computed, getCurrentInstance, onMounted, provide, ref } from 'vue'
import { Props } from './steps'

const props = defineProps(Props)
const active = computed(() => props.active) // 使用computed包装props.active，使其变为响应式对象，props.active本身是一个值

const index = ref(0)
const stepIndexList = ref([])
provide('getStepIndex', getStepIndex)
provide('stepIndexList', stepIndexList)
provide('active', active)

function getStepIndex() {
  const temp = index.value
  stepIndexList.value.push(index.value++)
  return temp
}
</script>

<template>
  <div
    class="m-steps"
    :class="{
      'm-steps__align-center': align === 'center',
    }"
  >
    <slot />
  </div>
</template>

<style scoped>

</style>
