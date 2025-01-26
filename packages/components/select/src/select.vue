<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import useToggle from '@muggle-ui/utils/toggle.ts'
import { Props } from './select'

const props = defineProps(Props)
const currentSelectedValue = defineModel()

const { trigger, triggerOrigin, showTrigger, suspensionStyle, click } = useToggle()

const isFocus = ref(false) // 是否聚焦
const currentSelectedLabel = ref('') // 当前选中的label
const keywords = ref('') // 搜索关键字

// 搜索过滤的选项，若item.label包含keywords，则返回，重点理解includes和filter
const filterOptions = computed(() =>
  props.option?.filter(item => item.label.includes(keywords.value)),
)

// 箭头随聚焦状态变化
const iconName = computed(() =>
  isFocus.value ? 'icon-arrow-up-bold' : 'icon-arrow-down-bold',
)
// 点击原始触发容器事件
function handleClick() {
  // 焦点变化
  isFocus.value = true
  // 封装的点击事件，下拉状态也在click里面
  click()
}
function keywordsChange() {
}

// 选中选项事件
function handleChange(item) {
  if (item.disabled)
    return
  currentSelectedLabel.value = item.label
  currentSelectedValue.value = item.value
  keywords.value = ''
  showTrigger.value = false
}
// 初始化选中的label
onMounted(() => {
  const currentSelected = props.option?.find(
    item => item.value === currentSelectedValue.value,
  )
  // currentSelectedLabel.value = currentSelected ? currentSelected.label : props.option[0].label
  currentSelectedLabel.value = currentSelected ? currentSelected.label : ''
})
</script>

<template>
  <div class="m-select">
    <!-- 原始触发容器 -->
    <div
      ref="triggerOrigin"
      class="m-select__wrapper"
      :class="{ focus: isFocus }"
      @click="handleClick"
    >
      <!-- 选择器 -->
      <!-- @input输入框的值变化时触发，@focus得到焦点时触发，@blur失去焦点时触发 -->
      <input
        :placeholder="currentSelectedLabel || placeholder"
        :disabled="disabled"
        readonly
        class="m-input__inner"
        :class="{
          'has-select': currentSelectedLabel,
        }"
        @input="keywordsChange"
        @focus="keywords = ''"
        @blur="isFocus = false"
      >
      <!-- 箭头 -->
      <div class="m-select__suffix">
        <i :class="`m-icon ${iconName}`" />
      </div>
    </div>
    <!-- 下拉框容器：传送到body下的id为m-popper-container的div -->
    <teleport to="#m-popper-container">
      <div
        v-show="showTrigger"
        ref="trigger"
        class="m-select-options"
        :style="suspensionStyle"
      >
        <!-- 搜索框 -->
        <div v-if="search" class="m-select-search-box">
          <input
            v-model="keywords"
            type="text"
            class="m-input__inner"
            placeholder="请输入关键字"
          >
        </div>
        <!-- 选项列表 -->
        <div
          v-for="item in filterOptions"
          :key="item.value"
          class="m-select-option-item"
          :class="{
            'active': item.value === currentSelectedValue,
            'is-disabled': item.disabled,
          }"
          @click="handleChange(item)"
        >
          <span>{{ item.label }}</span>
        </div>
        <!-- 无符合选项 -->
        <div
          v-show="!filterOptions.length"
          class="m-select-option-item no-result"
        >
          <span>暂无符合选项</span>
        </div>
      </div>
    </teleport>
  </div>
</template>

<style scoped>

</style>
