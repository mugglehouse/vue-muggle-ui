<script setup>
import { computed, getCurrentInstance, inject, ref } from 'vue'

// import { Props } from './carousel-item'

// defineProps(Props)
defineOptions({
  name: 'MCarouselItem',
})

// 获取来自父组件的currentIndex和direction
const currentIndex = inject('currentIndex')
const direction = inject('direction')

// 获取当前组件的uid
const instance = getCurrentInstance()
const currentUid = ref()
currentUid.value = instance?.uid

// 组件的激活状态
const active = ref(false)
defineExpose({
  active,
})
</script>

<template>
  <!-- 使用内置transition组件，当组件进入或离开时应用动画 -->
  <transition :name="direction" mode="out-in">
    <!-- 选择性展示组件实例 -->
    <div
      v-show="currentIndex === currentUid"
      class="m-carousel-item"
    >
      <!-- 用户自定义标签内容放入插槽 -->
      <slot />
    </div>
  </transition>
</template>

<style scoped>

</style>
