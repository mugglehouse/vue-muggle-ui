<script setup>
import { computed, inject, ref } from 'vue'
import { Props } from './collapse-item'

const props = defineProps(Props)

const opened = inject('opened') // 默认展开的项，存储的是name
const accordion = inject('accordion') // 是否手风琴模式

const show = computed(() => opened?.value.includes(props.name))// 当前组件是否展开

// 切换展开状态的逻辑：pened数组存储了所有展开的项name，是双向绑定的，其实就是以opened数组基础，控制每个条目的展开收起状态，展开或收起将name添加或删除即可
function handleClick() {
  if (accordion?.value)
    opened.value = opened.value === [props.name] ? [] : [props.name]
  else
    opened.value = opened.value.includes(props.name) ? opened.value.filter(item => item !== props.name) : [...opened.value, props.name]
}
</script>

<template>
  <div class="m-collapse-item" :class="{ active: show }">
    <!-- 标题部分 -->
    <div class="m-collapse-item__button" @click="handleClick">
      <div class="m-collapse-item__title">
        <!-- 具名插槽，如果父组件没有使用template指定，默认显示title -->
        <slot name="title">
          {{ title }}
        </slot>
      </div>
      <i class="m-collapse-item__icon m-icon icon-arrow-right" />
    </div>
    <!-- 内容部分 -->
    <div class="m-collapse-item__body">
      <div class="m-collapse-item__reference">
        <div class="m-collapse-item__content">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
