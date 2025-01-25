<script setup>
import { computed, inject, ref } from 'vue'
import { Props } from './collapse-item'

const props = defineProps(Props)

const opened = inject('opened') // 默认展开的项，存储的是name
const change = inject('change') // 切换项的方法，更新opened
const accordion = inject('accordion') // 是否手风琴模式

const show = computed(() => opened?.value.includes(props.name))// 当前组件是否展开

function handleClick() {
  const oldSelect = JSON.parse(JSON.stringify(opened?.value))
  let newSelected = oldSelect.includes(props.name)
    ? oldSelect.filter(item => item !== props.name)
    : [...oldSelect, props.name]
  if (accordion?.value) {
    newSelected = [props.name]
    newSelected = newSelected[0] === oldSelect[0] ? [] : newSelected
  }
  change && change(newSelected)
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
