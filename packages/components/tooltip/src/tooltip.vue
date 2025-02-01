<script setup>
import { nextTick, ref, watch } from 'vue'
import { Props } from './tooltip'

const props = defineProps(Props)

const show = ref(false)
const tooltipStyle = ref() // 提示框样式
const tooltipRef = ref() // 提示框元素
const arrowDirection = ref('bottom') // 箭头方向
const arrowPosition = ref('center') // 箭头位置
const TOOLTIP_GAP = 7 // 提示框与目标元素的间距
let clock

watch(
  () => props.placement,
  (newValue) => {
    if (newValue.includes('top') || !props.placement)
      arrowDirection.value = 'bottom'
    if (newValue.includes('bottom'))
      arrowDirection.value = 'top'
    if (newValue.includes('left'))
      arrowDirection.value = 'right'
    if (newValue.includes('right'))
      arrowDirection.value = 'left'
    if (newValue === 'top-start' || newValue === 'bottom-start')
      arrowPosition.value = 'row_start'
    if (newValue === 'top-end' || newValue === 'bottom-end')
      arrowPosition.value = 'row_end'
    if (newValue === 'left-start' || newValue === 'right-start')
      arrowPosition.value = 'col_start'
    if (newValue === 'left-end' || newValue === 'right-end')
      arrowPosition.value = 'col_end'
  },
  {
    immediate: true,
  },
)

function handleMouseEnter(e) {
  clearCloseClock()
  const { offsetWidth, offsetHeight } = e.target
  const { top, left } = e.target.getBoundingClientRect()
  show.value = true
  tooltipStyle.value = {
    width: props.width ? `${props.width}px` : 'auto',
  }
  nextTick(() => {
    const { L, T } = getPosition(
      offsetWidth,
      offsetHeight,
      left,
      top,
      props.width || tooltipRef.value?.offsetWidth || 0,
      tooltipRef.value?.offsetHeight || 0,
    )
    tooltipStyle.value = {
      left: `${L}px`,
      top: `${T}px`,
      width: props.width ? `${props.width}px` : 'auto',
    }
  })
}

function getPosition(width, height, x, y, W, H) {
  let left = 0
  let top = 0
  switch (props.placement) {
    case 'top':
      left = x + width / 2 - W / 2
      top = y - H - TOOLTIP_GAP
      break
    case 'top-start':
      left = x
      top = y - H - TOOLTIP_GAP
      break
    case 'top-end':
      left = x + width - W
      top = y - H - TOOLTIP_GAP
      break
    case 'bottom':
      left = x + width / 2 - W / 2
      top = y + height + TOOLTIP_GAP
      break
    case 'bottom-start':
      left = x
      top = y + height + TOOLTIP_GAP
      break
    case 'bottom-end':
      left = x + width - W
      top = y + height + TOOLTIP_GAP
      break
    case 'left':
      left = x - W - TOOLTIP_GAP
      top = y - (H / 2 - height / 2)
      break
    case 'left-start':
      left = x - W - TOOLTIP_GAP
      top = y
      break
    case 'left-end':
      left = x - W - TOOLTIP_GAP
      top = y + height - H
      break
    case 'right':
      left = x + width + TOOLTIP_GAP
      top = y - (H / 2 - height / 2)
      break
    case 'right-start':
      left = x + width + TOOLTIP_GAP
      top = y
      break
    case 'right-end':
      left = x + width + TOOLTIP_GAP
      top = y + height - H
      break
    default:
      break
  }
  return { L: left, T: top }
}

function closeTooltip() {
  clock = setTimeout(() => {
    show.value = false
  }, 300)
}

function clearCloseClock() {
  if (clock)
    clearInterval(clock)
}
</script>

<template>
  <!-- 主体块 -->
  <div
    class="m-tooltip"
    @mouseenter="handleMouseEnter"
    @mouseleave="closeTooltip"
  >
    <slot />
  </div>
  <!-- 提示块 -->
  <teleport to="#m-popper-container">
    <transition name="fade">
      <div
        v-show="show"
        ref="tooltipRef"
        class="m-tooltip__container"
        :style="tooltipStyle"
        @mouseenter="clearCloseClock"
        @mouseleave="closeTooltip"
      >
        <div class="m-tooltip__inner">
          {{ content }}
          <i :class="`m-tooltip_arrow_${arrowDirection} m-tooltip_arrow_${arrowPosition}`" />
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>

</style>
