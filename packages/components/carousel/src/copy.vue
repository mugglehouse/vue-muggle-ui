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

const instance = getCurrentInstance() // 当前组件实例
const vnodeUidlist = ref([]) // 轮播图uid数组
const currentIndex = ref(0) // 当前轮播图uid
const isEnter = ref(false) // 鼠标是否进入轮播图
const clock = ref(null) // 定时器
const transitionName = ref('')

// 注入给子组件
provide('currentIndex', currentIndex)// 当前轮播图uid
provide('direction', transitionName)// 轮播图方向

// 1. 获取轮播图uid数组
function getCarouselItemList() {
  // 当前组件
  const children = instance?.subTree.children
  // 轮播图组件uid数组div-div-items
  const uid
    = children
    && (children)[0].children[0].children
      .filter(item => item.component)
      .map(item => item.component?.uid)
  // 轮播图组件uid数组
  vnodeUidlist.value = uid
  // 默认显示第一个轮播图
  currentIndex.value = vnodeUidlist.value[0]
}

// function getCarouselItemList() {
//   carouselWidth.value = slotRef.value?.offsetWidth || 0
//   // 当前组件
//   const children = instance?.subTree.children.find(t => t.key === '_default')
//   if (children) {
//     vnodeUidlist.value = children.children
//       .filter(vnode => vnode.type.name === 'MCarouselItem')
//       .map(v => v.component.uid)
//   }
//   currentIndex.value = vnodeUidlist.value[0]
//   console.log(instance.subTree)
// }

// 3. 当前uid的改变逻辑
function start(direction) {
  // 获取当前轮播图索引
  const index = vnodeUidlist.value.findIndex(
    item => item === currentIndex.value,
  )
  // 方向为next
  if (direction === 'next') {
    // 如果当前索引为最后一个,则currentIndex为第一个的uid,否则为下一个uid
    currentIndex.value
      = index === vnodeUidlist.value.length - 1
        ? vnodeUidlist.value[0]
        : vnodeUidlist.value[index + 1]
  }
  // 方向为pre
  else {
    currentIndex.value
      = index === 0
        ? vnodeUidlist.value[vnodeUidlist.value.length - 1]
        : vnodeUidlist.value[index - 1]
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
function goTo(uuid) {
  currentIndex.value = uuid
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
  getCarouselItemList()
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
        v-for="uuid in vnodeUidlist"
        :key="uuid"
        class="m-carousel_dot"
        :class="{ 'm-carousel_dot_active': uuid === currentIndex }"
        @click="goTo(uuid)"
      />
    </ul>
  </div>
</template>

<style scoped>

</style>
