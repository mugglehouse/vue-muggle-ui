<script setup>
import { computed, getCurrentInstance, inject, onMounted, ref } from 'vue'
import { Props } from './step'

defineOptions({
  name: 'MStep',
})
defineProps(Props)
const getStepIndex = inject('getStepIndex') // 获取当前步骤的索引
const stepIndexList = inject('stepIndexList') // 所有步骤的索引
const active = inject('active') // 获取当前激活的步骤，来自父组件的props
const currentIndex = ref()

onMounted(() => {
  currentIndex.value = getStepIndex()
})
</script>

<!-- isFirstStep和isLastStep、is_last_step为何需要做样式区分？ -->
<template>
  <!-- isComplete全蓝，is_begining线蓝，其余灰 -->
  <div
    class="m-step"
    :class="{
      is_complete: (currentIndex || 0) <= active - 1,
      is_begining: (currentIndex || 0) === active,
      is_last_step: (currentIndex || 0) === stepIndexList.length - 1,
    }"
  >
    <div class="m-step__container">
      <!-- 1. 头部 -->
      <div class="m-step__head">
        <!-- 内部填充 -->
        <span
          class="m-step__icon m-icon"
          :class="`${icon ? `icon-${icon}` : ''}`"
        >
          <!-- 有icon显示icon，没icon显示当前步数 -->
          {{ icon ? "" : (currentIndex || 0) + 1 }}
        </span>
        <!-- 若不是最后一步，则向外延申一条线 -->
        <div
          v-if="currentIndex !== stepIndexList.length - 1"
          class="m-step__line"
        />
      </div>
      <!-- 2. 底部描述 -->
      <div
        class="m-step__content"
        :class="{
          isFirstStep: currentIndex === 0,
          isLastStep: currentIndex === stepIndexList.length - 1,
        }"
      >
        <!-- 标题 -->
        <div class="m-step__title">
          {{ title }}
        </div>
        <!-- 描述 -->
        <div
          v-if="description"
          class="m-step__description"
        >
          {{ description }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
