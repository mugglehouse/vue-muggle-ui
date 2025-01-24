<script setup>
import {
  computed,
  getCurrentInstance,
  nextTick,
  onMounted,
  onUnmounted,
  provide,
  ref,
  useSlots,
  watch,
} from 'vue'
import { Props } from './carousel'

const props = defineProps(Props)

const index = ref(0)
const indexList = ref([])
const currentIndex = ref(0)
const isEnter = ref(false) // 鼠标是否进入轮播图
const clock = ref(null) // 定时器
const transitionName = ref('')

// 注入给子组件
provide('currentIndex', currentIndex)// 当前轮播图index
provide('direction', transitionName)// 轮播图方向
provide('getIndexList', getIndexList)

// 2. 获取轮播图index数组
function getIndexList() {
  const temp = index.value
  indexList.value.push(index.value++)
  return temp
}

// 3. 当前index的改变逻辑
function start(direction) {
  if (direction === 'next') {
    currentIndex.value
      = currentIndex.value === indexList.value.length - 1
        ? 0
        : ++currentIndex.value
  }
  else {
    currentIndex.value
      = currentIndex.value === 0
        ? indexList.value.length - 1
        : --currentIndex.value
  }
}

// 3. 轮播图跳转

// (1) 自动播放轮播图
function autoPlay() {
  // 如果计时为0,重新计时
  if (!clock.value) {
    nextTick(() => {
      transitionName.value = props.direction
    })
    clock.value = setInterval(
      () => start(props.direction),
      props.interval || 3000,
    )
  }
}

// (2) 点击next按钮
function goForward() {
  transitionName.value = 'next'
  start('next')
}

// (3) 点击pre按钮
function goBackward() {
  transitionName.value = 'pre'
  start('pre')
}

// (4) 点击轮播图序号
function goTo(index) {
  currentIndex.value = index
}

// 4. 鼠标进入和离开轮播图
function handleMouseEnter() {
  isEnter.value = true
  if (clock.value) {
    // 清除定时器,  停止自动播放
    clearInterval(clock.value)
    clock.value = null
  }
}
function handleMouseOut() {
  isEnter.value = false
  props.autoplay && autoPlay()
}

// 显示箭头
const showArrow = computed(() => {
  let display = ''
  if (props.arrow === 'always')
    display = 'flex'
  else if (props.arrow === 'never')
    display = 'none'
  else if (isEnter.value)
    display = 'flex'
  else
    display = 'none'

  return display
})

onMounted(() => {
  props.autoplay && autoPlay()
})

onUnmounted(() => {
  clock.value && clearInterval(clock.value)
})
</script>

<template>
  <div
    class="m-carousel"
    @mouseenter.self="handleMouseEnter"
    @mouseleave.self="handleMouseOut"
  >
    <!-- 轮播图放入插槽 -->
    <div class="m-carousel_container">
      <slot />
    </div>
    <!-- 左箭头 -->
    <div
      v-show="arrow === 'always' || isEnter"
      class="m-carousel__arrow m-carousel__arrow--left"
      :style="{
        display: showArrow,
      }"
      @click="goBackward"
    >
      <i class="m-icon icon-arrow-left-bold" />
    </div>
    <!-- 右箭头 -->
    <div
      v-show="arrow === 'always' || isEnter"
      class="m-carousel__arrow m-carousel__arrow--right"
      :style="{
        display: showArrow,
      }"
      @click="goForward"
    >
      <i class="m-icon icon-arrow-right-bold" />
    </div>
    <!-- 轮播序号 -->
    <ul class="m-carousel__dot_list">
      <li
        v-for="i in indexList"
        :key="i"
        class="m-carousel_dot"
        :class="{ 'm-carousel_dot_active': i === currentIndex }"
        @click="goTo(i)"
      />
    </ul>
  </div>
</template>

<style scoped>

</style>
